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
  @Input() pickup?: PickupParty;
  displayCapacityForm: boolean = false;
  capacity = new FormControl('');


  constructor(
    private pickupPartyService: PickupPartyService,
    private _snackBar: MatSnackBar
  ) { }


  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action);
  }

  ngOnInit(): void {
    
  }


  toggleCapacityForm(showOrHide: 'show' | 'hide'){
   if(showOrHide === 'show') this.displayCapacityForm = true;
   if(showOrHide === 'hide') this.displayCapacityForm = false;
  }

  updateCapacity(){
    this.pickupPartyService.updateCapacity(this.pickup?.id || 0, this.capacity.value).subscribe(res => {
      console.log('capacity change Response !', res)
      this.capacity.setValue(res[0].capacity)
      this.toggleCapacityForm('hide');
      this.openSnackBar(`capacity updated to ${this.capacity.value}`, 'close')
    })
    console.log(' did capacity change>>>??? ', this.capacity.value)
    

  }
}
