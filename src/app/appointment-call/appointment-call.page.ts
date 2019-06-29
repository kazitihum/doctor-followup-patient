import { Component, OnInit } from '@angular/core';
import { ApiService } from './../services/api.service';
import { Observable } from 'rxjs';
import {NgForm } from '@angular/forms';
import { AlertController } from '@ionic/angular';
import { Router } from '@angular/router';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'app-appointment-call',
  templateUrl: './appointment-call.page.html',
  styleUrls: ['./appointment-call.page.scss'],
})
export class AppointmentCallPage implements OnInit {
  todayDate: any;
  nextSeven: any;
  scheduleData: any;
  slotId:any='';
  patient_id:any;
  docData: any;
  searchTerm: string = '';
  docid:any;
  docName:any;

  constructor(private storage: Storage,private router: Router, public alertController: AlertController, private apiService: ApiService) {
    this.todayDate = new Date();

    this.nextSeven = new Date( this.todayDate);

    this.nextSeven.setDate( this.todayDate.getDate() + 17);
   }

  ngOnInit() {
    this.storage.get('user_info').then((data) =>{
     this.patient_id = data.user_info.id;
     console.log(this.patient_id);
    })
  }

  doctorSearch(name) {

    console.log(name);
    this.apiService.doctorSearch(this.searchTerm).subscribe(
      data => {

        console.log(data);
        this.docData = data;
      },
      error => {
        console.log(error);
      }
    );
  }

  setDocid(id, fname, lname){
    this.docid = id;
    this.docName = fname + ' ' + lname;
    this.docData = '';
    this.searchTerm='';

  }

  removeDocName(){

    this.docid = null;
    this.docName = null;
  }

  onChangeHandler( $event) {
    this.slotId = $event.target.value;
    console.log(this.slotId);
  }

  shedulebyDate(date) {

    console.log(date);

    this.apiService.schedulebyDate(this.docid,  date).subscribe(
      data => {
        console.log(data);
        this.scheduleData = data;
      },
      error => {
        console.log(error);
      }
    );
  }

  submit(form: NgForm) {


    let data:any = {

      'patient_id' : this.patient_id,
      'doctor_id' : this.docid,
      'shedule_id' :  this.slotId,
      'symptoms' : form.value.symptoms,
      'disease_name' : form.value.disease_name,
      'description' : form.value.description ,
      'payment_id' : 1,
      'payment_status': true

    };

    console.log(data);


    this.apiService.setSchedule(data).subscribe(
     async  data => {
        console.log(data);

        form.reset();

        const alert = await this.alertController.create({
          header: 'Success!',
          message: 'Successfully Saved Record !!',
          buttons: [
            {
              text: 'Okay',
              handler: () => {
                this.router.navigateByUrl('/tabs');
              }
            }
          ]
      });
      await alert.present();
      },
      async error => {
        console.log(error);

        const alert = await this.alertController.create({
          header: 'Faild!',
          message: 'Something Wrong !!',
          buttons: [
            {
              text: 'Okay',
              handler: () => {
                
              }
            }
          ]
      });
      await alert.present();
      }
    );
  }



}
