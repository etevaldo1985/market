import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { HttpClientModule } from '@angular/common/http';
import { ItemService } from './item.service';
import { ItemRoutingModule } from './item.route';
import { NgModule } from '@angular/core';

import { ItemCardComponent } from './item-card/item-card.component';
import { ItemSingleComponent } from './item-single/item-single.component';
import { ItemAppComponent } from './item.app.component';
import { ItemsViewComponent } from './items-view/items-view.component';
import { CommonModule } from '@angular/common';
import { NewItemComponent } from './new-item/new-item.component';
import { ImageCropperModule } from 'ngx-image-cropper';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';




@NgModule({
  declarations: [
    ItemSingleComponent,
    ItemsViewComponent,
    ItemCardComponent,
    ItemAppComponent,
    NewItemComponent
  ],
  imports: [
    CommonModule,
    ItemRoutingModule,
    HttpClientModule,
    ImageCropperModule,
    FormsModule,
    ReactiveFormsModule,
    NgbModule

  ],
  providers: [ItemService],
  exports: []
})

export class ItemModule {}
