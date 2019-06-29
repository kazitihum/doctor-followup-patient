import { ApiService } from './../services/api.service';
import { ToastController,AlertController,LoadingController } from '@ionic/angular';
import { Component, OnInit } from '@angular/core';
import {NgForm } from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {

  public states: any[];
  public districts: any[];
  public cities: any[];

  public selectedDistricts: any[];
  isLoading = false;
  constructor(public toastController: ToastController,public alertController: AlertController,public loadingController: LoadingController,private apiService: ApiService) {

    this.initializeState();
    this.initializeDistrict();

   }

  ngOnInit() {
  }
  async present() {
    this.isLoading = true;
    return await this.loadingController.create({
      spinner: 'circles',
      message: 'Authenticating ...',
    }).then(a => {
      a.present().then(() => {
        console.log('presented');
        if (!this.isLoading) {
          a.dismiss().then(() => console.log('abort presenting'));
        }
      });
    });
  }

  async dismiss() {
    this.isLoading = false;
    return await this.loadingController.dismiss().then(() => console.log('dismissed'));
  }


  initializeState() {

    this.apiService.division().subscribe((data) =>{

      this.states = data;
      console.log(this.states);
    });

  }

  initializeDistrict() {

    this.apiService.district().subscribe((data) =>{
      this.districts = data;
      console.log(this.districts);
    });

  }

  setDistrictValues(sState) {
    console.log(sState);
    this.selectedDistricts = this.districts.filter(districts => districts.division_id == sState);
  }

  register(form: NgForm) {
    this.present();
    let data:any = {

      'first_name' : form.value.first_name,
      'last_name' : form.value.last_name,
      'email' : form.value.email,
      'phone' : form.value.phone,
      'address' : form.value.address,
      'division_name' : form.value.sState.name,
      'district_name' : form.value.sDistrict.name,
      'birth_date' : (form.value.birth_date).split('T')[0],
      'gender' :  form.value.gender,
      'age' : form.value.age,
      'occupation' : form.value.occupation,
      'password' : form.value.password,

    };

    console.log(data);


    this.apiService.register(data).subscribe(
      data => {
        this.dismiss();
        console.log(data);
       
        this.toastController.create({
          message: 'Registation Successfull !',
          duration: 2000
        }).then(a => {
          a.present().then(() => {
        });
      });

        form.reset();

      },
      error => {
        this.dismiss();

        this.toastController.create({
          message: 'Faild Something Wrong !',
          duration: 2000
        }).then(a => {
          a.present().then(() => {
        });

      });


        console.log(error);
      }
    );
  }

}
