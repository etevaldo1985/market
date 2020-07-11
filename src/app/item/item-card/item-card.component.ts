import { ItemService } from './../item.service';
import { Component, Input } from '@angular/core';
import { Item } from '../item';

@Component({
  selector: 'app-item-card',
  templateUrl: './item-card.component.html',
  styleUrls: ['./item-card.component.css']
})
export class ItemCardComponent {

  constructor(private itemService: ItemService){}

  @Input()
  item: Item;

  currentRate = 0;

  addRate(item: Item) {

    this.itemService.updateRate(item);

  }


}
