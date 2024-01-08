import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DLainPageRoutingModule } from './d-lain-routing.module';

import { DLainPage } from './d-lain.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DLainPageRoutingModule
  ],
  declarations: [DLainPage]
})
export class DLainPageModule {}
