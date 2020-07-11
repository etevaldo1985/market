import { HttpClientModule } from '@angular/common/http';
import { NavigationModule } from './navigation/navigation.module';

import { AppRoutingModule } from './app.route';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppComponent } from './app.component';

import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { InstitutionalModule } from './institutional/institutional.module';
import { ClientModule } from './clients/client.module';
import { CustomFormsModule } from 'ng2-validation';
import { ToastrModule } from 'ngx-toastr';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';





@NgModule({
  declarations: [
    AppComponent,

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NavigationModule,
    HttpClientModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    InstitutionalModule,
    ClientModule,
    CustomFormsModule,
    ToastrModule.forRoot(),
    BrowserAnimationsModule,
    NgbModule




  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
