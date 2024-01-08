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
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {
  public nik: string = '';
  public email: string = '';

  constructor(
    public router: Router,
    public route: ActivatedRoute,
    private toastCtrl: ToastController,
    private loadingCtrl: LoadingController,
    private navCtrl: NavController,
    private storage: Storage,
    private _apiService: ApiService
  ) {}

  async presentToast(msg: any, color: any, icon: any) {
    const toast = await this.toastCtrl.create({
      icon: icon,
      message: msg,
      duration: 3000,
      color: color,
      position: 'top',
    });
    toast.present();
  }

  async Insert() {
    if (
      this.nik == '' ||
      this.email == '' ||
      !this.nik.trim().length ||
      !this.email.trim().length
    ) {
      this.presentToast(
        'Tidak boleh ada form yang kosong, harap isi semua form!',
        'warning',
        'alert-circle-outline'
      );
    } else {
      const loader = await this.loadingCtrl.create({
        message: 'Please wait...',
        spinner: 'lines',
      });
      loader.present();
      try {
        let url = this._apiService.uriApi + 'penduduk?nik=' + this.nik;
        const res = await axios.get(url);
        if (res.data.status == 'Ok') {
          let data = res.data.result[0];
          if (data.status_huni == 'Aktif') {
            if (
              data.status_keluarga == 'Istri' ||
              data.status_keluarga == 'Kepala Keluarga'
            ) {
              const formData = new FormData();
              formData.append('nik', this.nik);
              formData.append('email', this.email);
              this._apiService.register(formData).then((res) => {
                if (res.msg == 'Ok') {
                  this.loadingCtrl.dismiss();
                  this.presentToast(
                    'Pendaftaran berhasil, silahkan check email untuk mengetahui username dan password anda.',
                    'success',
                    'checkmark-circle-outline'
                  );
                  this.navCtrl.navigateBack('/login');
                } else if (res.msg == 'notOk') {
                  this.loadingCtrl.dismiss();
                  this.presentToast(
                    'Pendaftaran gagal !',
                    'danger',
                    'alert-circle-outline'
                  );
                } else if (res.msg == 'notFound') {
                  this.loadingCtrl.dismiss();
                  this.presentToast(
                    'NIK belum terdaftar, hubungi RT untuk mendaftarkan diri !',
                    'danger',
                    'alert-circle-outline'
                  );
                } else if (res.msg == 'notSend') {
                  this.loadingCtrl.dismiss();
                  this.presentToast(
                    'Email gagal terkirim !',
                    'danger',
                    'alert-circle-outline'
                  );
                }else if (res.msg == 'Already') {
                  this.loadingCtrl.dismiss();
                  this.presentToast(
                    'Akun telah terdaftar !',
                    'warning',
                    'alert-circle-outline'
                  );
                }else if (res.msg == 'err') {
                  this.loadingCtrl.dismiss();
                  this.presentToast(
                    'Something went wrong !',
                    'danger',
                    'alert-circle-outline'
                  );
                }
              });
            } else {
              this.loadingCtrl.dismiss();
              this.presentToast(
                'Akun tidak diperbolehkan mendaftar !',
                'warning',
                'checkmark-circle-outline'
              );
            }
          } else {
            this.loadingCtrl.dismiss();
            this.presentToast(
              'NIK tersebut sudah tidak aktif !',
              'warning',
              'checkmark-circle-outline'
            );
          }
        } else {
          this.loadingCtrl.dismiss();
          this.presentToast(
            'Akun tidak ditemukan !',
            'danger',
            'checkmark-circle-outline'
          );
        }
      } catch (err) {
        if (err.response.data.message == 'Penduduk not found') {
          this.loadingCtrl.dismiss();
          this.presentToast(
            'NIK belum terdaftar, hubungi RT untuk mendaftarkan diri !',
            'warning',
            'checkmark-circle-outline'
          );
        } else {
          this.loadingCtrl.dismiss();
          this.presentToast(
            'Something went wrong!',
            'danger',
            'checkmark-circle-outline'
          );
        }
      }
    }
  }

  ngOnInit() {}
}
