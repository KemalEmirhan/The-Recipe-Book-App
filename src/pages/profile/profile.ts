import { SettingsPage } from '../settings/settings';

import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-profile',
  templateUrl: 'profile.html',
})
export class ProfilePage {
  settingsPage = SettingsPage;
  profile: string = "likes";

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }  

}
