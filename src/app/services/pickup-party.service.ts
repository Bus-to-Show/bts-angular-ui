import { Injectable } from '@angular/core';
import { Event } from '../types/event'
import { Observable, of, Subject } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';
import { PickupParty } from '../types/pickup-parties';

@Injectable({
  providedIn: 'root'
})
export class PickupPartyService {

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };
  private apiURL = 'http://localhost:3000';  // URL to web api
  //private apiURL = 'https://blooming-fortress-13049.herokuapp.com';  // URL to web api

  private managePartiesURL = `${this.apiURL}/manage-parties`

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
  ) { 

  }

  // getPickupParties(eventId?: number): Observable<any> {
  //   const body = {eventId: eventId}
  //   const url = `${this.pickupPartiesURL}/findParties`;
  //   return this.http.patch(url, body, this.httpOptions).pipe(
  //     //tap(x => this.storedEvents.next(x)),
  //     catchError(this.handleError<any>('getPickupParties'))
  //   );
  // }

  getPickupParties(eventId?: number): Observable<[]> {
    // const events = of(EVENTS);
    // return events;
    return this.http.get<[]>(`${this.managePartiesURL}/${eventId}`)
    .pipe(
      //tap(x => this.storedEvents.next(x)),
      catchError(this.handleError<[]>('getManageParties', []))
    );
  }

  updateCapacity(pickupId: number, capacity: number): Observable<any> {
      const body = {capacity: capacity}
      const url = `${this.managePartiesURL}/${pickupId}`;
      return this.http.patch(url, body, this.httpOptions).pipe(
        //tap(x => this.storedEvents.next(x)),
        catchError(this.handleError<any>('getPickupParties'))
      );
  }

  upsertParty(party: PickupParty) {
    console.log('party in upsert in service!!!!! ', party)
    const url = `${this.managePartiesURL}/${party.party_id}`;
    return this.http.put(url, party, this.httpOptions)
  }
}