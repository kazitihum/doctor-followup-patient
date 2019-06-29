import { Component } from '@angular/core';
import { ApiService } from './../services/api.service';
import { Storage } from '@ionic/storage';


@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {

  followup:any;
  appoint:any;
  patient_id:any;

  constructor(private storage: Storage,private apiService: ApiService) {}

  async ionViewWillEnter() {

    await this.storage.get('user_info').then(async (data) =>{
      this.patient_id =  data.user_info.id;
     console.log(this.patient_id);
    })

    this.apiService.appointmentHis(this.patient_id).subscribe(
      data => {

        console.log(data);
        this.appoint = data;
      },
      error => {
        console.log(error);
      }
    );
  }

}
