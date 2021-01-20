import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { SearchFlightComponent } from '../Search-Flight/Search-Flight.component';
import { Table } from '../_models/Table';
import { Search } from '../_models/search';
import { AlertifyService } from '../_services/alertify.service';
import { AuthService } from '../_services/auth.service';
import { DataService } from '../_services/DataService';
import { UserServiceService } from '../_services/user-service.service';

@Component({
  selector: 'app-lists',
  templateUrl: './lists.component.html',
  styleUrls: ['./lists.component.css']
})
export class ListsComponent implements OnInit  {
  tables: Table[];
  constructor(private authservice:AuthService, private userservice: UserServiceService,
     private alertify: AlertifyService,
     private router: Router,
     public dataservice: DataService,private route: ActivatedRoute) { }

  ngOnInit() {
   const id = this.route.snapshot.params['id'];
    const tokenn= localStorage.getItem('token');
      this.loadFlights();
  }
  loadFlights(){
    this.userservice.getTables().subscribe((data: Table[])=>{
      this.tables=data;
    },error=>{
        this.alertify.error(error);
    });
  }
  deleteFlight(id:number){
    this.alertify.confirm('Are you sure you want to delete?',() =>{
      this.userservice.DeleteTable(id).subscribe(()=>{
        this.alertify.success('Table has been deleted');
        this.loadFlights();
      },error =>{
        this.alertify.error('Failed to delete');
      });
    });
  }

  loggedIn() {
    const token = localStorage.getItem('token');
    return !!token;
  }
  IsAdmin() {
    const Role = this.authservice.decodedToken.role;
    if(Role=="yes")
    return !!Role;
    else
    return !Role;
  }
 
}
