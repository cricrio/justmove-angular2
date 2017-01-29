import { Route } from '@angular/router';

import { EventDetailsComponent} from './events/pagedetails/details/details.component';
import { EventsListComponent } from './events/pagelist/list/list.component';
import { LoginComponent } from './auth/login/login.component';
import { SignupComponent } from './auth/signup/signup.component';

export const routes: Route[] = [
    { path: '', component: EventsListComponent },
    { path: 'event/:eventId', component: EventDetailsComponent, canActivate: ['canActivateForLoggedIn']  },
    { path: 'login', component: LoginComponent },
    { path: 'signup', component: SignupComponent }
];

export const ROUTES_PROVIDERS = [{
  provide: 'canActivateForLoggedIn',
  useValue: () => !! Meteor.userId()
}];
