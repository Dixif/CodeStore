/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { Booked_flightsComponent } from './booked_flights.component';

describe('Booked_flightsComponent', () => {
  let component: Booked_flightsComponent;
  let fixture: ComponentFixture<Booked_flightsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Booked_flightsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Booked_flightsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
