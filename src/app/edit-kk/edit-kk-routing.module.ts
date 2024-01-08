import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EditKkPage } from './edit-kk.page';

const routes: Routes = [
  {
    path: '',
    component: EditKkPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EditKkPageRoutingModule {}
