import { NewItemComponent } from './new-item/new-item.component';
import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { ItemsViewComponent } from './items-view/items-view.component';
import { ItemAppComponent } from './item.app.component';
import { ItemSingleComponent } from './item-single/item-single.component';


const itemRoutingConfig: Routes = [
    { path: '', component: ItemAppComponent,
  children: [
    {path: 'items-view', component: ItemsViewComponent},
    {path: 'new-item', component: NewItemComponent},
    {path: 'single-item/:id', component: ItemSingleComponent}
  ]
}

];

@NgModule ({
  imports: [RouterModule.forChild(itemRoutingConfig)],
  exports: [RouterModule]
})

export class ItemRoutingModule {}
