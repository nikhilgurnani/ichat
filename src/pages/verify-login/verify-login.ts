import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AngularFireDatabase } from 'angularfire2/database';
import { RegisterPage } from '../../pages/register/register';
import { MainLanderPage } from '../../pages/main-lander/main-lander';
import { ChatPage } from '../../pages/chat/chat';
import { AlertController } from 'ionic-angular';
import { LoadingController } from 'ionic-angular';
import { ToastController } from 'ionic-angular';

/**
 * Generated class for the VerifyLoginPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
	selector: 'page-verify-login',
	templateUrl: 'verify-login.html',
})
export class VerifyLoginPage {

	username: string = '';
	passkey: string = '';
	constructor(public navCtrl: NavController, 
			public navParams: NavParams,
			private db: AngularFireDatabase,
			private alertCtrl: AlertController,
			private loadingCtrl: LoadingController,
			private toastCtrl: ToastController) {
		this.username = this.navParams.get("username");
	}
	
	alert(tit:string , subtit:string) {
		let alert = this.alertCtrl.create({
		  title: tit,
		  subTitle: subtit,
		  buttons: ['OK']
		});
		alert.present();
	}

	presentLoading() {
		let loader = this.loadingCtrl.create({
		  content: "Please wait...",
		  duration: 1000
		});
		loader.present();
	}

	presentToast()
	{
		let toast = this.toastCtrl.create({
			message: "Welcome " + this.username,
			duration: 1000,
			position: 'top'
		});
		toast.present();
	}

	verifyUser(){
		this.db.object('/users/' + this.username).subscribe(user => {
			var obj = new RegisterPage(this.navCtrl, this.navParams, this.db);
			if(user.passkey == obj.hashCode(this.passkey))
			{
				console.log("user verified");
				this.presentLoading();
				this.presentToast();
				this.navCtrl.push(MainLanderPage, {
					username: this.username,
					name: user.fullname
				});
			}
			else
			{
				this.alert("Error", "Incorrect passkey entered.");
			}
		});
	}

	ionViewDidLoad() {
		console.log('ionViewDidLoad VerifyLoginPage');
	}

}
