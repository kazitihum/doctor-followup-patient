import { Component, OnInit } from '@angular/core';
import { ApiService } from './../services/api.service';
import { File ,FileEntry } from '@ionic-native/file/ngx';
import { FileChooser } from '@ionic-native/file-chooser/ngx';
import { Observable } from 'rxjs';
import { PassdataService } from './../passdata/passdata.service';
import {NgForm } from '@angular/forms';
import { AlertController,LoadingController } from '@ionic/angular';
import { Router } from '@angular/router';
import { FileTransfer, FileUploadOptions, FileTransferObject } from '@ionic-native/file-transfer/ngx';
import { FilePath } from '@ionic-native/file-path/ngx';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'app-patient-replay',
  templateUrl: './patient-replay.page.html',
  styleUrls: ['./patient-replay.page.scss'],
})
export class PatientReplayPage implements OnInit {

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
  followupData:any;
  followup:any;

  constructor(  private passdata:PassdataService,private storage: Storage,public loadingController: LoadingController,private filePath: FilePath, private transfer: FileTransfer, private apiService: ApiService, private router: Router, public alertController: AlertController, private file: File, private fileChooser: FileChooser) {
   
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

  async ngOnInit() {
    this.followup = this.passdata.getData('followup_his');
    this.followupData = this.passdata.getData('followup_data');
    await this.storage.get('user_info').then((data) =>{
     this.patient_id = data.user_info.id;
    })
    
  }

  

  chooser() {

    
    this.fileChooser.open().then((uri) => {

      this.filePath.resolveNativePath(uri).then( filePath =>
      {

          let filesPath  = filePath;
          this.filename   =  filesPath.substring(filesPath.lastIndexOf("/") + 1);
           this.filetype   = this.filename.substring(this.filename.lastIndexOf(".") + 1);


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

      'followup_id' : this.followup.fu_id,
      'symptoms' : form.value.symptoms,
      'description' : form.value.description ,
      'payment_id' : 2,
      'payment_status': true

    };

    this.apiService.followupReplay(data).subscribe(
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

