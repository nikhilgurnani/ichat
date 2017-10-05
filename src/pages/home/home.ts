import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { AlertController } from 'ionic-angular';
import { VerifyLoginPage } from '../../pages/verify-login/verify-login';
import { RegisterPage } from '../../pages/register/register';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';
import { LoadingController } from 'ionic-angular';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  username: string = '';
  constructor(public navCtrl: NavController,
		  private alertCtrl: AlertController,
		  private db: AngularFireDatabase,
		  private loadingCtrl: LoadingController) {
  }


  presentLoading() {
	let loader = this.loadingCtrl.create({
	  content: "Please wait...",
	  duration: 1000
	});
	loader.present();
  }

	loginUser()
	{
		if(/^[a-zA-Z0-9]+$/.test(this.username)){
			console.log(this.db.object('/users/' + this.username));
			this.db.object('/users/' + this.username).subscribe(user => {
				if(user.$exists()){
					this.presentLoading();
					this.navCtrl.push(VerifyLoginPage, {
						username: this.username
					});
				}
				else{
					this.navCtrl.push(RegisterPage, {
						username: this.username
					});
				}
			});
		}
		else{
			this.alert('Error', 'Incorrect username entered.');
		}
	}


  alert(tit:string , subtit:string) {
	let alert = this.alertCtrl.create({
	  title: tit,
	  subTitle: subtit,
	  buttons: ['OK']
	});
	alert.present();
    }
}
