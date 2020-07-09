
import { Login } from './../models/login';
import { Component, OnInit, AfterViewInit, ViewChildren, ElementRef } from '@angular/core';
import { FormControlName, FormGroup, FormBuilder, FormControl, Validators, AbstractControl } from '@angular/forms';
import { DisplayMessage, GenericValidator, ValidationMessages } from 'src/app/utils/generic-form-validation';
import { Client } from '../models/client';
import { ClientService } from '../services/client.service';
import { CustomValidators } from 'ng2-validation';
import { Observable, fromEvent, merge } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit, AfterViewInit {
  @ViewChildren(FormControlName, { read: ElementRef}) formInputElements: ElementRef[];

  displayMessage: DisplayMessage = {};
  genericValidator: GenericValidator;
  validationMessages: ValidationMessages;

  loginForm: FormGroup;
  client: Client[];
  logins: Login;
  errors: any[] = [];
  formResult = '';

  constructor(
    private fb: FormBuilder,
    private clientService: ClientService,
    private toastr: ToastrService,
    private router: Router
    ) {

      this.validationMessages = {


       email: {
         required: 'Please, fill up the email.',
         email: 'not a valid email'
       },
       password: {
         required: 'Please, fill up the password',
         rangeLength: 'The pass must contain between 6 and 15 caractheres'
      }

    };
    this.genericValidator = new GenericValidator(this.validationMessages);
  }

  ngOnInit(): void {



    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, CustomValidators.rangeLength([6,15])]]
    });
  }

  ngAfterViewInit(): void {
let controlBlurs: Observable<any>[] = this.formInputElements
.map((formControl: ElementRef) => fromEvent(formControl.nativeElement, 'blur'));

merge(...controlBlurs)
.subscribe(() => {
  this.displayMessage = this.genericValidator.processMessages(this.loginForm);
})
  }

  login() {


    this.logins = Object.assign({}, this.logins, this.loginForm.value);
    this.formResult = JSON.stringify(this.loginForm.value);



      this.clientService.getEmailClients()
      .subscribe(
        clients => {

          this.client = clients;

           let found = clients.filter( clients => clients.email === this.logins.email && clients.password === this.logins.password);

          if ( found.length === 0 ){
            console.log('User not registered or password incorrect');
            this.toastr.error('User not registered or password incorrect', 'Ops!!!');
          }else {
        console.log(found);

         console.log(this.formResult);

         this.clientService.login(this.logins)
         .subscribe(
           success => {this.processSuccess(success); },
           fail => {this.processFail(fail); }
         )
          }


        }
      );}



  processSuccess(response: any) {
    this.loginForm.reset();
    this.errors = [];

    this.clientService.localStorage.saveUser(this.logins.email);

    const toast = this.toastr.success('Client logged in succesfully', 'Good Job!');

    if (toast){
      toast.onHidden.subscribe(() => {
        this.router.navigate(['/home'])
      })
    }

  }

  processFail(fail: any) {
    this.errors = fail.error.errors;
    this.toastr.error('User not registered or password incorrect', 'Ops!');


  }



}
