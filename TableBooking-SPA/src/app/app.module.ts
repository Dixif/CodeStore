import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BsDatepickerConfig, BsDatepickerModule, BsDropdownModule } from 'ngx-bootstrap';
import { RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { NavComponent } from './nav/nav.component';
import { AuthService } from './_services/auth.service';
import { UserServiceService } from './_services/user-service.service';
import { HomeComponent } from './home/home.component';
import { RegisterComponent } from './register/register.component';
import { ErrorInterceptorProvider } from './_services/error.interceptor';
import { AlertifyService } from './_services/alertify.service';
import { ListsComponent } from './lists/lists.component';
import { appRoutes } from './routes';
import { AuthGuard } from './_guards/auth.guard';
import { JwtModule } from '@auth0/angular-jwt';
import { AddFlightComponent } from './addtable/addtable.component';
import { SearchFlightComponent } from './Search-Flight/Search-Flight.component';
import { DataService } from './_services/DataService';
import { BookFlightComponent } from './Book-table/Book-table.component';
import { Booked_flightsComponent } from './booked_flights/booked_flights.component';
import { SortPipe } from './Pipes/sort.pipe';
import { FilterPipe } from './Pipes/filter.pipe';
export function tokenGetter(){
  return localStorage.getItem('token');
}
export function getDatepickerConfig(): BsDatepickerConfig {
  return Object.assign(new BsDatepickerConfig(), {
    dateInputFormat: 'YYYY-MM-DD'
  });
}
@NgModule({
  declarations: [				
    AppComponent,
    NavComponent,
    HomeComponent,
    RegisterComponent,
    ListsComponent,
      AddFlightComponent,
      SearchFlightComponent,
      BookFlightComponent,
      Booked_flightsComponent,
      FilterPipe,
      SortPipe
   ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    BsDropdownModule.forRoot(),
    BsDatepickerModule.forRoot(),
    RouterModule.forRoot(appRoutes),
    FormsModule,
    ReactiveFormsModule,
    JwtModule.forRoot({
      config: {
        // tslint:disable-next-line:object-literal-shorthand
        tokenGetter: tokenGetter,
        whitelistedDomains: ['localhost:54818'],
        blacklistedRoutes: ['localhost:54818/api/auth']
      }
    })
  ],
  providers: [
      AuthService,
      UserServiceService,
      ErrorInterceptorProvider,
      AlertifyService,
      AuthGuard,
      DataService,
      { provide: BsDatepickerConfig, useFactory: getDatepickerConfig }
    ],
  bootstrap: [AppComponent]
})
export class AppModule {}
