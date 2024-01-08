import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { IuranPageRoutingModule } from './iuran-routing.module';

import { IuranPage } from './iuran.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    IuranPageRoutingModule
  ],
  declarations: [IuranPage]
})
export class IuranPageModule {}
