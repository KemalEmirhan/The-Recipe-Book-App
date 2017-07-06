import { AuthService } from './../services/auth';
import { SignupPage } from './../pages/signup/signup';
import { SigninPage } from './../pages/signin/signin';
import { Component, ViewChild } from '@angular/core';
import { Platform, NavController, MenuController, AlertController, LoadingController } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import firebase from 'firebase';

import { TabsPage } from './../pages/tabs/tabs';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage: any = TabsPage;
  signinPage = SigninPage;
  signupPage = SignupPage;
  isAuthenticated = false;
  @ViewChild('nav') nav: NavController;

  constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen, private menuCtrl: MenuController,
              private authService: AuthService, private alertCtrl: AlertController, private loadCtrl: LoadingController) {
    firebase.initializeApp({
      apiKey: "AIzaSyANMkYGUIEd1F7jbTbwiJAMr0v8MiHyvS8",
      authDomain: "recipe-book-app-eea69.firebaseapp.com",
    });
    firebase.auth().onAuthStateChanged(user => {
      if(user){
        this.isAuthenticated = true;
        this.rootPage = TabsPage;
      } else {
        this.isAuthenticated = false;
        this.rootPage = SigninPage;
      }
    });
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();
    });
  }

  onLoad(page: any) {
    this.nav.setRoot(page);
    this.menuCtrl.close();
  }

  onLogout() {
    let loading = this.loadCtrl.create({
      content: 'Log outing...'
    });
    loading.present();
    this.authService.logout()
    .then(
      data => {
          this.menuCtrl.close();
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
        this.menuCtrl.close();
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

