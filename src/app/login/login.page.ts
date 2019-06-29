import { ApiService } from './../services/api.service';
import { ToastController,AlertController,LoadingController } from '@ionic/angular';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Storage } from '@ionic/storage';


@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  isLoading = false;
  constructor(public alertController: AlertController,public loadingController: LoadingController,private storage: Storage,public toastController: ToastController, private apiService: ApiService,private router: Router) { }

  ngOnInit() {

    this.storage.get('user_info').then((data)=>{
      console.log(data);
    })
  }

  async ionViewWillEnter(){
    await this.storage.get('user_info').then((data)=>{
      console.log(data);
      if(data.token){
        this.router.navigateByUrl('/tabs');
      }
    })
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

  login(form: NgForm) {
    this.present();
    this.apiService.login(form.value.email, form.value.password).subscribe(
      data => {
        this.dismiss();
        console.log(data);
        this.storage.set('user_info', data);

        this.toastController.create({
          message: 'LogIn Successfull !',
          duration: 2000
        }).then(a => {
          a.present().then(() => {
        });

      });
        
        this.router.navigateByUrl('/tabs');
      },
      error => {
        this.dismiss();
        console.log(error);

        this.toastController.create({
          message: 'Invalid Login',
          duration: 3000,
          translucent: true,
          animated: true
        }).then(a => {
          a.present().then(() => {
        });
      });
      }
    );
  }



}
