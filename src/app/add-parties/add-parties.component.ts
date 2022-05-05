import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatTable } from '@angular/material/table';
import { PickupPartyService } from '../services/pickup-party.service';
import { PickupParty } from '../types/pickup-parties';

@Component({
  selector: 'app-add-parties',
  templateUrl: './add-parties.component.html',
  styleUrls: ['./add-parties.component.scss']
})
export class AddPartiesComponent implements OnInit {
  @Input() possiblePickups!: PickupParty[];
  @Input() eventId!: number;
  @ViewChild(MatTable) partiesTable!: MatTable<any>;

  displayedColumns = ['name', 'city', 'firstBusLoadTime', 'lastBusDepartureTime', 'price', 'reservations', 'capacity', 'created', 'edit'];
  locationTypes;
  editMode: number = 0;
  partyBackupCopy!: PickupParty

  constructor(
      fb: FormBuilder,
      private pickupPartyService: PickupPartyService,
      ) {
      this.locationTypes = fb.group({
        primary: true,
        late: false,
        early: false,
        all: false,
    });
  }

  ngOnInit(): void {
    this.filterPickups(this.locationTypes.value)
    this.locationTypes.valueChanges.subscribe(changes => {
      if(changes.all === true){
        this.locationTypes.setValue({primary: true, late: true, early: true, all: true})
      }

    })
  }

  filterPickups(locationTypesObj: {primary: boolean, late: boolean, early: boolean, all: boolean}): PickupParty[] {
    let workingArray = [...this.possiblePickups];
    if(locationTypesObj.all === true){
      return workingArray;
    }  else {
      if(locationTypesObj.early === false) workingArray = workingArray?.filter(party => party.type !== 'early')
      if(locationTypesObj.late === false) workingArray = workingArray?.filter(party => party.type !== 'work')
      if(locationTypesObj.primary === false) workingArray = workingArray?.filter(party => party.type !== 'standard')
      return workingArray
    }  
  }

  editParty(source: 'edit' | 'add', party: PickupParty){
    this.editMode = party.location_id
    this.partyBackupCopy = {...party}
  }

  cancelEdit(){
    const resetPickups = this.possiblePickups.map(party => party.location_id == this.partyBackupCopy.location_id ? this.partyBackupCopy : party)
    this.possiblePickups = resetPickups;
    this.editMode = 0;
    this.partiesTable.renderRows();
  }

  submitEditedParty(party: PickupParty){
    this.editMode = -1
    this.pickupPartyService.upsertParty(party).subscribe(partyRes => {
      this.refreshParties()
      this.editMode = 0;
    },
    err => {
      this.cancelEdit()
      console.log('HTTP Error', err)
    },
    
    )
  }

  refreshParties(){
    this.pickupPartyService.getPickupParties(this.eventId).subscribe((pickups: PickupParty[]) => {
      this.possiblePickups = pickups.filter(party => party.type === 'standard')
      this.partiesTable.renderRows()

    })
  }

}
