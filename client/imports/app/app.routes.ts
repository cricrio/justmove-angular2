import { Route } from '@angular/router';

import { EventsListComponent } from './events/pagelist/list/list.component';

export const routes: Route[] = [
  { path: '', component: EventsListComponent }
];
