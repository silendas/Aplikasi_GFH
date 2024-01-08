import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CUserPageRoutingModule } from './c-user-routing.module';

import { CUserPage } from './c-user.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CUserPageRoutingModule
  ],
  declarations: [CUserPage]
})
export class CUserPageModule {}
