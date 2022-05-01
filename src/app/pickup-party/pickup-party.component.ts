import { Component, Input, OnInit } from '@angular/core';
import { PickupParty } from '../types/pickup-parties';

@Component({
  selector: 'app-pickup-party',
  templateUrl: './pickup-party.component.html',
  styleUrls: ['./pickup-party.component.scss']
})
export class PickupPartyComponent implements OnInit {
  @Input() pickup?: PickupParty;
  displayCapacityForm: boolean = false;

  constructor() { }

  ngOnInit(): void {
  }


  toggleCapacityForm(showOrHide: 'show' | 'hide'){
   if(showOrHide === 'show') this.displayCapacityForm = true;
   if(showOrHide === 'hide') this.displayCapacityForm = false;
  }
}
