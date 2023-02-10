import { Component, OnInit } from '@angular/core';
import { Event } from '../types/event';
import { EVENTS } from '../types/mock-events';
import { EventService } from '../services/event.service';

@Component({
  selector: 'app-events',
  templateUrl: './events.component.html',
  styleUrls: ['./events.component.scss']
})
export class EventsComponent implements OnInit {
  
  events: Event[] = [];
  
  constructor(private eventService: EventService) { }
  
  ngOnInit(): void {
    this.getEvents();
  }

  getEvents(): void {
    this.eventService.getEvents().subscribe(events => {
      this.events = events.sort(function(a,b){
        // Turn your strings into dates, and then subtract them
        // to get a value that is either negative, positive, or zero.
        return new Date(b.date).getTime() - new Date(a.date).getTime();
      });
    });
  }

  add(event: Event): void {
    event.headliner = event.headliner.trim();
    if (!event.headliner) { return; }
    this.eventService.addEvent(event as Event)
      .subscribe(event => {
        this.events.push(event);
      });
  }

  


}
