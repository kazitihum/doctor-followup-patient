import { PassdataService } from './../passdata/passdata.service';
import { Component, OnInit } from '@angular/core';
import { ApiService } from './../services/api.service';
import { Storage } from '@ionic/storage';
import { Router } from '@angular/router';

@Component({
  selector: 'app-myfollowup-his',
  templateUrl: './myfollowup-his.page.html',
  styleUrls: ['./myfollowup-his.page.scss'],
})
export class MyfollowupHisPage implements OnInit {

  followup:any;
  patient_id:any;

  constructor(private router: Router, private storage: Storage,private apiService: ApiService,private passdata:PassdataService) { }

  async ngOnInit() {

    await this.storage.get('user_info').then(async (data) =>{
      this.patient_id =  data.user_info.id;
     console.log(this.patient_id);
    })

     this.apiService.followupHis( this.patient_id ).subscribe(
      data => {

        console.log(data);
        this.followup = data;
      },
      error => {
        console.log(error);
      }
    );

  }

  followDetails(data) {

    this.passdata.setData('followup_his', data);
    this.passdata.setData('followup_id', data.fu_id);
    this.router.navigateByUrl('/followup-rlist');
  }

}
