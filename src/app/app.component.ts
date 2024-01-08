import { Component } from '@angular/core';
import { NavController } from '@ionic/angular';
import { Storage } from '@ionic/storage-angular';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
  providers: [Storage],
})
export class AppComponent {
  constructor(
    private navCtrl: NavController,
    private storage: Storage
  ) {
    this.initializeApp();
  }

  async initializeApp() {
    this.navCtrl.navigateRoot('/splash');
    setTimeout(async () => {
      await this.storage.create();
      this.storage.get('isLoggedIn').then((val) => {
        if (val === null || val === undefined || val === '') {
          this.navCtrl.navigateRoot('/login');
        } else {
          this.navCtrl.navigateRoot('/tabs/tab1');
        }
      });
    }, 1500);
  }
}
