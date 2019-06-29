import { Component, OnInit } from '@angular/core';
import { ApiService } from './../services/api.service';
import { Storage } from '@ionic/storage';
import { async } from '@angular/core/testing';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.page.html',
  styleUrls: ['./user-profile.page.scss'],
})
export class UserProfilePage implements OnInit {

  userInfo:any;
  patient_id:any;
  age:any;

  constructor(private storage: Storage,private apiService: ApiService) {

   }

  async ngOnInit() {
   await this.storage.get('user_info').then(async (data)=>{

    let bdate = new Date(data.user_info.birth_date);
    let timeDiff = Math.abs(Date.now() -  bdate.getTime());
    this.age = Math.floor((timeDiff / (1000 * 3600 * 24))/365.25);

     this.patient_id = await (data.user_info.id);
     this.userInfo = data.user_info;

    
     console.log(bdate.getTime()+' ',bdate+" ",this.age);
    })
  }

  profile() {
  }




}
