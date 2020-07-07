import { Item } from './item';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class ItemService {

  item: Item[];

  constructor(private http: HttpClient) {}

  protected url = 'https://my-json-server.typicode.com/etevaldo1985/api-fake-test/items';

getItems(): Observable<Item[]> {

  return this.http.get<Item[]>(this.url);


}
getById(id: number): Observable<Item> {

   return this.http.get<Item>(this.url + '/' + id);
}

postItems() {
  this.http.post(this.url, Item);
}



}
