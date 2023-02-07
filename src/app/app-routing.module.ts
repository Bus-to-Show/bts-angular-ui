import { NgModule } from '@angular/core';
import { ActivatedRouteSnapshot, Router, RouterModule, RouterStateSnapshot, Routes } from '@angular/router';
import { EventsComponent } from './events/events.component'
import { DashboardComponent } from './dashboard/dashboard.component';
import { EventDetailComponent } from './event-detail/event-detail.component';
import { PartyCheckInComponent } from './party-check-in/party-check-in.component';
import { PartyManagementComponent } from './party-management/party-management.component';
import { AuthService } from './services/auth.service';
import { AppComponent } from './app.component';

const routes: Routes = [
  { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
  { path: 'verify/:token', component: AppComponent },
  { path: 'reset/:token', component: AppComponent },
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
export class AppRoutingModule { 

  constructor(
    private authService: AuthService, private router: Router
  ) {}

    // check for authentication
    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
      if(
        this.authService.isAdmin()
        ){
        return true;
      }
      this.router.navigate(['/dashboard']);
      return false;
    }
}
