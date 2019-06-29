import { Injectable } from '@angular/core';

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Storage } from '@ionic/storage';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  private token:any;

  private url = 'https://flw.pointerror.com/doctor/public';
  //private url = 'http://localhost:8020';

  constructor(private http: HttpClient,private storage: Storage) {
   
  }

  //For User Login
  login(email:string, password:string): Observable<any> {

    return this.http.post(this.url + '/login', { email : email , password : password } ).pipe(
      map(results => results['data'])
    );
  }

  //for logout
  logout(): Observable<any> {

    this.storage.get('user_info').then((data) =>{
      this.token = data.token;
      console.log(this.token);
    })

    let headers = new HttpHeaders({'Authorization':'Bearer '+'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJod…Y3In0.LJWD8w8SrGwjS9dQCMNlofG15j-aQdhfgFC9qWSi2yI'});
    

    return this.http.post(this.url + '/logout','',{headers:headers}).pipe(
      map(results => results['message'])
    );
  }

  //for user registration
  register(data): Observable<any> {

    return this.http.post(this.url + '/users/patient', data).pipe(
      map(results => results['data'])
    );
  }

  //for user info
  userDatabyId(id): Observable<any> {

    return this.http.get(this.url + '/users/patient/' + id).pipe(
      map(results => results['data'])
    );
  }

  //for division name
  division() {
    return this.http.get(this.url + '/divisions').pipe(
      map(results => results['data'])
    );
  }

  //for district name
  district() {
    return this.http.get(this.url + '/districts').pipe(
      map(results => results['data'])
    );
  }

  //for search a doctor
  doctorSearch(data): Observable<any> {

    return this.http.post(this.url + '/users/doctor/search' , {name : data} ).pipe(
      map(results => results['data'])
    );
  }

  //for specific doctor info by their id
  doctorbyId(id): Observable<any> {

    return this.http.get(this.url + '/users/doctor/' + id).pipe(
      map(results => results['data'])
    );
  }

  //for full schedule by date
  schedulebyDate(doc_id, date): Observable<any> {

    return this.http.get(this.url + '/schedule/' + doc_id + '/' + date).pipe(
      map(results => results['data'])
    );
  }

  setSchedule(data): Observable<any> {

    return this.http.post(this.url + '/appointments', data).pipe(
      map(results => results['data'])
    );
  }

  //for all doctor info
  doctorAll(): Observable<any> {

    return this.http.get(this.url + '/users/doctor/').pipe(
      map(results => results['data'])
    );
  }

   //for new followup
   followup(data): Observable<any> {

    return this.http.post(this.url + '/newfollowup', data).pipe(
      map(results => results['data'])
    );
  }

   //for  followup History
   followupHis(data): Observable<any> {

    return this.http.get(this.url + '/patient/fhistory/' + data).pipe(
      map(results => results['data'])
    );
  }

    //for  Appointment History
    appointmentHis(data): Observable<any> {

      return this.http.get(this.url + '/patient/aphistory/' + data).pipe(
        map(results => results['data'])
      );
    }

     //for  followup History
  followupById(id): Observable<any> {

    return this.http.get(this.url + '/newfollowup/' + id).pipe(
      map(results => results['data'])
    );
  }
  

  followupReplay(data): Observable<any> {

    return this.http.post(this.url + '/patient/replay', data).pipe(
      map(results => results['data'])
    );
  }

    //for file upload

    followupFile(data): Observable<any> {

      return this.http.post(this.url + '/file' ,data).pipe(
        map(results => results['data'])
      );
    }



}
