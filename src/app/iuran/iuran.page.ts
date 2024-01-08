import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import {
  LoadingController,
  NavController,
  ToastController,
} from '@ionic/angular';
import { Storage } from '@ionic/storage';
import { ApiService } from '../api.service';

@Component({
  selector: 'app-iuran',
  templateUrl: './iuran.page.html',
  styleUrls: ['./iuran.page.scss'],
})
export class IuranPage implements OnInit {
  public tahunList: any[]= [];
  public image: any;
  public ket: string = '';
  public jenis: string = '';
  public tahun: string = '';
  public bulan: string = '';

  constructor(
    public router: Router,
    public route: ActivatedRoute,
    private toastCtrl: ToastController,
    private loadingCtrl: LoadingController,
    private navCtrl: NavController,
    private storage: Storage,
    private _apiService: ApiService
  ) {
    let currentYear = new Date().getFullYear();
    for (let i = 2019; i < currentYear + 1; i++){
      var tahunObj = {
        tahun: i
      }
      this.tahunList.push(tahunObj)
    } 
    for (let i = currentYear + 1; i < currentYear + 6; i++){
      var tahunObj = {
        tahun: i
      }
      this.tahunList.push(tahunObj)
    } 
    this.route.queryParams.subscribe((params) => {
      if (params['bulan'] !== null || params['tahun'] !== null) {
        this.bulan = params['bulan'];
        this.tahun = params['tahun'];
        this.jenis = params['jenis'];
      }
    });
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

  async getFile(event: any) {
    const file = event.target.files[0];
    this.image = file;
  }

  async insertIuran() {
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
        if (
          this.image == null ||
          this.image == undefined ||
          this.bulan == null ||
          this.jenis == null ||
          this.ket == null ||
          this.tahun == null
        ) {
          this.presentToast(
            'Isilah semua form !',
            'warning',
            'alert-circle-outline'
          );
        } else {
          const loader = await this.loadingCtrl.create({
            message: 'Please wait...',
            spinner: "lines",
          });
          loader.present();
          this._apiService.getKeluarga(val).then((res)=>{
            var dateTime = new Date().toISOString();
            const formData = new FormData();
            formData.append('kd_penduduk', val);
            formData.append('kd_blok', res.data.kd_blok);
            formData.append('jenis_pembayaran', this.jenis);
            formData.append('keterangan', this.ket);
            formData.append('tgl_pembayaran', dateTime);
            formData.append('iuran_foto', this.image);
            formData.append('kas_tahun', this.tahun);
            formData.append('kas_bulan', this.bulan);
            this._apiService.insertIuran(formData).then((res) => {
              if (res.msg == 'ok') {
                loader.dismiss();
                this.presentToast(
                  'Iuran berhasil dikirim !',
                  'success',
                  'checkmark-circle-outline'
                );
                this.navCtrl.navigateRoot('/tabs/tab1');
              }else if (res.msg == 'noImage') {
                loader.dismiss();
                this.presentToast(
                  'Masukkan image untuk bukti pembayaran!',
                  'danger',
                  'alert-circle-outline'
                );
              } else if (res.msg == 'notOk') {
                loader.dismiss();
                this.presentToast(
                  'Iuran gagal dikirim !',
                  'danger',
                  'alert-circle-outline'
                );
              } else if (res.msg == 'err') {
                loader.dismiss();
                this.presentToast(
                  'Something went wrong !',
                  'danger',
                  'alert-circle-outline'
                );
              } else if (res.msg == 'already') {
                loader.dismiss();
                this.presentToast(
                  'Anda sudah membayar bulan dan tahun tersebut !',
                  'warning',
                  'alert-circle-outline'
                );
              }
            });
          })
        }
      }
    });
  }

  ngOnInit() {}
}
