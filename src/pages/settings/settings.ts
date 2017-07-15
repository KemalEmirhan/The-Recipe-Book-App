import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { UserDetailPage } from "../user-detail/user-detail";
import { AboutUsPage } from "./about-us/about-us";
import { MeasurementPage } from "./measurement/measurement";
import { VideoPage } from "./video/video";
import { NotificationsPage } from "./notifications/notifications";


@IonicPage()
@Component({
  selector: 'page-settings',
  templateUrl: 'settings.html'
})
export class SettingsPage {
  userDetail = UserDetailPage;
  aboutPage = AboutUsPage;
  measurementPage = MeasurementPage;
  videoPage = VideoPage;
  notificationsPage = NotificationsPage;

  constructor(public navCtrl: NavController, public navParams: NavParams, private alert: AlertController) {
  }
 
  openLanguages(){
    let alert = this.alert.create({
      title: 'Languages',
      message: 'We will add more languages for this app soon...',
      buttons: ['OK']
    });
    alert.present();
  }

  openRecommend() {
    let alert = this.alert.create({
          title: 'Recommendation',
          message: 'We will add recommendation for this app soon...',
          buttons: ['OK']
        });
    alert.present();
  }

  openRateApp() {
    let alert = this.alert.create({
      title: 'Rate App',
      message: 'We will add rate app for this app soon...',
      buttons: ['OK']
    });
    alert.present();
  }

  openFeedback(){
     let alert = this.alert.create({
      title: 'Feed Back',
      message: 'We will add feedback section for this app soon...',
      buttons: ['OK']
    });
    alert.present();
  }
}
