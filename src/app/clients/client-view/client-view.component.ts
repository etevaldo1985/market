import { ClientService } from './../services/client.service';
import { Component, OnInit } from '@angular/core';
import { Client } from '../models/client';

@Component({
  selector: 'app-client-view',
  templateUrl: './client-view.component.html',
  styleUrls: ['./client-view.component.css']
})
export class ClientViewComponent implements OnInit {

  clients: Client[];

  constructor(private clientService: ClientService) { }

  ngOnInit(): void {
    this.clientService.getEmailClients()
    .subscribe(
      clients => {
        this.clients = clients;
      },
      error => console.log(error)
    )

  }


}
