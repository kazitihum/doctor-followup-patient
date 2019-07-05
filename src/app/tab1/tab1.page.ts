import { PassdataService } from './../passdata/passdata.service';
import { Component } from '@angular/core';
import { ApiService } from './../services/api.service';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Storage } from '@ionic/storage';
import { async } from '@angular/core/testing';

@Component({
    selector: 'app-tab1',
    templateUrl: 'tab1.page.html',
    styleUrls: ['tab1.page.scss']
})
export class Tab1Page {

    userInfo: any;
    patient_id: any;
    age: any;
    docData: Observable<any>;
    searchTerm: string = '';
    followup:any;

    constructor(private storage: Storage, private apiService: ApiService, private passdata: PassdataService, private router: Router) {


        this.storage.get('user_info').then((data) => {
            console.log(data);
        })
    }

    async ngOnInit() {
        await this.storage.get('user_info').then(async (data) => {

            let bdate = new Date(data.user_info.birth_date);
            let timeDiff = Math.abs(Date.now() - bdate.getTime());
            this.age = Math.floor((timeDiff / (1000 * 3600 * 24)) / 365.25);

            this.patient_id = await (data.user_info.id);
            this.userInfo = data.user_info;


            console.log(bdate.getTime() + ' ', bdate + " ", this.age);
        });

        await this.storage.get('user_info').then(async (data) => {
            this.patient_id = data.user_info.id;
            console.log(this.patient_id);
        })

        this.apiService.followupHis(this.patient_id).subscribe(
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

    logout() {
        this.storage.clear().then((data) => {
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
