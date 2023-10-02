import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import {Observable, throwError} from 'rxjs';
import { FoodTrucks } from '../model/food-trucks';
import { catchError, retry } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class FoodTrucksService {

  basePath = 'http://localhost:3000/api/v1/food-trucks'

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    })
  }
  constructor(private http: HttpClient) { }

  handleError(error: HttpErrorResponse){
    if(error.error instanceof ErrorEvent){
      console.log(`An error ocurred: ${error.error.message}`);
    } else {
      console.error(`Backend returned code ${error.status}, body was: ${error.error}`);
    }
    return throwError('Something happened with request, please try again later');
  }
  //Create FoodTruck
  create(item: any): Observable<FoodTrucks>{
    return this.http.post<FoodTrucks>(this.basePath, JSON.stringify(item), this.httpOptions)
    .pipe(
      retry(2),
      catchError(this.handleError));
  }
  //Get FoodTruck by Id
  getById(id: any): Observable<FoodTrucks>{
    return this.http.get<FoodTrucks>(`${this.basePath}/${id}`)
    .pipe(
      retry(2),
      catchError(this.handleError));
  }
  //Get All FoodTrucks
  getAll(): Observable<FoodTrucks[]>{
    return this.http.get<FoodTrucks[]>(this.basePath, this.httpOptions)
    .pipe(
      retry(2),
      catchError(this.handleError));
  }
  //Update FoodTrucks
  update(id: any, item: FoodTrucks): Observable<FoodTrucks>{
    return this.http.put<FoodTrucks>(`${this.basePath}/${id}`, JSON.stringify(item), this.httpOptions)
    .pipe(
      retry(2),
      catchError(this.handleError));
  }
  //Delete FoodTrucks
  delete(id: any){
    return this.http.delete(`${this.basePath}/${id}`, this.httpOptions)
    .pipe(
      retry(2),
      catchError(this.handleError));
  }
}
