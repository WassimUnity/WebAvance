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
export class ProduitService {

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
  getProduits(): Observable<any> {
    const endPointUrl = this.rootApiUrl + "Produits";

    return this.http.get(endPointUrl, httpOptions).pipe(
      map(this.extractData),
      catchError(this.handleError));
  }

  getProduit(id:any): Observable<any> {
    const endPointUrl = this.rootApiUrl + "Produit/" + id;

    return this.http.get(endPointUrl, httpOptions).pipe(
      map(this.extractData),
      catchError(this.handleError));
  }

  createProduit(data:any, categorie:any): Observable<any> {

    const endPointUrl = this.rootApiUrl + "Produit" + "/" + categorie;

    return this.http.post(endPointUrl, data, httpOptions).pipe(
      catchError(this.handleError));

  }

  updateProduit(id:any, data:any) : Observable<any> {

    const endPointUrl = this.rootApiUrl + "Produit/" + id;

    return this.http.put(endPointUrl, data, httpOptions).pipe(
      catchError(this.handleError));
  }

  deleteProduit(id:any) : Observable<any> {

    const endPointUrl = this.rootApiUrl + "Produit/" + id;

    return this.http.delete(endPointUrl, httpOptions).pipe(
      catchError(this.handleError));
  }

  doneProduit(id:any) : Observable<any> {

    const endPointUrl = this.rootApiUrl + "Produit/" + id + "/done";

    return this.http.post(endPointUrl, httpOptions).pipe(
      catchError(this.handleError));
  }
}