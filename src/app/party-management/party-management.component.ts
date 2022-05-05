import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ReservationsService } from '../services/reservations.service';
import { Location } from '@angular/common';

@Component({
  selector: 'app-party-management',
  templateUrl: './party-management.component.html',
  styleUrls: ['./party-management.component.scss']
})
export class PartyManagementComponent implements OnInit {
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
    console.log('does anything happen?')
    this.partyId = Number(this.route.snapshot.paramMap.get('id'))
    this.reservationsService.getReservations(100).subscribe(reservations => {
      this.reservations = reservations
      this.refreshReservations()
      console.log('weeeehaaaa! reservations ====> ', reservations)
    }); 
  }
  
  refreshReservations(){
    setInterval(()=> {
      this.reservationsService.getReservations(100).subscribe(reservations => {
        this.reservations = reservations
        console.log('weeeehaaaa! reservations ====> ', reservations)
      }); 
    }, 20000); 
  }
  
  goBack(): void {
    this.location.back();
  }
}
