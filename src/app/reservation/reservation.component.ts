import { Component, Input, OnInit } from '@angular/core';
import { ReservationsService } from '../services/reservations.service';
import {Router} from '@angular/router'; // import router from angular router

@Component({
  selector: 'app-reservation',
  templateUrl: './reservation.component.html',
  styleUrls: ['./reservation.component.scss']
})
export class ReservationComponent implements OnInit {
  @Input() reservation: any;
  @Input() parent!: 'check-in' | 'management'


  constructor(
    private reservationsService: ReservationsService,
    private route:Router
  ) { }
  
  refreshPageWithRouterUntilYouGetSmartEnoughToUseABehaviorSubjectInstead(){
      const currentUrl = this.route.url;
      this.route.navigateByUrl('/', {skipLocationChange: true}).then(() => {
          this.route.navigate([currentUrl]);
      });
  
	//	this.route.navigate([`/party-management/${this.reservation.pickupPartiesId}`]); 
	}


  ngOnInit(): void {
  }

  updateReservationStatus(changeEvent: any){
    this.reservationsService.updateStatus(this.reservation.id, changeEvent.checked).subscribe((response: any )=> {
    })
  }

  onCancel(makeUpYourMind: 'CANCEL' | 'UNCANCEL'){
    //todo check availability if uncanceling
    this.reservationsService.updateStatus(this.reservation.id, makeUpYourMind).subscribe((response: any )=> {
      this.refreshPageWithRouterUntilYouGetSmartEnoughToUseABehaviorSubjectInstead()
    })
  }
}
