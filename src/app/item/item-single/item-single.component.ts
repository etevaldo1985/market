import { ItemService } from './../item.service';
import { Component, OnInit, Input } from '@angular/core';

import { ActivatedRoute, Router } from '@angular/router';
import { Item } from '../item';

@Component({
  selector: 'app-item-single',
  templateUrl: './item-single.component.html',
  styleUrls: ['./item-single.component.css']
})
export class ItemSingleComponent implements OnInit {


  item: Item;



  constructor(
    private itemService: ItemService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.route.params
    .subscribe(params => {

      this.itemService.getById(params.id)
      .subscribe(
        item => {
          this.item = item;
        },
        error => console.log(error)

      );

    });





  }

}
