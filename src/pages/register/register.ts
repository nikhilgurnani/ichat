import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';


/**
 * Generated class for the RegisterPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
	selector: 'page-register',
	templateUrl: 'register.html',
})
export class RegisterPage {

	username: string = '';
	name: string = '';
	phone: string = '';
	passkey: string = '';
	constructor(public navCtrl: NavController, public navParams: NavParams, private db: AngularFireDatabase) {
		this.username = this.navParams.get("username");
	}

	hashCode (str){
		var hash = 0;
		if (str.length == 0) return hash;
		for (var i = 0; i < str.length; i++) {
		    var char = str.charCodeAt(i);
		    hash = ((hash<<5)-hash)+char;
		    hash = hash & hash; // Convert to 32bit integer
		}
		return hash;
	  }
	
	ionViewDidLoad() {
		console.log('ionViewDidLoad RegisterPage');
	}

	registerUser(){
		this.db.object('/users/' + this.username).set({
			username: this.username,
			fullname: this.name,
			phone: this.phone,
			passkey: this.hashCode(this.passkey)
		});
		console.log("User added boi");
	}

}
