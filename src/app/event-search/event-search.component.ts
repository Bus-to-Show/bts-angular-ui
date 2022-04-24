import { Component, Input, OnInit } from '@angular/core';

import { Observable, Subject } from 'rxjs';

import {
   debounceTime, distinctUntilChanged, switchMap
 } from 'rxjs/operators';

import { Event } from '../types/event';
import { EventService } from '../services/event.service';

@Component({
  selector: 'app-event-search',
  templateUrl: './event-search.component.html',
  styleUrls: [ './event-search.component.scss' ]
})
export class EventSearchComponent implements OnInit {
  @Input() storedEvents : Event[] = []
  filteredEvents: Event[] = []

  constructor(private eventService: EventService) {}

  // Push a search term into the observable stream.
  search(term: string): void {
    this.filteredEvents = this.storedEvents.filter(event => {
      event.headliner.includes(term)
    })
  }

  ngOnInit(): void {

  }
}