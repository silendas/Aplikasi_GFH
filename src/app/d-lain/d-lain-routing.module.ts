import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DLainPage } from './d-lain.page';

const routes: Routes = [
  {
    path: '',
    component: DLainPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DLainPageRoutingModule {}
