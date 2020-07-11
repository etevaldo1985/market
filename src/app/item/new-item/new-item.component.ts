import { ToastrService } from 'ngx-toastr';
import { ItemService } from './../item.service';
import { Component, OnInit, ViewChildren, ElementRef, AfterViewInit } from '@angular/core';
import { FormControlName, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ImageTransform, ImageCroppedEvent, Dimensions } from 'ngx-image-cropper';
import { Router } from '@angular/router';
import { Observable, fromEvent, merge } from 'rxjs';
import { DisplayMessage, GenericValidator, ValidationMessages } from 'src/app/utils/generic-form-validation';
import { LocalStorageUtils } from 'src/app/utils/localstorage';
import { Item } from '../item';

@Component({
  selector: 'app-new-item',
  templateUrl: './new-item.component.html',
  styleUrls: ['./new-item.component.css']
})
export class NewItemComponent implements OnInit, AfterViewInit {

  @ViewChildren(FormControlName, { read: ElementRef }) formInputElements: ElementRef[];

  displayMessage: DisplayMessage = {};
  genericValidator: GenericValidator;
  validationMessages: ValidationMessages;
  errors: any[] = [];

  localStorage = new LocalStorageUtils;

  imageChangedEvent = '';
  croppedImage = '';
  canvasRotation = 0;
  rotation = 0;
  scale = 1;
  showCropper = false;
  containWithinAspectRatio = false;
  transform: ImageTransform = {};
  imageUrl: string;
  imageName: string;

  itemForm: FormGroup;
  item: Item;


  constructor(private fb: FormBuilder,
    private itemService: ItemService,
    private router: Router,
    private toastr: ToastrService) {
      this.validationMessages = {

        name: {
          required: 'Please, fill up the name.',
          minlength: 'Minimum of 2 caractheres',
        maxlength: 'Maximum of 200 caractheres'
       },
       description: {
         required: 'Please, fill up the description.',
         minlength: 'Minimum of 2 caractheres',
        maxlength: 'Maximum of 1000 caractheres'
       },
       value: {
         required: 'Please, fill up the value'
       },
       image: {
         required: 'Please, add the image'
       }
      };
      this.genericValidator = new GenericValidator(this.validationMessages);
     }

  ngOnInit(): void {

    this.itemForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(200)]],
      description: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(1000)]],
      image: ['', [Validators.required]],
      value: ['', [Validators.required]],
      active: [true]
    });
  }

  ngAfterViewInit(){
    let controlBlurs: Observable<any>[] = this.formInputElements
.map((formControl: ElementRef) => fromEvent(formControl.nativeElement, 'blur'));

merge(...controlBlurs)
.subscribe(() => {
  this.displayMessage = this.genericValidator.processMessages(this.itemForm);
})
  }

  addItem() {
    if (this.itemForm.dirty && this.itemForm.valid) {
      this.item = Object.assign({}, this.item, this.itemForm.value);


      this.item.imageUpload = this.croppedImage.split(',')[1];
      this.item.image = this.imageName;




      this.itemService.newItem(this.item)
        .subscribe(
          success => { this.processSuccess(success); },
          fail => { this.processFail(fail); }
        );


    }
  }

  processSuccess(response: any) {
    this.itemForm.reset();
    this.errors = [];

    const toast = this.toastr.success('New Item Included!', 'Succsess!');
    if (toast) {
      toast.onHidden.subscribe(() => {
        this.router.navigate(['/items-view']);
      });
    }
  }

  processFail(fail: any) {
    this.errors = fail.error.errors;
    this.toastr.error('Something went wrong', 'Ops!');
  }

  fileChangeEvent(event: any): void {
    this.imageChangedEvent = event;
    this.imageName = event.currentTarget.files[0].name;
  }
  imageCropped(event: ImageCroppedEvent) {
    this.croppedImage = event.base64;
  }
  imageLoaded() {
    this.showCropper = true;
  }
  cropperReady(sourceImageDimensions: Dimensions) {
    console.log('Cropper ready', sourceImageDimensions);
  }
  loadImageFailed() {
    this.errors.push('O formato do arquivo ' + this.imageName + ' nao e aceito');
  }

}
