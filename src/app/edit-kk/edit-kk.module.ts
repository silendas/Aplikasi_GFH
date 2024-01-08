import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EditKkPageRoutingModule } from './edit-kk-routing.module';

import { EditKkPage } from './edit-kk.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    EditKkPageRoutingModule
  ],
  declarations: [EditKkPage]
})
export class EditKkPageModule {}
