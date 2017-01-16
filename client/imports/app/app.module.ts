import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppComponent } from "./app.component";
import { RouterModule } from '@angular/router';
import { MaterialModule } from "@angular/material";

import {Navigation} from './navigation/navigation.component';
import {EventDataService} from './events/event-data.service';
import { routes } from './app.routes';
import {EVENTS_DECLARATIONS} from './events';
import {EventAddComponent} from './events/pagelist/add/add.component';

@NgModule({
  // Components, Pipes, Directive
  declarations: [
    AppComponent,
    Navigation,
    ...EVENTS_DECLARATIONS
  ],
  // Entry Components
  entryComponents: [
    AppComponent,
    EventAddComponent
  ],
  // Providers
  providers: [
    EventDataService
  ],
  // Modules
  imports: [
    RouterModule.forRoot(routes),
    MaterialModule.forRoot(),
    BrowserModule,
    FormsModule,
    ReactiveFormsModule
  ],
  // Main Component
  bootstrap: [ AppComponent ]
})
export class AppModule {
  constructor() {

  }
}
