import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CreateKkPageRoutingModule } from './create-kk-routing.module';

import { CreateKkPage } from './create-kk.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CreateKkPageRoutingModule
  ],
  declarations: [CreateKkPage]
})
export class CreateKkPageModule {}
