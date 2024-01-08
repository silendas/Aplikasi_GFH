import { Component } from '@angular/core';
import {
  AlertController,
  LoadingController,
  NavController,
  ToastController,
  ModalController,
} from '@ionic/angular';
import { Storage } from '@ionic/storage';
import { ApiService } from '../api.service';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss'],
})
export class Tab3Page {
  public Data: any;

  constructor(
    private toastCtrl: ToastController,
    private loadingCtrl: LoadingController,
    private alertCtrl:AlertController,
    private navCtrl: NavController,
    private storage: Storage,
    private _apiService: ApiService
  ) {
    this.getInfo();
  }

  ionViewWillEnter(): void {
    try {
      this.getInfo();
    } catch (e) {
      throw new Error(e + 'Method not implemented.');
    }
  }

  async presentToast(msg: any, color: any, icon: any) {
    const toast = await this.toastCtrl.create({
      icon: icon,
      message: msg,
      duration: 1500,
      color: color,
      position: 'top',
    });
    toast.present();
  }

  async getInfo(){
    await this.storage.create();
    this.storage.get('isLoggedIn').then(async (val) => {
      if (val == null) {
        this.presentToast(
          "You're not logged in, please login !",
          'danger',
          'alert-circle-outline'
        );
        this.navCtrl.navigateRoot('/login');
      } else {
        this._apiService.getInfo().then((res) => {
          if (res.msg == 'ok') {
            this.Data = res.data;
          } else if (res.msg == 'notFound') {
            this.presentToast(
              'Belum ada info !',
              'warning',
              'alert-circle-outline'
            );
          }else if (res.msg == 'err') {
            this.presentToast(
              'Something went wrong',
              'danger',
              'alert-circle-outline'
            );
          }
        });
      }
    });
  }

  async logout() {
    const confirm = await this.alertCtrl.create({
      header: 'Logout',
      message: 'Anda yakin ingin logout?',
      buttons: [
        {
          text: 'Tidak',
          role: 'cancel',
          handler: () => {
            
          },
        },
        {
          text: 'Ya',
          handler: () => {
            this.storage.remove('isLoggedIn');
            this.storage.clear();
            localStorage.removeItem('isLoggedIn');
            this.navCtrl.navigateRoot(['/login']);
          },
        },
      ],
    });

    await confirm.present();
  }

  handleRefresh(event:any) {
    setTimeout(() => {
      this.getInfo();
      event.target.complete();
    }, 2000);
  }
}
