import { ClientRegisterComponent } from './clients/client-register/client-register.component';
import { LoginComponent } from './clients/login/login.component';
import { ContactComponent } from './institutional/contact/contact.component';
import { AboutComponent } from './institutional/about/about.component';
import { HomeComponent } from './navigation/home/home.component';

import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


const rootRouterConfig: Routes = [
  {path: '', redirectTo: '/home', pathMatch: 'full' },
  {path: 'home', component: HomeComponent},
  {path: 'about', component: AboutComponent},
  {path: 'contact', component: ContactComponent},
  {path: 'client-register', component: ClientRegisterComponent},
{path: 'login', component: LoginComponent},
  {path: 'items-view',
loadChildren: () => import('./item/item.module')
.then(m => m.ItemModule)},
{path: 'client-view',
loadChildren: () => import('./clients/client.module')
.then(m => m.ClientModule)}

];

@NgModule ({
  declarations: [],
  imports: [RouterModule.forRoot(rootRouterConfig)],
  exports: [RouterModule]
})
export class AppRoutingModule {}

