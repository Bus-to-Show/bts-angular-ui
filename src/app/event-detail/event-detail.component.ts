import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { EventService } from '../services/event.service';
import { Event } from '../types/event';

@Component({
  selector: 'app-event-detail',
  templateUrl: './event-detail.component.html',
  styleUrls: ['./event-detail.component.scss']
})
export class EventDetailComponent implements OnInit {

  @Input() event?: Event;
  constructor(
    private eventService: EventService,
    private location: Location,
    private route: ActivatedRoute,
    ) { }

  ngOnInit(): void {
    this.getEvent()
  }

  getEvent(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'))
    this.eventService.getEvent(id).subscribe(event => {
      this.event = event
    })
  }
  goBack(): void {
    this.location.back();
  }

  save(): void {
    if (this.event) {
      this.eventService.updateEvent(this.event)
        .subscribe((res) => {
          console.log('save response::: ', res)
          //this.goBack()
        });
    }
  }
}
