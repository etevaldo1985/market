import { HttpClientModule } from '@angular/common/http';
import { ClientRoutingModule } from './client.route';
import { ClientAppComponent } from './client.app.component';
import { NgModule } from '@angular/core';

import { ClientRegisterComponent } from './client-register/client-register.component';
import { ClientViewComponent } from './client-view/client-view.component';
import { ClientHomeComponent } from './client-home/client-home.component';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login/login.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CustomFormsModule } from 'ng2-validation';
import { ClientService } from './services/client.service';
import { ClientDeleteComponent } from './client-delete/client-delete.component';


@NgModule ({
  declarations: [
    ClientHomeComponent,
    ClientViewComponent,
    ClientRegisterComponent,
    ClientAppComponent,
    LoginComponent,
    ClientDeleteComponent
  ],
  imports: [
    CommonModule,
    ClientRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    CustomFormsModule
  ],
  exports: [],
  providers: [ClientService]
})

export class ClientModule {}
