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
    this.partyId = Number(this.route.snapshot.paramMap.get('id'))
    this.reservationsService.getOrders(this.partyId).subscribe(orders => {
      this.reservations = orders
      //this.refreshReservations()
    }); 
  }
  
  refreshReservations(){
    setInterval(()=> {
      this.reservationsService.getOrders(this.partyId).subscribe(orders => {
        this.reservations = orders
      }); 
    }, 20000); 
  }
  
  goBack(): void {
    this.location.back();
  }
}
