import { Injectable } from '@angular/core';
import { Event } from '../types/event'
import { EVENTS } from '../types/mock-events'
import { Observable, of, Subject } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class EventService {
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };
  private apiURL = 'http://localhost:3000';  // URL to web api
  private eventsURL = `${this.apiURL}/events`

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
  //storedEvents: Subject<Event[]>
  getEvents(): Observable<Event[]> {
    // const events = of(EVENTS);
    // return events;
    return this.http.get<Event[]>(`${this.eventsURL}`)
    .pipe(
      //tap(x => this.storedEvents.next(x)),
      catchError(this.handleError<Event[]>('getEvents', []))
    );
  }

  /** GET event by id. Will 404 if id not found */
  getEvent(id: number): Observable<Event> {
    const url = `${this.eventsURL}/${id}`;
    return this.http.get<Event>(url).pipe(
      //tap(_ => this.log(`fetched hero id=${id}`)),
      catchError(this.handleError<Event>(`getEvent id=${id}`))
    );
  }

  /** PUT: update the event on the server */
  updateEvent(event: Event): Observable<any> {
    return this.http.patch(`${this.eventsURL}/${event.id}`, event, this.httpOptions).pipe(
      //tap(_ => this.log(`updated hero id=${event.id}`)),
      catchError(this.handleError<any>('updateEvent'))
    );
  }

  /** POST: add a new event to the server */
  addEvent(event: Event): Observable<Event> {
    return this.http.post<Event>(this.eventsURL, event, this.httpOptions).pipe(
      //tap((newEvent: Event) => this.log(`added hero w/ id=${newEvent.id}`)),
      catchError(this.handleError<Event>('addEvent'))
    );
  }

  /** DELETE: delete the event from the server */
  deleteEvent(id?: number): Observable<Event> {
    const url = `${this.eventsURL}/${id}`;

    return this.http.delete<Event>(url, this.httpOptions).pipe(
      //tap(_ => this.log(`deleted event id=${id}`)),
      catchError(this.handleError<Event>('deleteEvent'))
    );
  }

  /* GET events whose name contains search term */
  searchEvents(term: string): Observable<Event[]> {
    if (!term.trim()) {
      // if not search term, return empty hero array.
      return of([]);
    }
    return this.http.get<Event[]>(`${this.eventsURL}/?name=${term}`).pipe(
      //tap(x => x.length ?
        //this.log(`found events matching "${term}"`) :
        //this.log(`no events matching "${term}"`)),
      catchError(this.handleError<Event[]>('searchEvents', []))
    );
  }





}
