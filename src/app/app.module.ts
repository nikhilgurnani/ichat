import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { Camera } from '@ionic-native/camera';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { ChatPage } from '../pages/chat/chat';
import { RegisterPage } from '../pages/register/register';
import { VerifyLoginPage } from '../pages/verify-login/verify-login';
import { MainLanderPage } from '../pages/main-lander/main-lander';

var config = {
  apiKey: "AIzaSyDdh_GnXKL4uMYbkWae4yV6t8d58nCitl4",
  authDomain: "new-chat-app-me.firebaseapp.com",
  databaseURL: "https://new-chat-app-me.firebaseio.com",
  projectId: "new-chat-app-me",
  storageBucket: "new-chat-app-me.appspot.com",
  messagingSenderId: "685579760379"
};

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    ChatPage,
    RegisterPage,
    VerifyLoginPage,
    MainLanderPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    AngularFireModule.initializeApp(config),
    AngularFireDatabaseModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    ChatPage,
    RegisterPage,
    VerifyLoginPage,
    MainLanderPage
  ],
  providers: [
    StatusBar,
    SplashScreen,,
    Camera,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
