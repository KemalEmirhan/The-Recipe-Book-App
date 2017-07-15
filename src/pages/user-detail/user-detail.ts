import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, LoadingController } from 'ionic-angular';
import { AuthService } from "../../services/auth";

@IonicPage()
@Component({
  selector: 'page-user-detail',
  templateUrl: 'user-detail.html',
})
export class UserDetailPage {

  constructor(public navCtrl: NavController, public navParams: NavParams, private alertCtrl: AlertController,
              private loadCtrl: LoadingController, private authService: AuthService) {
  }
onLogout() {
    let loading = this.loadCtrl.create({
      content: 'Log outing...'
    });
    loading.present();
    this.authService.logout()
    .then(
      data => {
          loading.dismiss();
          let alert = this.alertCtrl.create({
              title: 'Thank You',
              message: 'Thank you for choosing us :)',
              buttons: ['OK']
        });
        alert.present();
      }
    )
    .catch(
      error => {
        loading.dismiss();
        let alert = this.alertCtrl.create({
          title: 'Log out failed!',
          message: error.message,
          buttons: ['OK']
        });
        alert.present();
      }
      
    );

  }
}
