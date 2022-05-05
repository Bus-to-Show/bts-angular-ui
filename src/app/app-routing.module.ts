import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EventsComponent } from './events/events.component'
import { DashboardComponent } from './dashboard/dashboard.component';
import { EventDetailComponent } from './event-detail/event-detail.component';
import { PartyCheckInComponent } from './party-check-in/party-check-in.component';
import { PartyManagementComponent } from './party-management/party-management.component';

const routes: Routes = [
  { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'events', component: EventsComponent },
  { path: 'detail/:id', component: EventDetailComponent},
  { path: 'check-in/:id', component: PartyCheckInComponent},
  { path: 'party-management/:id', component: PartyManagementComponent},


   
  // routerLink="/check-in/{{pickup.party_id}}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
