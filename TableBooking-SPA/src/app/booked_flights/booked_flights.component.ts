import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Booking } from '../_models/Booking';
import { Table } from '../_models/Table';
import { AlertifyService } from '../_services/alertify.service';
import { AuthService } from '../_services/auth.service';
import { UserServiceService } from '../_services/user-service.service';

@Component({
  selector: 'app-booked_flights',
  templateUrl: './booked_flights.component.html',
  styleUrls: ['./booked_flights.component.css']
})
export class Booked_flightsComponent implements OnInit {
  tables: Booking[];
  id:number;
  constructor( private userservice: UserServiceService,
    private alertify:AlertifyService,
    private route: ActivatedRoute,
    private authservice: AuthService) { }

  ngOnInit() {
     this.id =+this.authservice.decodedToken.nameid;
    this.loadFlights();
   
  
  }
  loadFlights(){
    const Role = this.authservice.decodedToken.role;
    console.log(Role);
    if(Role=="yes"){
      this.userservice.getBookedtables().subscribe((data: Booking[])=>{
        this.tables=data;
      },error=>{
          this.alertify.error(error);
      });
    }

    else{
      this.userservice.getBookedtable(this.id).subscribe((data: Booking[])=>{
        this.tables=data;
      },error=>{
          this.alertify.error(error);
      });
    }
    
  }

}
