import { Client } from './../models/client';
import { ActivatedRoute } from '@angular/router';
import { ClientService } from './../services/client.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-client-delete',
  templateUrl: './client-delete.component.html',
  styleUrls: ['./client-delete.component.css']
})
export class ClientDeleteComponent implements OnInit {

  client: Client;

  constructor(private clientService: ClientService,
    private route: ActivatedRoute) { }

  ngOnInit(): void {


    this.route.params
    .subscribe(params => {

      this.clientService.getCliById(params.id)
      .subscribe(
        client => {
          this.client = client;
        },
        error => console.log(error)

      );

    },
    error => console.log(error))
  }

  deleteClient(){

  }

}
