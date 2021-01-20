import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { first } from 'rxjs/operators';
import { Booking } from '../_models/Booking';
import { Table } from '../_models/Table';
import { AlertifyService } from '../_services/alertify.service';
import { AuthService } from '../_services/auth.service';
import { UserServiceService } from '../_services/user-service.service';

@Component({
  selector: 'app-Book-table',
  templateUrl: './Book-table.component.html',
  styleUrls: ['./Book-table.component.css']
})
export class BookFlightComponent implements OnInit {
  registerationForm: FormGroup;
  booking: Booking;
  table: Table;
  id: number;
  constructor(private fb: FormBuilder, private route: ActivatedRoute,
    private userService: UserServiceService,
    private alertify: AlertifyService, private router: Router, private authservice: AuthService) { }

  ngOnInit() {
    this.id = this.route.snapshot.params['id'];
    if(this.id){
      this.userService.getTable(this.id)
      .pipe(first())
      .subscribe(data =>{
        this.table=data;
        console.log(data);
      });
    }
    this.createRegisterationForm();
  }
  createRegisterationForm() {
    this.registerationForm = this.fb.group({
      name: ['', Validators.required],
      mobile: [null, [Validators.required, Validators.pattern("^[0-9]*$")]],
      seats: ['', [Validators.required, Validators.pattern("^[0-9]*$")]],
      from: ['', [Validators.required]],
      to: ['', [Validators.required]]
     
    });
  }
  onSubmit() {
    if (this.registerationForm.valid){
      
       console.log(this.table);
      this.booking = Object.assign({}, this.registerationForm.value);
      this.booking.userId=+this.authservice.decodedToken.nameid;
      this.booking.tableId=+this.table.id;
       this.booking.seats = +this.booking.seats;
       this.booking.tableNumber=+this.table.tableNumber;
       this.booking.restaurantName=this.table.restaurantName;
       this.booking.from=this.booking.from;
       this.booking.to=this.booking.to;
       this.userService.BookTable(this.booking).subscribe(() => {
        this.alertify.success('Table Booked successfully');
        this.router.navigate(['/booked']);
      }, error => {
        this.alertify.error(error);
      });
    }
  }
  onReset(){
    
  }

}
