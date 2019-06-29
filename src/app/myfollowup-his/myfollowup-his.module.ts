import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { MyfollowupHisPage } from './myfollowup-his.page';

const routes: Routes = [
  {
    path: '',
    component: MyfollowupHisPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [MyfollowupHisPage]
})
export class MyfollowupHisPageModule {}
