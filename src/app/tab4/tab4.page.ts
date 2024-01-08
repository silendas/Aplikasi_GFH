import { Component, OnInit } from '@angular/core';
import {
  AlertController,
  LoadingController,
  NavController,
  ToastController,
  ModalController,
} from '@ionic/angular';
import { ViewWillEnter } from '@ionic/angular';
import { Storage } from '@ionic/storage';
import { ApiService } from '../api.service';
import { Keyboard } from '@ionic-native/keyboard';
import { Platform } from '@ionic/angular';

@Component({
  selector: 'app-tab4',
  templateUrl: './tab4.page.html',
  styleUrls: ['./tab4.page.scss'],
})
export class Tab4Page implements OnInit {
  public Data: any;
  public msg: string = '';
  pesanInputClass: string = '';

  constructor(
    private toastCtrl: ToastController,
    private loadingCtrl: LoadingController,
    private navCtrl: NavController,
    private storage: Storage,
    private _apiService: ApiService,
    public platform: Platform,
    private alertCtrl:AlertController
  ) {
    platform.ready().then(() => {
      Keyboard.onKeyboardShow().subscribe(() => {
        this.pesanInputClass = 'msg-input2';
      });

      Keyboard.onKeyboardHide().subscribe(() => {
        this.pesanInputClass = 'msg-input';
      });
    });
  }

  ngOnInit() {
    this.getPesan();
  }

  ionViewWillEnter(): void {
    try {
      this.getPesan();
    } catch (e) {
      throw new Error(e + 'Method not implemented.');
    }
  }

  handleRefresh(event: any) {
    setTimeout(() => {
      this.getPesan();
      event.target.complete();
    }, 2000);
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

  async getPesan() {
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
        this._apiService.getPesan(val).then((res) => {
          if (res.msg == 'ok') {
            this.Data = res.data;
          } else if (res.msg == 'notFound') {
            this.Data = null;
            this.presentToast(
              'Belum ada pesan!',
              'warning',
              'alert-circle-outline'
            );
          } else if (res.msg == 'err') {
            this.Data = null;
            this.presentToast(
              'Something went wrong!',
              'danger',
              'alert-circle-outline'
            );
          }
        });
      }
    });
  }

  async send() {
    await this.storage.create();
    this.storage.get('isLoggedIn').then(async (val) => {
      if (this.msg == '' || !this.msg.trim().length) {
        this.presentToast(
          'Isilah pesannya...',
          'warning',
          'alert-circle-outline'
        );
        this.msg = '';
      } else {
        const loader = await this.loadingCtrl.create({
          message: 'Please wait...',
          spinner: 'lines',
        });
        loader.present();
        this._apiService.sendPesan(this.msg, val).then((res) => {
          if (res.msg == 'ok') {
            this.getPesan();
            this.msg = '';
            loader.dismiss();
            this.presentToast(
              'Pesan berhasil dikirim!',
              'success',
              'checkmark-circle-outline'
            );
          } else if (res.msg == 'notOk') {
            this.msg = '';
            loader.dismiss();
            this.presentToast(
              'Pesan gagal dikirim!',
              'danger',
              'alert-circle-outline'
            );
          } else if (res.msg == 'err') {
            loader.dismiss();
            this.presentToast(
              'Something went wrong!' + res.err,
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
}
