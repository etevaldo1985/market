
import { LocalStorageUtils } from './../../utils/localstorage';
import { Observable, fromEvent, merge } from 'rxjs';
import { DisplayMessage, GenericValidator, ValidationMessages } from './../../utils/generic-form-validation';

import { Client } from '../models/client';
import { Component, OnInit, ViewChildren, ElementRef, AfterViewInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl, FormControlName } from '@angular/forms';
import { CustomValidators } from 'ng2-validation';
import { ClientService } from '../services/client.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Component({
  selector: 'app-client-register',
  templateUrl: './client-register.component.html',
  styleUrls: ['./client-register.component.css']
})
export class ClientRegisterComponent implements OnInit, AfterViewInit {

  @ViewChildren(FormControlName, { read: ElementRef}) formInputElements: ElementRef[];

  displayMessage: DisplayMessage = {};
  genericValidator: GenericValidator;
  validationMessages: ValidationMessages;

  localStorage = new LocalStorageUtils;



  formClient: FormGroup;
  client: Client;
  clients: Client[];
  errors: any[] = [];
  formResult = '';


  constructor(
    private fb: FormBuilder,
    private clientService: ClientService,
    private toastr: ToastrService,
    private router: Router
    ) {


      this.validationMessages = {

        name: {
          required: 'Please, fill up the name.'
       },
       email: {
         required: 'Please, fill up the email.',
         email: 'not a valid email'
       },
       password: {
         required: 'Please, fill up the password',
         rangeLength: 'The pass must contain between 6 and 15 caractheres'
       },
       passConfirm: {
         required: 'Please, fill up the password confirmation',
         rangeLength: 'The pass must contain between 6 and 15 caractheres',
         equalTo: 'The pass does not match'
       }
      };
        this.genericValidator = new GenericValidator(this.validationMessages);
    }

  ngOnInit(): void {

    let pass = new FormControl('', [Validators.required, CustomValidators.rangeLength([6,15])]);
    let passConfirmation = new FormControl('', [Validators.required, CustomValidators.rangeLength([6,15]), CustomValidators.equalTo(pass)]);

    this.formClient = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: pass,
      passConfirm: passConfirmation
    });
  }

  ngAfterViewInit(): void {
let controlBlurs: Observable<any>[] = this.formInputElements
.map((formControl: ElementRef) => fromEvent(formControl.nativeElement, 'blur'));

merge(...controlBlurs)
.subscribe(() => {
  this.displayMessage = this.genericValidator.processMessages(this.formClient);
})
  }

  sendRegister() {
    this.client = Object.assign({}, this.client, this.formClient.value);
    this.formResult = JSON.stringify(this.formClient.value);




    console.log(this.formResult);

    this.clientService.getEmailClients()
    .subscribe(
      clients => {
        this.clients = clients;

        let found = clients.filter( email => email.email === this.client.email)

        if (found.length === 1 ){
          this.toastr.error('This email is already in use', 'Ops!!!')
        }else{

          this.clientService.registerClient(this.client)
          .subscribe(
            success => {this.processSuccess(success); },
            fail => {this.processFail(fail); }
          );

        }
      }
    )






  }

  processSuccess(response: any) {
    this.formClient.reset();
    this.errors = [];

    this.clientService.localStorage.saveUser(this.client.email);




    const toast = this.toastr.success('Client registered succesfully', 'Good Job!');

    if (toast){
      toast.onHidden.subscribe(() => {
        this.router.navigate(['/home'])
      })
    }
  }

  processFail(fail: any) {
    this.errors = fail.error.errors;
    this.toastr.error('Something went wrong', 'Ops!')

  }

}
