import { HttpClientModule } from '@angular/common/http';
import { ItemService } from './item.service';
import { ItemRoutingModule } from './item.route';
import { NgModule } from '@angular/core';

import { ItemCardComponent } from './item-card/item-card.component';
import { ItemSingleComponent } from './item-single/item-single.component';
import { ItemAppComponent } from './item.app.component';
import { ItemsViewComponent } from './items-view/items-view.component';
import { CommonModule } from '@angular/common';

@NgModule({
  declarations: [
    ItemSingleComponent,
    ItemsViewComponent,
    ItemCardComponent,
    ItemAppComponent
  ],
  imports: [
    CommonModule,
    ItemRoutingModule,
    HttpClientModule
  ],
  providers: [ItemService],
  exports: []
})

export class ItemModule {}
