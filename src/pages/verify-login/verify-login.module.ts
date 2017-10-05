import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { VerifyLoginPage } from './verify-login';

@NgModule({
  declarations: [
    VerifyLoginPage,
  ],
  imports: [
    IonicPageModule.forChild(VerifyLoginPage),
  ],
})
export class VerifyLoginPageModule {}
