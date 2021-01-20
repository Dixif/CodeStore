import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Table } from '../_models/Table';
import { AlertifyService } from '../_services/alertify.service';
import { UserServiceService } from '../_services/user-service.service';
import { BsDatepickerConfig } from 'ngx-bootstrap';
import { first } from 'rxjs/operators';

@Component({
  selector: 'app-addFlight',
  templateUrl: './addtable.component.html',
  styleUrls: ['./addtable.component.css']
})
export class AddFlightComponent implements OnInit {

  registerationForm: FormGroup;
  table: Table;
  isAddMode: boolean;
  id: number;
  userSubmitted: boolean;
  bsConfig: Partial<BsDatepickerConfig>;
  constructor(private fb: FormBuilder, private route: ActivatedRoute,
    private userService: UserServiceService,
    private alertify: AlertifyService, private router: Router) { }

  ngOnInit() {
    this.id = this.route.snapshot.params['id'];
    this.isAddMode = !this.id;

    this.createRegisterationForm();

    if (!this.isAddMode) {
      this.userService.getTable(this.id)
        .pipe(first())
        .subscribe(x => this.registerationForm.patchValue(x));
    }

  }

  createRegisterationForm() {
    this.registerationForm = this.fb.group({
      tableNumber: [null, [Validators.required, Validators.pattern("^[0-9]*$")]],
      restaurantName: ['', Validators.required],
      seats: [null, [Validators.required, Validators.pattern("^[0-9]*$")]]
    });
  }
  onSubmit() {

    this.userSubmitted = true;

    if (this.registerationForm.invalid) {
      return;
    }
    this.table = Object.assign({}, this.registerationForm.value);
    this.table.tableNumber = +this.table.tableNumber;
    this.table.seats = +this.table.seats;
    //this.table.ticketPrice = +this.table.ticketPrice;
   
    if (this.isAddMode) {
      this.createUser();
    } else {
      this.updateUser();
    }
   
  }

  createUser(){
    this.userService.SaveTable(this.table).subscribe(() => {
      this.alertify.success('Table Added successfully');
      this.router.navigate(['/lists']);
    }, error => {
      this.alertify.error(error);
    });
  }

  updateUser(){
    this.table.id=+this.id;
    this.userService.updateTable(this.id,this.table).subscribe(() => {
      this.alertify.success('Table Edited successfully');
      this.router.navigate(['/lists']);
    }, error => {
      this.alertify.error(error);
    });
  }

  onReset() {
    this.userSubmitted = false;
    this.registerationForm.reset();
  }
  

}
