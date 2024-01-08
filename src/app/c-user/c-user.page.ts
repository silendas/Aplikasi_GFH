import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import {
  AlertController,
  LoadingController,
  NavController,
  ToastController,
  ModalController,
} from '@ionic/angular';
import { Storage } from '@ionic/storage';
import { ApiService } from '../api.service';
import axios from 'axios';

@Component({
  selector: 'app-c-user',
  templateUrl: './c-user.page.html',
  styleUrls: ['./c-user.page.scss'],
})
export class CUserPage implements OnInit {
  public email: string = '';
  public username: string = '';
  public password: string = '';

  constructor(
    public router: Router,
    public route: ActivatedRoute,
    private toastCtrl: ToastController,
    private loadingCtrl: LoadingController,
    private navCtrl: NavController,
    private storage: Storage,
    private _apiService: ApiService
  ) {
    this.getUser();
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
    try {
      await this.storage.create();
      this.storage.get('isLoggedIn').then(async (val) => {
        if (val == null) {
          this.presentToast(
            'You are not logged in!',
            'danger',
            'alert-circle-outline'
          );
          this.navCtrl.navigateRoot('/login');
        } else {
          const res = await axios.get(
            this._apiService.uriApi + 'user?kd_pnddk=' + val
          );
          if (res.data !== null) {
            let data = res.data.result[0];
            this.email = data.email;
            this.username = data.username;
            this.password = data.password;
          } else {
            this.presentToast(
              'Data not found!',
              'danger',
              'alert-circle-outline'
            );
          }
        }
      });
    } catch (err) {
      this.presentToast(
        'Something went wrong!',
        'danger',
        'alert-circle-outline'
      );
    }
  }

  async updateUser() {
    if (
      this.email == '' ||
      this.username == '' ||
      this.password == ''
    ) {
      this.presentToast(
        'Tidak boleh ada form yang kosong, harap isi semua form!',
        'warning',
        'alert-circle-outline'
      );
    } else {
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
          const loader = await this.loadingCtrl.create({
            message: 'Please wait...',
            spinner: 'lines',
          });
          loader.present();
          const formData = new FormData();
          formData.append('email', this.email);
          formData.append('username', this.username);
          formData.append('password', this.password);
          formData.append('kd_penduduk', val);
          this._apiService.updateUser(formData).then((res)=>{
            if(res.msg == 'Ok'){
              this.loadingCtrl.dismiss();
              this.presentToast(
                'Data Akun berhasil diubah !',
                'success',
                'checkmark-circle-outline'
              );
              this.navCtrl.navigateBack('/tabs/tab1');
            } else if(res.msg == 'Already'){
              this.loadingCtrl.dismiss();
              this.presentToast(
                'Username dan password sudah ada, buatlah username dan password baru',
                'warning',
                'alert-circle-outline'
              );
            }else if(res.msg == 'notOk'){
              this.loadingCtrl.dismiss();
              this.presentToast(
                'Data Gagal diubah !',
                'danger',
                'alert-circle-outline'
              );
            } else if(res.msg == 'err'){
              this.presentToast(
                'Something went wrong !',
                'danger',
                'alert-circle-outline'
              );
            }
          });
        }
      });
    }
  }

  ngOnInit() {}
}
