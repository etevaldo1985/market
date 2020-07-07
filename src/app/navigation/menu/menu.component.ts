import { LocalStorageUtils } from './../../utils/localstorage';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {

  token = '';
  user: any;
  email = '';
  localStorage = new LocalStorageUtils();

  constructor(private router: Router) { }

  logOut(){
    this.localStorage.cleanLocalDataUser();
  }

  checkUSerLogged(){
    this.user = this.localStorage.getUser();

    if (this.user) {
      this.email = this.user
    }
    return this.user !=null;
  }

  ngOnInit(): void {
  }

}
