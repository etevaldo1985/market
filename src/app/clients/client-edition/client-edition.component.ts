import { ClientService } from './../services/client.service';
import { Client } from './../models/client';
import { Component, OnInit, ViewChildren, ElementRef, AfterViewInit } from '@angular/core';
import { FormControlName, FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { DisplayMessage, GenericValidator, ValidationMessages } from 'src/app/utils/generic-form-validation';
import { LocalStorageUtils } from 'src/app/utils/localstorage';
import { CustomValidators } from 'ng2-validation';
import { Observable, fromEvent, merge } from 'rxjs';

@Component({
  selector: 'app-client-edition',
  templateUrl: './client-edition.component.html',
  styleUrls: ['./client-edition.component.css']
})
export class ClientEditionComponent implements OnInit, AfterViewInit {

  displayMessage: DisplayMessage = {};
  genericValidator: GenericValidator;
  validationMessages: ValidationMessages;

  localStorage = new LocalStorageUtils;

  @ViewChildren(FormControlName, { read: ElementRef }) formInputElements: ElementRef[];

  errors: any[] = [];
  clientForm: FormGroup;


  client: Client = new Client();
  clients: Client[];




  constructor(private fb: FormBuilder,
    private clientService: ClientService,
    private router: Router,
    private toastr: ToastrService,
    private route: ActivatedRoute) {

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

    this.clientForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: pass,
      passConfirm: passConfirmation
    });

    this.route.params.subscribe(
      params => {
        this.clientService.getCliById(params.id)
        .subscribe(
          client => {

            this.client = client
            this.fillUpForm();
            },
            error => console.log(error))
      }
    )


  }

  ngAfterViewInit(): void {
    let controlBlurs: Observable<any>[] = this.formInputElements
    .map((formControl: ElementRef) => fromEvent(formControl.nativeElement, 'blur'));

    merge(...controlBlurs)
    .subscribe(() => {
      this.displayMessage = this.genericValidator.processMessages(this.clientForm);
    })
      }

  fillUpForm() {

    this.clientForm.patchValue({
      id: this.client.id,
      name: this.client.name,
      email: this.client.email,
      password: this.client.password,
      passConfirm: this.client.passConfirm
    });

}
clientEdition() {
  this.client = Object.assign({}, this.client, this.clientForm.value);







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
  this.clientForm.reset();
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
