import { InstitutionalService } from './services/institutional.service';
import { AboutComponent } from './about/about.component';
import { ContactComponent } from './contact/contact.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';



@NgModule ({
  declarations: [
    ContactComponent,
    AboutComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule

  ],
  exports: [
    ContactComponent,
    AboutComponent
  ],
  providers: [InstitutionalService]
})

export class InstitutionalModule {}
