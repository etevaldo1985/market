import { ClientService } from './client.service';
import { Client } from './../models/client';
import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';


@Injectable()
export class ClientResolve implements Resolve<Client> {

    constructor(private clientService: ClientService) { }

    resolve(route: ActivatedRouteSnapshot) {
        return this.clientService.getCliById(route.params['id']);
    }
}
