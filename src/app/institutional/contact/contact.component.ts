import { ToastrService } from 'ngx-toastr';
import { InstitutionalService } from './../services/institutional.service';
import { Component, OnInit } from '@angular/core';
import {FormBuilder, Validators, FormControl, FormControlName, FormGroup } from '@angular/forms';
import { Contact } from './models/contact';


@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent implements OnInit {

  errors: any[] = [];

  contact: Contact;
  formResult = '';
  formContact: FormGroup;


  constructor(
    private fb: FormBuilder,
    private institutionalService: InstitutionalService,
    private toastr: ToastrService) { }

  ngOnInit() {

    this.formContact = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      message: ['', Validators.required]
    });

    }
    sendContact() {
      this.contact = Object.assign({}, this.contact, this.formContact.value);
      this.formResult = JSON.stringify(this.formContact.value);
      console.log(this.formResult);

      this.institutionalService.sendContact(this.contact)
      .subscribe(
        success => {this.processSuccess()},
        fail => {this.processFail(fail);}
      );
  }

  processSuccess(){

    this.formContact.reset();
    this.errors = [];

    this.toastr.success('Message sent', 'Good job!')

  }

  processFail(fail: any){
    this.errors = fail.error.errors;

    this.toastr.error('Something went wrong', 'Ops!')


  }



}
