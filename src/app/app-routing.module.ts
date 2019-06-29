import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: '', loadChildren: './tabs/tabs.module#TabsPageModule' },
  { path: 'login', loadChildren: './login/login.module#LoginPageModule' },
  { path: 'register', loadChildren: './register/register.module#RegisterPageModule' },
  { path: 'create-followup', loadChildren: './create-followup/create-followup.module#CreateFollowupPageModule' },
  { path: 'user-profile', loadChildren: './user-profile/user-profile.module#UserProfilePageModule' },
  { path: 'appointment-call', loadChildren: './appointment-call/appointment-call.module#AppointmentCallPageModule' },
  { path: 'doctor-profile', loadChildren: './doctor-profile/doctor-profile.module#DoctorProfilePageModule' },
  { path: 'followup-details', loadChildren: './followup-details/followup-details.module#FollowupDetailsPageModule' },
  { path: 'myfollowup-his', loadChildren: './myfollowup-his/myfollowup-his.module#MyfollowupHisPageModule' },
  { path: 'followup-rlist', loadChildren: './followup-rlist/followup-rlist.module#FollowupRlistPageModule' },
  { path: 'patient-replay', loadChildren: './patient-replay/patient-replay.module#PatientReplayPageModule' }
];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
