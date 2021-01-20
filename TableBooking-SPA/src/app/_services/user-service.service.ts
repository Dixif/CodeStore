import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Booking } from '../_models/Booking';
import { Table } from '../_models/Table';
// const httpOptions = {
//   headers: new HttpHeaders({
//     // tslint:disable-next-line:object-literal-key-quotes
//     'Authorization' : 'Bearer ' + localStorage.getItem('token')
//   })
// };
@Injectable({
  providedIn: 'root'
})
export class UserServiceService {

  baseUrl = 'http://localhost:60066/api/tables/';
  constructor(private http: HttpClient) { }
  
  getTables(): Observable<Table[]>{
    return this.http.get<Table[]>(this.baseUrl + 'gettables');
  }
  
  getTable(id): Observable<Table>{
    return this.http.get<Table>(this.baseUrl + 'gettable/' + id);
  }
  updateTable(id: number,flight: Table){
    return this.http.put(this.baseUrl +'Updatetable/'+ id, flight);
  }
  SaveTable(flight:any){
  return this.http.post(this.baseUrl +'Addtable',flight);
  }
  BookTable(flight:any){
    return this.http.post(this.baseUrl +'BookFlight',flight);
    }
  DeleteTable(id: Number){
    return this.http.delete(this.baseUrl +'Deletetable/'+ id );
  }
  SearchFlight(flight:any){
    return this.http.post<Table[]>(this.baseUrl +'searchFlight',flight);
    }
    getBookedtable(id): Observable<Booking[]>{
      return this.http.get<Booking[]>(this.baseUrl + 'getbooked/'+id);
    }
    getBookedtables(): Observable<Booking[]>{
      return this.http.get<Booking[]>(this.baseUrl + 'getBookedtables');
    }

}
