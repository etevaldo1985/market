import { catchError, map } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { Contact } from './../contact/models/contact';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { BaseService } from 'src/app/services/base.service';


@Injectable()
export class InstitutionalService extends BaseService {

  contact: Contact;

  constructor(private http: HttpClient){ super();}

  sendContact(contact: Contact): Observable<Contact>{
   return this.http
    .post<Contact>(this.UrlService + 'contact', contact )
    .pipe(
      map(this.extractData),
      catchError(this.serviceError)
    )
  }

}
