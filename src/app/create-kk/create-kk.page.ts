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

@Component({
  selector: 'app-create-kk',
  templateUrl: './create-kk.page.html',
  styleUrls: ['./create-kk.page.scss'],
})
export class CreateKkPage implements OnInit {
  public Blok: any;
  public image: any;
  public nik: string = '';
  public kk: string = '';
  public nama: string = '';
  public tmpt_lhr: string = '';
  public jk: string = '';
  public tgl_lhr: string = '';
  public agama: string = '';
  public stts_prkwn: string = '';
  public stts_klrg: string = '';
  public stts_kwngn: string = '';
  public stts_pkrjan: string = '';
  public stts_kvlng: string = '';
  public kd_blok: string = '';
  public tgl_msk: string = '';
  public stts_nik: string = '';

  constructor(
    public router: Router,
    public route: ActivatedRoute,
    private toastCtrl: ToastController,
    private loadingCtrl: LoadingController,
    private navCtrl: NavController,
    private storage: Storage,
    private _apiService: ApiService
  ) {
    this.getBlok();
    this.route.queryParams.subscribe((params) => {
      this.kk = String(params.kk);
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

  async getBlok() {
    this._apiService.getBlok().then((res) => {
      if (res.msg == 'ok') {
        this.Blok = Array(res.data);
        if (res.data !== null) {
          this.Blok = res.data;
        } else {
          this.presentToast(
            'Blok not found !',
            'danger',
            'alert-circle-outline'
          );
        }
      } else if (res.msg == 'err') {
        this.presentToast(
          'Something went wrong',
          'danger',
          'alert-circle-outline'
        );
      }
    });
  }

  async Insert() {
    if (
      this.nik == '' ||
      this.nama == '' ||
      this.kk == '' ||
      this.stts_nik == '' ||
      this.tgl_lhr == '' ||
      this.agama == '' ||
      this.tmpt_lhr == '' ||
      this.jk == '' ||
      this.stts_prkwn == '' ||
      this.stts_pkrjan == '' ||
      this.stts_kwngn == '' ||
      this.stts_kvlng == '' ||
      this.stts_klrg == '' ||
      this.tgl_msk == '' ||
      this.kd_blok == ''
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
      const formData = new FormData();
      formData.append('nik', this.nik);
      formData.append('kk', this.kk);
      formData.append('stts_nik', this.stts_nik);
      formData.append('nama', this.nama);
      formData.append('jenis_kelamin', this.jk);
      formData.append('tempat_lahir', this.tmpt_lhr);
      formData.append('tgl_lahir', this.tgl_lhr);
      formData.append('agama', this.agama);
      formData.append('status_perkawinan', this.stts_prkwn);
      formData.append('status_keluarga', this.stts_klrg);
      formData.append('status_pekerjaan', this.stts_pkrjan);
      formData.append('status_kewarganegaraan', this.stts_kwngn);
      formData.append('status_kavling', this.stts_kvlng);
      formData.append('kd_blok', this.kd_blok);
      formData.append('tgl_masuk', this.tgl_msk);
      if (this.image !== undefined || this.image !== null) {
        formData.append('foto_warga', this.image);
      }
      this._apiService.createPenduduk(formData).then((res) => {
        if (res.msg == 'ok') {
          this.loadingCtrl.dismiss();
          this.presentToast(
            'Data berhasil ditambahkan !',
            'success',
            'checkmark-circle-outline'
          );
          this.navCtrl.navigateRoot('/tabs/tab2');
        } else if (res.msg == 'Already') {
          this.loadingCtrl.dismiss();
          this.presentToast(
            'NIK tersebut sudah ada !',
            'warning',
            'alert-circle-outline'
          );
        } else if (res.msg == 'notOk') {
          this.loadingCtrl.dismiss();
          this.presentToast(
            'Data gagal ditambahkan !',
            'danger',
            'alert-circle-outline'
          );
        } else if (res.msg == 'err') {
          this.loadingCtrl.dismiss();
          this.presentToast(
            'Something went wrong !',
            'danger',
            'alert-circle-outline'
          );
        }
      });
    }
  }

  ngOnInit() {}
}
