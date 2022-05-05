import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';


@Injectable({
  providedIn: 'root'
})
export class ReservationsService {

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };
  private apiURL = environment.API_URL;
  private manageReservationsURL = `${this.apiURL}/manage-reservations`

/**
 * Handle Http operation that failed.
 * Let the app continue.
 *
 * @param operation - name of the operation that failed
 * @param result - optional value to return as the observable result
 */
 private handleError<T>(operation = 'operation', result?: T) {
  return (error: any): Observable<T> => {

    // TODO: send the error to remote logging infrastructure
    console.error(error); // log to console instead

    // TODO: better job of transforming error for user consumption
    //this.log(`${operation} failed: ${error.message}`);

    // Let the app keep running by returning an empty result.
    return of(result as T);
  };
}

  constructor(
    private http: HttpClient,

  ) { }

  getReservations(partyId: number): Observable<[]> {
    return this.http.get<[]>(`${this.manageReservationsURL}/${partyId}`)
    .pipe(
      //tap(x => this.storedEvents.next(x)),
      catchError(this.handleError<[]>('getManageParties', []))
    );
  }

  updateStatus(reservationId: number, checkedIn: boolean | 'CANCEL' | 'UNCANCEL'): Observable<any>{
    let checkedInStatus: any
    if (checkedIn === true){
      checkedInStatus = 2 
    } else if (checkedIn === false){
      checkedInStatus = 1
    } else if (checkedIn === 'CANCEL'){
      checkedInStatus = 3
    } else if (checkedIn === 'UNCANCEL'){
      checkedInStatus = 1
    }
    const body = {status: checkedInStatus}
      const url = `${this.manageReservationsURL}/${reservationId}`;
      return this.http.patch(url, body, this.httpOptions).pipe(
        //tap(x => this.storedEvents.next(x)),
        catchError(this.handleError<any>('getPickupParties'))
    );
  }

  getOrders(partyId: number): Observable<[]> {
    return this.http.get<[]>(`${this.manageReservationsURL}/orders-by-party/${partyId}`)
    .pipe(
      //tap(x => this.storedEvents.next(x)),
      catchError(this.handleError<[]>('getManageParties', []))
    );
  }
}
