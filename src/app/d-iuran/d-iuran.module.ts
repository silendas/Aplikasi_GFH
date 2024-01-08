import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DIuranPageRoutingModule } from './d-iuran-routing.module';

import { DIuranPage } from './d-iuran.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DIuranPageRoutingModule
  ],
  declarations: [DIuranPage]
})
export class DIuranPageModule {}
