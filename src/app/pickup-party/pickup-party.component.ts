import { Component, Input, OnInit } from '@angular/core';
import { PickupParty } from '../types/pickup-parties';
import { FormControl } from '@angular/forms';
import { PickupPartyService } from '../services/pickup-party.service';
import {MatSnackBar} from '@angular/material/snack-bar';



@Component({
  selector: 'app-pickup-party',
  templateUrl: './pickup-party.component.html',
  styleUrls: ['./pickup-party.component.scss']
})
export class PickupPartyComponent implements OnInit {
  @Input() pickup!: PickupParty;
  backupPickup!: PickupParty;
  displayCapacityForm: boolean = false;

  constructor(
    private pickupPartyService: PickupPartyService,
    private _snackBar: MatSnackBar
  ) { }


  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action);
  }

  ngOnInit(): void {
    this.backupPickup = {...this.pickup}

    
  }


  toggleCapacityForm(showOrHide: 'show' | 'hide'){
   if(showOrHide === 'show') this.displayCapacityForm = true;
   if(showOrHide === 'hide') {
     this.displayCapacityForm = false;
     this.pickup = {...this.backupPickup};
    }
  }

  updateCapacity(){
    this.pickupPartyService.updateCapacity(this.pickup.party_id || 0, Number(this.pickup.capacity) || 0).subscribe(res => {
      this.displayCapacityForm = false;
      this.openSnackBar(`capacity updated to ${this.pickup.capacity}`, 'close')
    })
    

  }
}
