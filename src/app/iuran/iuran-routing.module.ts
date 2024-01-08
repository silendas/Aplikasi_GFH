import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { IuranPage } from './iuran.page';

const routes: Routes = [
  {
    path: '',
    component: IuranPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class IuranPageRoutingModule {}
