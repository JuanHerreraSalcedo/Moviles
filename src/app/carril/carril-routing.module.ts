import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CarrilPage } from './carril.page';

const routes: Routes = [
  {
    path: '',
    component: CarrilPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CarrilPageRoutingModule {}
