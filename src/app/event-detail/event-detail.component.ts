import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { EventService } from '../services/event.service';
import { Event } from '../types/event';
import { PickupPartyService } from '../services/pickup-party.service';
import { PickupParty } from '../types/pickup-parties';

@Component({
  selector: 'app-event-detail',
  templateUrl: './event-detail.component.html',
  styleUrls: ['./event-detail.component.scss']
})
export class EventDetailComponent implements OnInit {

  @Input() event?: Event;
  eventId: number;
  possiblePickups: PickupParty[] = [];
  addMode: boolean = false;
  createdPickups: PickupParty[] = []
  constructor(
    private eventService: EventService,
    private pickupPartyService: PickupPartyService,
    private location: Location,
    private route: ActivatedRoute,
    ) { 
      this.eventId = Number(this.route.snapshot.paramMap.get('id'))

    }

  ngOnInit(): void {
    this.eventId = Number(this.route.snapshot.paramMap.get('id'))
    this.getEvent();
    this.getPickups();
    this.addMode = false;

  }

  getEvent(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'))
    this.eventService.getEvent(id).subscribe(event => {
      this.event = event
    })

  }

  getPickups(): void {
    this.pickupPartyService.getPickupParties(this.eventId).subscribe((pickups: PickupParty[]) => {
      this.possiblePickups = pickups.filter(party => party.type === 'standard')
      this.createdPickups = this.possiblePickups.filter(party =>party.created === true)
      if (this.createdPickups.length <= 0) this.addMode = true;

    })
  }
  goBack(): void {
    this.location.back();
  }

  toggleAddMode(){
    if (this.createdPickups.length <= 0) this.addMode = true
    else this.addMode = !this.addMode;

  }

  save(): void {
    if (this.event) {
      this.eventService.updateEvent(this.event)
        .subscribe((res) => {
          //this.goBack()
        });
    }
  }
}
