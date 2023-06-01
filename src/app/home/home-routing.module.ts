import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomePage } from './home.page';
import { CarrilPage } from '../carril/carril.page';

const routes: Routes = [
  {
    path: '',
    component: HomePage,
  },
  {path: 'carril', component: CarrilPage},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomePageRoutingModule {}
