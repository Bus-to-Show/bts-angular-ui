import { Component, OnInit } from '@angular/core';
import { EventService } from '../services/event.service';
import { Event } from '../types/event';


@Component({
  selector: 'app-add-events',
  templateUrl: './add-events.component.html',
  styleUrls: ['./add-events.component.scss']
})
export class AddEventsComponent implements OnInit {

  constructor(private eventService: EventService) {}

  ngOnInit(): void {
  }

  add(event: Event): void {
    event.headliner = event.headliner.trim();
    event.venue = event.venue.trim();
    event.date= event.date.trim()
    if (!event.headliner) { return; }
    if (!event.date) { return; }
    if (!event.venue) { return; }

    this.eventService.addEvent(event as Event)
      .subscribe(event => {
        console.log(' add subscription response::: ', event)

        this.ngOnInit()
        
      });
  }
}
