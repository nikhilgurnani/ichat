import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { MainLanderPage } from './main-lander';

@NgModule({
  declarations: [
    MainLanderPage,
  ],
  imports: [
    IonicPageModule.forChild(MainLanderPage),
  ],
})
export class MainLanderPageModule {}
