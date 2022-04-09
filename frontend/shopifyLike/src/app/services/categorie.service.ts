import { HttpErrorResponse, HttpClient, HttpHeaders } from '@angular/common/http';

import { Injectable } from '@angular/core';

import { Observable, of, throwError } from 'rxjs';
import { catchError, tap, map } from 'rxjs/operators'

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json'})
}

@Injectable({
  providedIn: 'root'
})
export class CategorieService {

  constructor(private http: HttpClient) { }

  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent){
      console.error('An error occued: ', error.error.message);
    } else {
      console.error(
        `Backend returned code ${error.status}, ` +
        `body was: ${error.error}`);
    }

    return throwError('Something bad happened; please try again later.');
  }

  private extractData(res: Response) {
    let body = res;
    return body || { };
  }

  rootApiUrl = "http://localhost:3000/api/v1/"
  getCategories(): Observable<any> {
    const endPointUrl = this.rootApiUrl + "Categories";

    return this.http.get(endPointUrl, httpOptions).pipe(
      map(this.extractData),
      catchError(this.handleError));
  }

  getCategorie(id:any): Observable<any> {
    const endPointUrl = this.rootApiUrl + "Categorie/" + id;

    return this.http.get(endPointUrl, httpOptions).pipe(
      map(this.extractData),
      catchError(this.handleError));
  }

  createCategorie(data:any, boutiqueId: any): Observable<any> {

    const endPointUrl = this.rootApiUrl + "Categorie" + "/" + boutiqueId;

    return this.http.post(endPointUrl, data, httpOptions).pipe(
      catchError(this.handleError));

  }

  updateCategorie(id:any, data:any) : Observable<any> {

    const endPointUrl = this.rootApiUrl + "Categorie/" + id;

    return this.http.put(endPointUrl, data, httpOptions).pipe(
      catchError(this.handleError));
  }

  deleteCategorie(id:any) : Observable<any> {

    const endPointUrl = this.rootApiUrl + "Categorie/" + id;

    return this.http.delete(endPointUrl, httpOptions).pipe(
      catchError(this.handleError));
  }

  doneCategorie(id:any) : Observable<any> {

    const endPointUrl = this.rootApiUrl + "Categorie/" + id + "/done";

    return this.http.post(endPointUrl, httpOptions).pipe(
      catchError(this.handleError));
  }
}