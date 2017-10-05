import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AngularFireDatabase } from 'angularfire2/database';
import { AlertController } from 'ionic-angular';
import { ChatPage } from '../../pages/chat/chat';
/**
 * Generated class for the MainLanderPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
	selector: 'page-main-lander',
	templateUrl: 'main-lander.html',
})
export class MainLanderPage {

	username: string = '';
	name: string = '';
	users: object[] = [];

	constructor(public navCtrl: NavController, 
			public navParams: NavParams, 
			private db: AngularFireDatabase,
			private alertCtrl: AlertController) {
				this.username = this.navParams.get('username');
				this.name = this.navParams.get('name');
	}

	ionViewDidLoad() {
		console.log('ionViewDidLoad MainLanderPage');
		this.db.list('/users').subscribe(data => {
			this.users = data;
		});
	}


	chatWithUser(user: string, userFull: string){
		// console.log("Chat with " + user + ", " + userFull + " initialising.");	
		// console.log("Sender Username: " + this.username + " Full Name " + this.name);
		if(user === this.username.valueOf())
		{
			this.alert('Error', 'You cannot chat with yourself');
		}
		else{
			var roomName = 'chat_' + (user < this.username ? user + '_' + this.username : this.username + '_' + user);
			// console.log("Room Name: " + roomName);
			this.db.object('/chat/' + roomName).subscribe(data => {
				if(data == null){
					this.db.object('/chat/' + roomName).set({
						sender: this.username,
						name: this.name,
						receiver: user,
						receiverFull: userFull,
						messages: []
					});
				}			
			});
			this.navCtrl.push(ChatPage, {
				roomName: roomName,
				username: this.username,
				name: this.name,
				receiver: user,
				receiverFull: userFull
			});
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
