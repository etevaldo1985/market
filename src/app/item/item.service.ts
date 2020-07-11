
import { catchError, map } from 'rxjs/operators';
import { Item } from './item';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BaseService } from '../services/base.service';

@Injectable()
export class ItemService extends BaseService {

  item: Item[];

  constructor(private http: HttpClient) { super(); }



getItems(): Observable<Item[]> {

  return this.http
  .get<Item[]>(this.UrlService + 'items')
  .pipe(catchError(this.serviceError));


}
getById(id: number): Observable<Item> {

   return this.http
   .get<Item>(this.UrlService + 'items/' + id)
   .pipe(catchError(this.serviceError));
}
newItem(item: Item): Observable<Item> {
  return this.http
      .post(this.UrlService + 'items', item)
      .pipe(
          map(super.extractData),
          catchError(super.serviceError));
}

updateRate(item: Item): Observable<Item> {
  return this.http
  .put(this.UrlService + 'clients/' + item.id , item.rate  )
  .pipe(
    map(super.extractData),
    catchError(super.serviceError));
}





}
