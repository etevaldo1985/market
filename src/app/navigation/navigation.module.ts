import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';

import { HomeComponent } from './home/home.component';
import { FooterComponent } from './footer/footer.component';
import { MenuComponent } from './menu/menu.component';
import { CommonModule } from '@angular/common';
import { SubMenuComponent } from './menu/sub-menu/sub-menu.component';


@NgModule({
  declarations: [
    MenuComponent,
    FooterComponent,
    HomeComponent,
    SubMenuComponent
  ],
  imports: [
    CommonModule,
    RouterModule
  ],
  exports: [
    MenuComponent,
    FooterComponent,
    HomeComponent,
    SubMenuComponent
  ]

})

export class NavigationModule {}
