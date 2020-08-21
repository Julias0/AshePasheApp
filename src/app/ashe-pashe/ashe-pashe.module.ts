import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AshePasheRoutingModule } from './ashe-pashe-routing.module';
import { DashboardComponent } from './dashboard/dashboard.component';
import { BaseComponent } from './base/base.component';


@NgModule({
  declarations: [
    BaseComponent,
    DashboardComponent
  ],
  imports: [
    CommonModule,
    AshePasheRoutingModule
  ]
})
export class AshePasheModule { }
