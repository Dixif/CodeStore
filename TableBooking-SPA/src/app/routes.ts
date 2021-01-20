import {Routes} from '@angular/router';
import { HomeComponent } from './home/home.component';
import { ListsComponent } from './lists/lists.component';
import { AuthGuard } from './_guards/auth.guard';
import { AddFlightComponent } from './addtable/addtable.component';
import { SearchFlightComponent } from './Search-Flight/Search-Flight.component';
import { BookFlightComponent } from './Book-table/Book-table.component';
import { RegisterComponent } from './register/register.component';
import { Booked_flightsComponent } from './booked_flights/booked_flights.component';

export const appRoutes: Routes = [
    {path: 'home', component: HomeComponent},
    {path: 'searchFlight', component: SearchFlightComponent},
    {path: 'lists/:id', component: ListsComponent},
    {path: 'Register', component: RegisterComponent},
    {path: 'lists', component: ListsComponent},
    {
        path: '',
        runGuardsAndResolvers: 'always',
        canActivate: [AuthGuard],
        children: [
            {path: 'addflight', component: AddFlightComponent},
            {path: 'editflight/:id', component: AddFlightComponent},
            {path: 'Bookflight/:id', component: BookFlightComponent},
            {path: 'booked', component: Booked_flightsComponent},
           
           
        ]
    },
    {path: '**', redirectTo: 'home', pathMatch: 'full'},
];
