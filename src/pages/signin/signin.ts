import { AuthService } from './../../services/auth';
import { NgForm } from '@angular/forms';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, AlertController } from 'ionic-angular';


@IonicPage()
@Component({
  selector: 'page-signin',
  templateUrl: 'signin.html',
})
export class SigninPage {

  constructor(public navCtrl: NavController, public navParams: NavParams, private authService: AuthService,
              private loader: LoadingController, private alertCtrl: AlertController) {
  }

  onSignIn(form: NgForm){
    let loading = this.loader.create({
      content: 'Signin you up...'
    });
    loading.present();
    this.authService.signin(form.value.email, form.value.password)
    .then(
      data => {
        loading.dismiss();
        
      }
    )
    .catch(
      error => {
        loading.dismiss();
        let alert = this.alertCtrl.create({
          title: 'Signin failed',
          message: error.message,
          buttons: ['OK']
        });
        alert.present();
      }
    );
  }

}
