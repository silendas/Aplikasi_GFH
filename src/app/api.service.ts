import { Injectable } from '@angular/core';
import axios from 'axios';
import { Storage } from '@ionic/storage';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  public uriApi: string = 'https://localhost/rest-api/index.php/';

  constructor(private storage: Storage) {}

  async login(username: string, password: string) {
    try {
      let url =
        this.uriApi + 'login?username=' + username + '&password=' + password;
      const res = await axios.get(url);
      if (res.data.status == 'Ok') {
        let data = res.data.result[0];
        const storage = await this.storage.create();
        storage.set('isLoggedIn', data.kd_penduduk);
        // localStorage.setItem('isLoggedIn', data.nik);
        return 'success';
      } else if(res.data.status == 'notOk') {
        return 'notFound';
      } else if(res.data.status == 'notAllow'){
        return 'notAllow';
      }
    } catch (err) {
        return 'err';
    }
  }

  async getWarga(kd_pnddk: string) {
    try {
      let url = this.uriApi + 'penduduk?kd_pnddk=' + kd_pnddk;
      const res = await axios.get(url);
      let data = res.data.result[0];
      if(res.data.status == 'Ok'){
        if (data.status_huni == 'Aktif') {
          const foto = await axios.get(
            this.uriApi + 'profileimage?file=' + data.foto
          );
          if (foto.data.status !== 'Not Found') {
            data.foto = this.uriApi + 'profileimage?file=' + data.foto;
          } else {
            data.foto = this.uriApi + 'profileimage?file=nofoto.png';
          }
          return {
            msg: 'ok',
            data: data,
          };
        } else {
          return {
            msg: 'notActive',
          };
        }
      } else if ( res.data.status == 'notOk' ){
        return {
          msg: 'notFound',
        };
      }
    } catch (err) {
      return {
        msg: 'err',
        err: err,
      };
    }
  }

  async getKeluarga(kd_pnddk: string) {
    try {
      let url = this.uriApi + 'penduduk?kd_pnddk=' + kd_pnddk;
      const res = await axios.get(url);
      let data = res.data.result[0];
      const foto = await axios.get(
        this.uriApi + 'profileimage?file=' + data.foto
      );
      if (foto.data.status !== 'Not Found') {
        data.foto = this.uriApi + 'profileimage?file=' + data.foto;
      } else {
        data.foto = this.uriApi + 'profileimage?file=nofoto.png';
      }
      return {
        msg: 'ok',
        data: data,
      };
    } catch (err) {
      return {
        msg: 'err',
        err: err,
      };
    }
  }

  async getKK(kd_pnddk: string) {
    try {
      let get = this.uriApi + 'penduduk?kd_pnddk=' + kd_pnddk;
      const penduduk = await axios.get(get);
      if (penduduk.data.status == 'Ok') {
        let dataPenduduk = penduduk.data.result[0];
        let uri = this.uriApi + 'penduduk?kd_blok='+ dataPenduduk.kd_blok +'&stts_kavling='+ dataPenduduk.status_kavling +'&stts_huni=Aktif';
        const res = await axios.get(uri);
        var data = res.data.result;
      } else {
        return {
          msg: 'err',
        };
      }
      return {
        msg: 'ok',
        data: data,
      };
    } catch (err) {
      return {
        msg: 'err',
        err: err,
      };
    }
  }

  async getInfo() {
    try {
      let url = this.uriApi + 'info';
      const res = await axios.get(url);
      let data = res.data.result;
      if(res.data.status == 'Ok'){
        return {
          msg: 'ok',
          data: data,
        };
      } else if(res.data.status == 'Not Found'){
        return {
          msg: 'notFound',
        };
      }
    } catch (err) {
        return {
          msg: 'err',
          err: err,
        };
    }
  }

  public dataObject: any = [
    {
      bulan: 'Januari',
      status: 'Belum dibayar !',
      ket: 'Anda belum membayar bulan ini...',
      tgl: '-',
    },
    {
      bulan: 'Februari',
      status: 'Belum dibayar !',
      ket: 'Anda belum membayar bulan ini...',
      tgl: '-',
    },
    {
      bulan: 'Maret',
      status: 'Belum dibayar !',
      ket: 'Anda belum membayar bulan ini...',
      tgl: '-',
    },
    {
      bulan: 'April',
      status: 'Belum dibayar !',
      ket: 'Anda belum membayar bulan ini...',
      tgl: '-',
    },
    {
      bulan: 'Mei',
      status: 'Belum dibayar !',
      ket: 'Anda belum membayar bulan ini...',
      tgl: '-',
    },
    {
      bulan: 'Juni',
      status: 'Belum dibayar !',
      ket: 'Anda belum membayar bulan ini...',
      tgl: '-',
    },
    {
      bulan: 'Juli',
      status: 'Belum dibayar !',
      ket: 'Anda belum membayar bulan ini...',
      tgl: '-',
    },
    {
      bulan: 'Agustus',
      status: 'Belum dibayar !',
      ket: 'Anda belum membayar bulan ini...',
      tgl: '-',
    },
    {
      bulan: 'September',
      status: 'Belum dibayar !',
      ket: 'Anda belum membayar bulan ini...',
      tgl: '-',
    },
    {
      bulan: 'Oktober',
      status: 'Belum dibayar !',
      ket: 'Anda belum membayar bulan ini...',
      tgl: '-',
    },
    {
      bulan: 'November',
      status: 'Belum dibayar !',
      ket: 'Anda belum membayar bulan ini...',
      tgl: '-',
    },
    {
      bulan: 'Desember',
      status: 'Belum dibayar !',
      ket: 'Anda belum membayar bulan ini...',
      tgl: '-',
    },
  ];
  async getPayment(kd: string, year: string, jenis: string) {
    try {
      let url =
        this.uriApi + 'iuran?kd=' + kd + '&thn=' + year + '&jenis=' + jenis;
      const res = await axios.get(url);
      for (let i = 0; i < 12; i++) {
        this.dataObject[i].status = 'Belum dibayar !';
        this.dataObject[i].ket = 'Anda belum membayar bulan ini...';
        this.dataObject[i].tgl = '..-..';
        this.dataObject[i].tahun = year;
        this.dataObject[i].jenis = jenis;
        this.dataObject[i].blnNmr = i+1;
      }
      if (res.data.status == 'Err') {
        if (jenis == 'KAS') {
          return {
            msg: 'notFound',
            data: this.dataObject,
          };
        } else {
          return {
            msg: 'notFound',
          };
        }
      } else {
        let data = res.data.result;
        for (let i = 0; i < data.length; i++) {
          let bln = data[i].kas_bulan - 1;
          data[i].kas_bulan = this.dataObject[bln].bulan;
          if (data[i].status == '1') {
            data[i].status = 'Oke';
          } else {
            data[i].status = 'Menunggu Verifikasi';
          }
          this.dataObject[bln].status = data[i].status;
          this.dataObject[bln].ket = data[i].keterangan;
          this.dataObject[bln].tgl = data[i].tgl_pembayaran;
        }
        if (jenis == 'KAS') {
          return {
            msg: 'ok',
            data: this.dataObject,
          };
        } else if (jenis == 'Lainnya') {
          return {
            msg: 'ok',
            data: data,
          };
        }
      }
    } catch (err: any) {
      return {
        msg: 'err',
        err: err,
      };
    }
  }

  async getBlok() {
    try {
      let url = this.uriApi + 'blok';
      const res = await axios.get(url);
      let data = res.data.result;
      return {
        msg: 'ok',
        data: data,
      };
    } catch (err: any) {
      return {
        msg: 'err',
        err: err,
      };
    }
  }

  async getPesan(kd_pnddk: string) {
    try {
      let url = this.uriApi + 'pesan?kd_pnddk=' + kd_pnddk;
      const res = await axios.get(url);
      let data = res.data.result;
      if (res.data.status == 'Ok') {
        return {
          msg: 'ok',
          data: data,
        };
      } else if (res.data.status == 'Not Found') {
        return {
          msg: 'notFound',
        };
      }
    } catch (err: any) {
      return {
        msg: 'err',
        err: err,
      };
    }
  }

  async sendPesan(msg: string, kd_pnddk: string) {
    try {
      var dateTime = new Date().toISOString();
      let url = this.uriApi + 'pesan';
      const formData = new FormData();
      formData.append('kd_pnddk', kd_pnddk);
      formData.append('pesan', msg);
      formData.append('tgl_pesan', dateTime);
      const res = await axios.post(url, formData);
      if (res.data.status == 'Ok') {
        return {
          msg: 'ok',
        };
      } else {
        return {
          msg: 'notOk',
        };
      }
    } catch (err: any) {
      return {
        msg: 'err',
        err: err,
      };
    }
  }

  async register(data: any) {
    try {
      let url = this.uriApi + 'register';
      const res = await axios.post(url, data);
      if (res.data.status == 'Ok') {
        return {
          msg: 'Ok',
        };
      } else if (res.data.status == 'Already') {
        return {
          msg: 'Already',
        };
      } else if(res.data.status == 'notOk'){
        return {
          msg: 'notOk',
        };
      }
      else if(res.data.status == 'notFound'){
        return {
          msg: 'notFound',
        };
      } else if(res.data.status == 'notSend'){
        return {
          msg: 'notSend',
        };
      }
    } catch (err: any) {
      return {
        msg: 'err',
        err: err,
      };
    }
  }

  async createPenduduk(data: any) {
    try {
      let url = this.uriApi + 'penduduk';

      const res = await axios.post(url, data);
      if (res.data.status == 'Ok') {
        return {
          msg: 'ok',
        };
      } else if(res.data.status == 'Already') {
        return {
          msg: 'Already',
        };
      } else {
        return {
          msg: 'notOk',
        };
      }
    } catch (err: any) {
      return {
        msg: 'err',
        err: err,
      };
    }
  }

  async updateUser(data: any) {
    try {
      let url = this.uriApi + 'update_user';

      const res = await axios.post(url, data);
      if (res.data.status == 'Ok') {
        return {
          msg: 'Ok',
        };
      } else if(res.data.status == 'Already'){
        return {
          msg: 'Already',
        };
      } else if(res.data.status == 'notOk') {
        return {
          msg: 'notOk',
        };
      }
    } catch (err: any) {
      return {
        msg: 'err',
        err: err,
      };
    }
  }

  async updatePenduduk(data: any) {
    try {
      let url = this.uriApi + 'update_penduduk';

      const res = await axios.post(url, data);
      
      if (res.data.status == 'Ok') {
        return {
          msg: 'ok',
        };
      } else {
        return {
          msg: 'notOk',
        };
      }
    } catch (err: any) {
      return {
        msg: 'err',
        err: err,
      };
    }
  }

  async insertIuran(data: any) {
    try {
      let url = this.uriApi + 'iuran';
      const res = await axios.post(url, data);
      if (res.data.status == 'Ok') {
        return {
          msg: 'ok',
        };
      } else if (res.data.status == 'Already') {
        return {
          msg: 'already',
        };
      } else if(res.data.status == 'noImage') {
        return {
          msg: 'noImage',
        };
      } else if(res.data.status == 'notOk') {
        return {
          msg: 'notOk',
        };
      }
    } catch (err: any) {
      return {
        msg: 'err',
        err: err,
      };
    }
  }
}
