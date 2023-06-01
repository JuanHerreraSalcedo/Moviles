import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CarrilPageRoutingModule } from './carril-routing.module';

import { CarrilPage } from './carril.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CarrilPageRoutingModule
  ],
  declarations: [CarrilPage]
})
export class CarrilPageModule {}
