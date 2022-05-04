import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { ReservationsService } from '../services/reservations.service';


@Component({
  selector: 'app-party-check-in',
  templateUrl: './party-check-in.component.html',
  styleUrls: ['./party-check-in.component.scss']
})
export class PartyCheckInComponent implements OnInit {
partyId: number;
reservations: [] = []

  constructor(
    private location: Location,
    private route: ActivatedRoute,
    private reservationsService: ReservationsService
    ) { 
      this.partyId = Number(this.route.snapshot.paramMap.get('id'))

    }

  ngOnInit(): void {
    this.partyId = Number(this.route.snapshot.paramMap.get('id'))
    this.refreshReservations()
    
    }
   
  refreshReservations(){
    setInterval(()=> {
      this.reservationsService.getReservations(this.partyId).subscribe( reservations => {
        this.reservations = reservations
        console.log('woooohooooo! reservations ====> ', reservations)
      }); 
    }, 20000); 
  }
   
  
  goBack(): void {
    this.location.back();
  }
}
