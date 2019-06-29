import { Component, OnInit } from '@angular/core';
import { Storage } from '@ionic/storage';
import { ApiService } from './../services/api.service';
import { PassdataService } from './../passdata/passdata.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-followup-rlist',
  templateUrl: './followup-rlist.page.html',
  styleUrls: ['./followup-rlist.page.scss'],
})
export class FollowupRlistPage implements OnInit {

  followups:any;
  fid:any;

  f:any;

  constructor(private router: Router,private passdata:PassdataService,private storage: Storage,public apiService:ApiService) { }

  async ngOnInit() {

    await this.storage.get('user_info').then((data) =>{
      // this.fid = data;
      // 
    })
     this.fid = await this.passdata.getData('followup_id');

     console.log(this.fid);

    this.apiService.followupById(this.fid).subscribe(
      data => {
        console.log(data);
        this.followups =data;
      },
      error => {
        console.log(error);
      }
    );

  }

  followDetails(data) {

    this.passdata.setData('followup_data', data);
    this.router.navigateByUrl('/followup-details');
  }

}
