import { Component, OnInit } from '@angular/core';
import { ApiService } from './../services/api.service';
import { File ,FileEntry } from '@ionic-native/file/ngx';
import { FileChooser } from '@ionic-native/file-chooser/ngx';
import { Observable } from 'rxjs';
import {NgForm } from '@angular/forms';
import { AlertController,LoadingController } from '@ionic/angular';
import { Router } from '@angular/router';
import { FileTransfer, FileUploadOptions, FileTransferObject } from '@ionic-native/file-transfer/ngx';
import { FilePath } from '@ionic-native/file-path/ngx';
import { Storage } from '@ionic/storage';


@Component({
  selector: 'app-create-followup',
  templateUrl: './create-followup.page.html',
  styleUrls: ['./create-followup.page.scss'],
})
export class CreateFollowupPage implements OnInit {

  isLoading = false;
  fileBuff:any = [];
  filename:any;
  filetype:any;
  docData: any;
  searchTerm: string = '';
  docid:any;
  docName:any;
  patient_id:any;
  flag=0;

  constructor( private storage: Storage,public loadingController: LoadingController,private filePath: FilePath, private transfer: FileTransfer, private apiService: ApiService, private router: Router, public alertController: AlertController, private file: File, private fileChooser: FileChooser) {
   
   }

   async present(a,b) {
    this.isLoading = true;
    return await this.loadingController.create({
      spinner: 'circles',
      message: 'File Uploading. '+(a+1)+" / " +b,
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

  ngOnInit() {
    this.storage.get('user_info').then((data) =>{
     this.patient_id = data.user_info.id;
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

  setDocid(id, fname, lname){
    this.docid = id;
    this.docName = fname + ' ' + lname;
    this.docData = '';
    this.searchTerm='';

  }

  removeDocName(){

    this.docid = null;
    this.docName = null;
  }

  

  chooser() {

    
    this.fileChooser.open().then((uri) => {

      this.filePath.resolveNativePath(uri).then( filePath =>
      {

          let filesPath  = filePath;
          this.filename   =  filesPath.substring(filesPath.lastIndexOf("/") + 1);
          let fileType   = this.filename.substring(this.filename.lastIndexOf(".") + 1);


          this.file.resolveLocalFilesystemUrl(filePath).then(  fileInfo =>
          {
            let files = fileInfo as FileEntry;
              files.file(success =>
              {
                  this.filetype   = success.type;

                  let fileinfos = {
                    'path': uri,
                    'filename': this.filename,
                    'mmtype': this.filetype,
                  }
          
                  this.fileBuff.push(fileinfos);
                  
              });
          },err =>
          {
           alert(err);
            throw err;
          });

        },err=>
        {
          alert(err);
          throw err;
        });

       

    })
  .catch(e => alert(e));
  }



  async upload(fid,cid){

    const fileTransfer: FileTransferObject = this.transfer.create();
    let success = 0;

    for(let i=0;i<this.fileBuff.length;i++){

     this.present(i,this.fileBuff.length);


      let options: FileUploadOptions = {
        fileKey: 'file',
        fileName: this.fileBuff[i].filename,
        mimeType: this.fileBuff[i].mmtype,
        chunkedMode:false,
        httpMethod: 'post',
        params:{'follow_id' : fid,'child_id': cid}
        
     }
   
     await fileTransfer.upload(this.fileBuff[i].path, encodeURI('https://flw.pointerror.com/doctor/public/file'), options)
      .then((data) => {
        this.dismiss();
        success=success+1;
        if(success==this.fileBuff.length){
          this.flag=1;
        }
      }, (err) => {
        this.dismiss();
        alert(JSON.stringify(err));
      })

    }

  }



  async createFollowup(form: NgForm) {
   
    let data:any = {

      'patient_id' : this.patient_id,
      'doctor_id' : this.docid,
      'symptoms' : form.value.symptoms,
      'disease_name' : form.value.disease_name,
      'description' : form.value.description ,
      'payment_id' : 2,
      'payment_status': true

    };

    this.apiService.followup(data).subscribe(
      async data => {

        console.log(data);
        console.log(data.followup_id);
        console.log(data.child_id);

        await this.upload(data.followup_id,data.child_id);
        this.fileBuff.length = 0;

        const alert = await this.alertController.create({
          header: 'Success!',
          message: 'Successfully Saved Record !!',
          buttons: [
            {
              text: 'Okay',
              handler: () => {
                form.reset();
                this.router.navigateByUrl('/tabs');
              }
            }
          ]
      });
      await alert.present();

      },
      error => {
        console.log(error);
      }
    );

  }

}
