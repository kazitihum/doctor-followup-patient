import { Component, OnInit } from '@angular/core';
import { PassdataService } from './../passdata/passdata.service';
import { ApiService } from './../services/api.service';

@Component({
  selector: 'app-doctor-profile',
  templateUrl: './doctor-profile.page.html',
  styleUrls: ['./doctor-profile.page.scss'],
})
export class DoctorProfilePage implements OnInit {

  docId:any;
  docInfo:any;


  constructor(private apiService: ApiService, private passdata: PassdataService) { }

  ngOnInit() {
    this.docId = this.passdata.getData('docdetails');
    console.log(this.docId);

    this.apiService.doctorbyId(this.docId).subscribe(
      data => {
        console.log(data);
        this.docInfo = data;
      },
      error => {
        console.log(error);
      }
    );

  }

}
