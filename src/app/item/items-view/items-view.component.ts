import { ItemService } from './../item.service';
import { Item } from './../item';
import { Component, OnInit } from '@angular/core';



@Component({
  selector: 'app-items-view',
  templateUrl: './items-view.component.html',
  styleUrls: ['./items-view.component.css']
})
export class ItemsViewComponent implements OnInit {

  items: Item[];

  constructor(private itemService: ItemService) { }

  ngOnInit(): void {

    this.itemService.getItems()
    .subscribe(
      items => {
        this.items = items;

      },
      error => console.log(error)
    );

  }

}
