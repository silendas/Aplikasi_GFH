import { Component, OnInit } from '@angular/core';
import {
  AlertController,
  LoadingController,
  NavController,
  ToastController,
  ModalController,
  ViewWillEnter
} from '@ionic/angular';
import { Storage } from '@ionic/storage';
import { Router } from '@angular/router';
import { ApiService } from '../api.service';


@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss'],
})
export class Tab1Page implements ViewWillEnter {
  public Warga: any;

  public alertButtons = [
    {
      text: 'No',
      cssClass: 'alert-button-cancel',
    },
    {
      text: 'Yes',
      cssClass: 'alert-button-confirm',
    },
  ];

  constructor(
    private _apiService: ApiService,
    private toastCtrl: ToastController,
    private navCtrl: NavController,
    private storage: Storage,
    private loadingCtrl: LoadingController,
    private alertCtrl: AlertController
  ) {
    this.getUser();
  }

  ionViewWillEnter(): void {
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

  async getUser() {
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
        this._apiService.getWarga(val).then((res) => {
          if (res.msg == 'ok') {
            this.Warga = Array(res.data);
          } else if (res.msg == 'notAcive') {
            this.presentToast(
              'Account is not active !',
              'warning',
              'alert-circle-outline'
            );
            this.navCtrl.navigateRoot('/login');
          } else if (res.msg == 'notFound') {
            this.presentToast(
              'Account not found !',
              'danger',
              'alert-circle-outline'
            );
            this.storage.remove('isLoggedIn');
            this.storage.clear();
            localStorage.removeItem('isLoggedIn');
            this.navCtrl.navigateRoot('/login');
          } else if (res.msg == 'err') {
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

  paymentRoute(route: string){
    this.navCtrl.navigateRoot([route]);
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
}
