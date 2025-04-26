import {LayoutModule} from '@angular/cdk/layout';
import {HttpClientModule} from '@angular/common/http';
import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {ReactiveFormsModule} from '@angular/forms';
import {MatButtonModule} from '@angular/material/button';
import {MatCardModule} from '@angular/material/card';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatDialogModule} from '@angular/material/dialog';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatIconModule} from '@angular/material/icon';
import {MatInputModule} from '@angular/material/input';
import {MatListModule} from '@angular/material/list';
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatProgressBarModule} from '@angular/material/progress-bar';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import {MatSliderModule} from '@angular/material/slider';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import {MatSortModule} from '@angular/material/sort';
import {MatTableModule} from '@angular/material/table';
import {MatTabsModule} from '@angular/material/tabs';
import {MatToolbarModule} from '@angular/material/toolbar';
import {BrowserModule} from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {JwtHelperService, JWT_OPTIONS} from '@auth0/angular-jwt';

import {AddEventsComponent} from './add-events/add-events.component';
import {AddPartiesComponent} from './add-parties/add-parties.component';
import {AdminComponent} from './admin/admin.component';
import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {AuthComponent} from './auth/auth.component';
import {DashboardComponent} from './dashboard/dashboard.component';
import {EventDetailComponent} from './event-detail/event-detail.component';
import {EventSearchComponent} from './event-search/event-search.component';
import {EventsComponent} from './events/events.component';
import {LoginComponent} from './login/login.component';
import {PartyCheckInComponent} from './party-check-in/party-check-in.component';
import {PartyManagementComponent} from './party-management/party-management.component';
import {PickupPartyComponent} from './pickup-party/pickup-party.component';
import {RegisterComponent} from './register/register.component';
import {ReservationComponent} from './reservation/reservation.component';
import {ResetPassFormComponent} from './reset-pass-form/reset-pass-form.component';
import {ResetPasswordComponent} from './reset-password/reset-password.component';

@NgModule({
  declarations: [
    AddEventsComponent,
    AddPartiesComponent,
    AdminComponent,
    AppComponent,
    AuthComponent,
    DashboardComponent,
    EventDetailComponent,
    EventSearchComponent,
    EventsComponent,
    LoginComponent,
    PartyCheckInComponent,
    PartyManagementComponent,
    PickupPartyComponent,
    RegisterComponent,
    ReservationComponent,
    ResetPassFormComponent,
    ResetPasswordComponent,
  ],
  imports: [
    AppRoutingModule,
    BrowserAnimationsModule,
    BrowserModule,
    FormsModule,
    HttpClientModule,
    LayoutModule,
    MatButtonModule,
    MatCardModule,
    MatCheckboxModule,
    MatDialogModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatListModule,
    MatPaginatorModule,
    MatProgressBarModule,
    MatSlideToggleModule,
    MatSliderModule,
    MatSnackBarModule,
    MatSortModule,
    MatTableModule,
    MatTabsModule,
    MatToolbarModule,
    ReactiveFormsModule,
  ],
  providers: [
    {provide: JWT_OPTIONS, useValue: JWT_OPTIONS},
    JwtHelperService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
