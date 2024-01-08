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
  selector: 'app-d-iuran',
  templateUrl: './d-iuran.page.html',
  styleUrls: ['./d-iuran.page.scss'],
})
export class DIuranPage {
  public Data:any;
  public listKas: any[] = [];
  public tahunList: any[] = [];
  public currentYear: string = String((new Date()).getFullYear());
  public searchYear: string = this.currentYear;

  constructor(
    private toastCtrl: ToastController,
    private loadingCtrl: LoadingController,
    private navCtrl: NavController,
    private storage: Storage,
    private _apiService: ApiService
  ) { 
    let currentYear = new Date().getFullYear();
    for (let i = currentYear - 5; i < currentYear + 1; i++){
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
    this.getPayment();
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

  handleRefresh(event:any) {
    setTimeout(() => {
      this.getPayment();
      event.target.complete();
    }, 2000);
  }

  async getPayment(){
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
          spinner: "lines",
        });
        loader.present();
        if(this.searchYear == ''){
          this._apiService.getKeluarga(val).then((res)=>{
            this._apiService.getPayment(res.data.kd_blok, this.currentYear, 'KAS').then((res) => {
              if (res.msg == 'ok') {
                this.Data = res.data;
                loader.dismiss();
                this.presentToast(
                  'Berhasil menampilkan data !',
                  'success',
                  'checkmark-circle-outline'
                );
              }else if (res.msg == 'notFound') {
                this.Data = res.data;
                this.presentToast(
                  'Belum ada transaksi di tahun ini !',
                  'warning',
                  'alert-circle-outline'
                );
                loader.dismiss();
              } else if (res.msg == 'err') {
                this.presentToast(
                  'Something went wrong',
                  'danger',
                  'alert-circle-outline'
                );
                loader.dismiss();
              }
            });
          })
        } else {
          this._apiService.getKeluarga(val).then((res)=>{
            this._apiService.getPayment(res.data.kd_blok, this.searchYear, 'KAS').then((res) => {
              if (res.msg == 'ok') {
                this.Data = res.data;
                loader.dismiss();
                this.presentToast(
                  'Berhasil menampilkan data !',
                  'success',
                  'checkmark-circle-outline'
                );
              }else if (res.msg == 'notFound') {
                this.Data = res.data;
                this.presentToast(
                  'Belum ada transaksi di tahun ini !',
                  'warning',
                  'alert-circle-outline'
                );
                loader.dismiss();
              } else if (res.msg == 'err') {
                this.presentToast(
                  'Something went wrong',
                  'danger',
                  'alert-circle-outline'
                );
                loader.dismiss();
              }
            });
          })
        }
      }
    });
  }

  toIuran(bulan: string, tahun: string) {
    this.navCtrl.navigateRoot('/iuran?bulan=' + bulan + '&tahun=' + tahun + '&jenis=KAS');
  }

}
