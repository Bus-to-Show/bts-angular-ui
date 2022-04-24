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
  //filteredEvents: Event[] = []
  displayedColumns = ['date', 'headliner', 'support1', 'support2', 'venue', 'reservations', 'capacity'];
  dataSource: Event[] = [];
  searchTerm: string = ''

  get filteredEvents(): Event[]{
    return this.upcomingEvents.filter(event => {
      return event.headliner.toUpperCase().includes(this.searchTerm)
        || event.support1?.toUpperCase().includes(this.searchTerm)
        || event.support2?.toUpperCase().includes(this.searchTerm)
        || event.venue.toUpperCase().includes(this.searchTerm)
    })
  } 

  // Push a search term into the observable stream.
  search(term: string): Event[] {
    this.searchTerm = term.toUpperCase()
    return this.filteredEvents
    // this.filteredEvents = this.upcomingEvents.filter(event => {
    //   return event.headliner.includes(term)
    // })

  }
  getEvents(): void {
    this.eventService.getEvents().subscribe(events => {  
      this.upcomingEvents = events.filter(e => new Date(e.date) >= new Date() ? true : false).sort(function(a,b){
        // Turn your strings into dates, and then subtract them
        // to get a value that is either negative, positive, or zero.
        return new Date(a.date).getTime() - new Date(b.date).getTime();
      });

      for (let i = 0; i < 14; i++){
        this.pickupPartiesService.getPickupParties(this.upcomingEvents[i].id).subscribe(parties => {
          this.upcomingEvents[i].parties = parties;
        })
      }
      //this.filteredEvents = this.upcomingEvents;
      //this.dataSource = this.filteredEvents;
      //console.log('this.upcomingEvents ', this.upcomingEvents)
      //this.upcomingEvents = events.slice(0, 5)
    })
  } 
}
