import { Login } from './../models/login';
import { Observable } from 'rxjs';
import { Client } from './../models/client';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BaseService } from 'src/app/services/base.service';
import { catchError, map } from "rxjs/operators";

@Injectable()
export class ClientService extends BaseService {

  client: Client[];
  logins: Login[];

  constructor(private http: HttpClient) { super(); }

  registerClient(client: Client): Observable<Client> {
    let response = this.http
    .post(this.UrlService + 'clients', client)
    .pipe(
      map(this.extractData),
      catchError(this.serviceError));

      return response;
  }
  login(logins: Login): Observable<Login> {
    let response = this.http
    .post(this.UrlService + 'login', logins)
    .pipe(
      map(this.extractData),
      catchError(this.serviceError));

      return response;
  }

  getLogins(): Observable<Login[]> {
    return  this.http
     .get<Login[]>(this.UrlService + 'login')
     .pipe(catchError(super.serviceError));

   }

   getEmailClients(): Observable<Client[]> {
   return  this.http
    .get<Client[]>(this.UrlService + 'clients')
    .pipe(catchError(super.serviceError));

  }

  getCliById(id: number): Observable<Client> {
    return this.http
    .get<Client>(this.UrlService + 'clients/' + id)
    .pipe(
      map(this.extractData),
      catchError(this.serviceError)
    )
  }





}
