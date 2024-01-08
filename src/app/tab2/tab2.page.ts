import { Component, OnInit } from '@angular/core';
import {
  AlertController,
  LoadingController,
  NavController,
  ToastController,
  ModalController,
} from '@ionic/angular';
import { Storage } from '@ionic/storage';
import { Router } from '@angular/router';
import { ApiService } from '../api.service';
import { ViewWillEnter } from '@ionic/angular';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss'],
})
export class Tab2Page implements ViewWillEnter {
  public Data: any;
  public kk: string = '';

  constructor(
    private toastCtrl: ToastController,
    private loadingCtrl: LoadingController,
    private navCtrl: NavController,
    private route: Router,
    private storage: Storage,
    private _apiService: ApiService,
    private alertCtrl: AlertController
  ) {
    this.getKK();
  }

  ionViewWillEnter() {
    this.getKK();
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

  async getKK() {
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
        this._apiService.getKK(val).then((res) => {
          if (res.msg == 'ok') {
            this.Data = res.data;
            this.kk = String(res.data[0].kk);
          } else if (res.msg == 'err') {
            this.presentToast(
              'Something went wrong:' + String(res.err),
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

  isReadOnly() {
    return this.isReadOnly;
  }

  tambah() {
    this.navCtrl.navigateRoot('/create-kk?kk=' + this.kk);
  }

  editKK(kd: string) {
    this.navCtrl.navigateRoot('/edit-kk?kd_penduduk=' + kd);
  }
}
