import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { BsDatepickerConfig } from 'ngx-bootstrap';
import { Search } from '../_models/search';
import { DataService } from '../_services/DataService';

@Component({
  selector: 'app-Search-Flight',
  templateUrl: './Search-Flight.component.html',
  styleUrls: ['./Search-Flight.component.css']
})
export class SearchFlightComponent implements OnInit {
  @Output() cancelRegister = new EventEmitter();
  registerationForm: FormGroup;
  bsConfig: Partial<BsDatepickerConfig>;
  flight: Search;
  constructor(private fb: FormBuilder,public dataService : DataService,private _router: Router) { }

  ngOnInit() {
    this.createRegisterForm();
  }

  createRegisterForm() {
    this.registerationForm = this.fb.group({
      origin: ['', Validators.required],
      destination: ['', [Validators.required]],
      departureDate: [null, [Validators.required]]
    });
  }
  onSubmit() {
   
    this.flight = Object.assign({}, this.registerationForm.value);
    this.dataService.dataFromService = this.flight;
    this._router.navigate(['/lists',1]);
  }

  cancel() {
    this.cancelRegister.emit(false);
  }
}
