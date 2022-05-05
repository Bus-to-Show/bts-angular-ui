import { Component, OnInit } from '@angular/core';
import { Event } from '../types/event';
import { EventService } from '../services/event.service';
import { PickupPartyService } from '../services/pickup-party.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  upcomingEvents: Event[] = [];
  allEvents: Event [] = [];
  constructor(
    private eventService: EventService,
    private pickupPartiesService: PickupPartyService
    ) { }

  ngOnInit(): void {
    this.getEvents()
  }

  displayedColumns = ['date', 'doors', 'start', 'headliner', 'support1', 'venue', 'reservations', 'capacity'];
  searchTerm: string = ''

  get filteredEvents(): Event[]{
    return this.upcomingEvents.filter(event => {
      return event.headliner.toUpperCase().includes(this.searchTerm)
        || event.support1?.toUpperCase().includes(this.searchTerm)
        || event.support2?.toUpperCase().includes(this.searchTerm)
        || this.searchTerm.split(' ').every(element => event.venue.toUpperCase().split(' ').includes(element.trim()))
    });
  } 

  // Push a search term into the observable stream.
  search(term: string): Event[] {
    this.searchTerm = term.toUpperCase().trim();
    return this.filteredEvents;
  }

  getEvents(): void {
    this.eventService.getEvents().subscribe(events => {  
      this.upcomingEvents = events
      .filter(e => new Date(e.date) >= new Date() ? true : false).sort(function(a,b){
        // Turn your strings into dates, and then subtract them
        // to get a value that is either negative, positive, or zero.
        return new Date(a.date).getTime() - new Date(b.date).getTime();
      });

    })
  } 
}
