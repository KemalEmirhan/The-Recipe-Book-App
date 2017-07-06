import { AuthService } from './../../services/auth';
import { NgForm } from '@angular/forms';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, AlertController } from 'ionic-angular';


@IonicPage()
@Component({
  selector: 'page-signup',
  templateUrl: 'signup.html',
})
export class SignupPage {

      constructor(public navCtrl: NavController, public navParams: NavParams,
                  private authService: AuthService, private loadCtrl: LoadingController,
                  private alertCtrl: AlertController) {}

      onSignUp(form: NgForm){
        const loading = this.loadCtrl.create({
            content: 'Signing you up...'
        });
        loading.present();

      this.authService.signup(form.value.email, form.value.password)
      .then(
        data => {
          loading.dismiss();
        }
      )
      .catch(
        error => {
          loading.dismiss();
            let alert = this.alertCtrl.create({
              title: 'Signup failed!',
              message: error.message,
              buttons: ['OK']
            });
            alert.present();
        }
      );

      }
}
