import { ClientEditionComponent } from './client-edition/client-edition.component';
import { LoginComponent } from './login/login.component';
import { ClientViewComponent } from './client-view/client-view.component';
import { ClientRegisterComponent } from './client-register/client-register.component';
import { ClientHomeComponent } from './client-home/client-home.component';
import { ClientAppComponent } from './client.app.component';
import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { ClientDeleteComponent } from './client-delete/client-delete.component';


const clientRoutingConfig: Routes = [
  {path: '', component: ClientAppComponent,
children: [
  {path: 'client-view', component: ClientViewComponent},
  {path: 'client-register', component: ClientRegisterComponent},
  {path: 'client-home/:id', component: ClientHomeComponent},
  {path: 'client-delete/:id', component: ClientDeleteComponent},
  {path: 'client-edition/:id', component: ClientEditionComponent}


]},

];

@NgModule ({
  imports: [RouterModule.forChild(clientRoutingConfig)],
  exports: [RouterModule]
})
export class ClientRoutingModule {}
