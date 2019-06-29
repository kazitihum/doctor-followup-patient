import { PassdataService } from './../passdata/passdata.service';
import { Component } from '@angular/core';
import { ApiService } from './../services/api.service';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Storage } from '@ionic/storage';


@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {

  docData: Observable<any>;
  searchTerm: string = '';

  constructor( private storage: Storage,private apiService: ApiService, private passdata: PassdataService, private router: Router) {

    
    this.storage.get('user_info').then((data) =>{
      console.log(data);
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

  doctorDetails(data) {

    this.passdata.setData('docdetails', data);
    this.router.navigateByUrl('/doctor-profile');
  }

  logout(){
    this.storage.clear().then((data)=>{
      console.log(data);
    });
    this.router.navigateByUrl('/login');
    
    // this.apiService.logout().subscribe(
    //   data => {

    //     console.log(data);
    //     this.router.navigateByUrl('/login');
    //   },
    //   error => {
    //     console.log(error);
    //   }
    // );
  }


}
