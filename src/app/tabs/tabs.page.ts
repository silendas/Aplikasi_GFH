import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { Keyboard } from '@ionic-native/keyboard';
import { Platform } from '@ionic/angular';
@Component({
  selector: 'app-tabs',
  templateUrl: 'tabs.page.html',
  styleUrls: ['tabs.page.scss'],
})
export class TabsPage {
  logoClass: string = '';
  constructor(public navCtrl: NavController, public platform: Platform) {
    platform.ready().then(() => {
      Keyboard.onKeyboardShow().subscribe(() => {
        this.logoClass = 'd-none';
      });

      Keyboard.onKeyboardHide().subscribe(() => {
        this.logoClass = 'd-inline';
      });
    });
  }

  updateUser() {
    this.navCtrl.navigateForward('/c-user');
  }

  paymentRoute(route: string) {
    this.navCtrl.navigateForward([route]);
  }
}
