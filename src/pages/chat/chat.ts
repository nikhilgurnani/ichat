import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';

/**
 * Generated class for the ChatPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
	selector: 'page-chat',
	templateUrl: 'chat.html',
})
export class ChatPage {

	username: string = '';
	receiver: string = '';
	receiverFull: string = '';
	roomName: string = '';
	name: string = '';

	messages: object[] = [];
	message: string = '';

	constructor(public db: AngularFireDatabase, public navCtrl: NavController, public navParams: NavParams) {
		this.roomName = this.navParams.get('roomName');
		this.receiver = this.navParams.get('receiver');
		this.receiverFull = this.navParams.get('receiverFull');
		this.username = this.navParams.get('username');
		this.name = this.navParams.get('name');    
	}


	ionViewDidLoad() {
		console.log(this.navParams);
		this.db.list('/chat/' + this.roomName + '/messages/').subscribe(data => {
			this.messages = data;
			console.log(data);
		});
	}

	sendMessage()
	{
		var weekday = new Array(7);
		weekday[0] =  "Sunday";
		weekday[1] = "Monday";
		weekday[2] = "Tuesday";
		weekday[3] = "Wednesday";
		weekday[4] = "Thursday";
		weekday[5] = "Friday";
		weekday[6] = "Saturday";

		var months = new Array(7);
		months[0] = "January";
		months[1] = "February";
		months[2] = "March";
		months[3] = "April";
		months[4] = "May";
		months[5] = "June";
		months[6] = "July";
		months[7] = "August";
		months[8] = "September";
		months[9] = "October";
		months[10] = "November";
		months[11] = "December";

		var today = new Date();
		var time = weekday[today.getDay()] + ", " + today.getDate() + "/" + today.getMonth() + " " + today.getHours() + ":" + today.getMinutes();
		this.db.list('/chat/' + this.roomName + '/messages').push({
			message: this.message,
			name: this.name,
			time: time
		});
		this.message = '';
	}

}
