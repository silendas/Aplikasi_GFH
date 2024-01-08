import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./tabs/tabs.module').then(m => m.TabsPageModule)
  },
  {
    path: 'login',
    loadChildren: () => import('./login/login.module').then( m => m.LoginPageModule)
  },
  {
    path: 'tab4',
    loadChildren: () => import('./tab4/tab4.module').then( m => m.Tab4PageModule)
  },
  {
    path: 'splash',
    loadChildren: () => import('./splash/splash.module').then( m => m.SplashPageModule)
  },
  {
    path: 'edit-kk',
    loadChildren: () => import('./edit-kk/edit-kk.module').then( m => m.EditKkPageModule)
  },
  {
    path: 'iuran',
    loadChildren: () => import('./iuran/iuran.module').then( m => m.IuranPageModule)
  },
  {
    path: 'd-iuran',
    loadChildren: () => import('./d-iuran/d-iuran.module').then( m => m.DIuranPageModule)
  },
  {
    path: 'd-lain',
    loadChildren: () => import('./d-lain/d-lain.module').then( m => m.DLainPageModule)
  },
  {
    path: 'create-kk',
    loadChildren: () => import('./create-kk/create-kk.module').then( m => m.CreateKkPageModule)
  },
  {
    path: 'register',
    loadChildren: () => import('./register/register.module').then( m => m.RegisterPageModule)
  },
  {
    path: 'c-user',
    loadChildren: () => import('./c-user/c-user.module').then( m => m.CUserPageModule)
  },
];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
