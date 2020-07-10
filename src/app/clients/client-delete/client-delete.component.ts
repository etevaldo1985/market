import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { Client } from './../models/client';
import { ClientService } from './../services/client.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-client-delete',
  templateUrl: './client-delete.component.html',
  styleUrls: ['./client-delete.component.css']
})
export class ClientDeleteComponent implements OnInit {

  client: Client = new Client();
  errors: any[] = [];


  constructor(private clientService: ClientService,
    private route: ActivatedRoute,
    private toastr: ToastrService,
    private router: Router) {


    }

  ngOnInit(): void {

    this.route.params.subscribe(
      params => {
        this.clientService.getCliById(params.id)
        .subscribe(
          client => {

            this.client = client
            },
            error => console.log(error))
      }
    )
    }

    deleteClient(){
      this.clientService.deleteCli(this.client.id)
      .subscribe(
        success => {this.processSuccess(success);},
        fail => {this.processFail(fail);}
      )

    }

    processSuccess(response: any) {

      this.errors = [];






      const toast = this.toastr.success('Client deleted succesfully', 'Good Job!');

      if (toast){
        toast.onHidden.subscribe(() => {
          this.router.navigate(['/client-view'])
        })
      }
    }

    processFail(fail: any) {
      this.errors = fail.error.errors;
      this.toastr.error('Something went wrong', 'Ops!')

    }

  }



