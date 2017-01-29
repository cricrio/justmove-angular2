import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppComponent } from "./app.component";
import { RouterModule } from '@angular/router';
import { MaterialModule } from "@angular/material";
import {MomentModule} from 'angular2-moment';
import { Ng2DatetimePickerModule } from 'ng2-datetime-picker';

import { ApolloModule } from 'angular2-apollo';
import ApolloClient from 'apollo-client';
import { meteorClientConfig } from 'meteor/apollo';

import {Navigation} from './navigation/navigation.component';
import {EventDataService} from './events/event-data.service';
import {CategorieDataService} from './events/categorie-data.service';
import { routes,ROUTES_PROVIDERS } from './app.routes';
import {AUTH_DECLARATIONS} from './auth';
import {EVENTS_DECLARATIONS} from './events';
import {EventAddComponent} from './events/pagelist/add/add.component';




// Create the client as outlined above
const client = new ApolloClient(meteorClientConfig());

export function provideClient(): ApolloClient {
    return client;
}

@NgModule({
    // Components, Pipes, Directive
    declarations: [
        AppComponent,
        Navigation,
        ...AUTH_DECLARATIONS,
        ...EVENTS_DECLARATIONS
    ],
    // Entry Components
    entryComponents: [
        AppComponent,
        EventAddComponent
    ],
    // Providers
    providers: [
        EventDataService,
        CategorieDataService,
        ...ROUTES_PROVIDERS
    ],
    // Modules
    imports: [
        ApolloModule.withClient(provideClient),
        RouterModule.forRoot(routes),
        MaterialModule.forRoot(),
        BrowserModule,
        FormsModule,
        ReactiveFormsModule,
        MomentModule,
        Ng2DatetimePickerModule
    ],
    // Main Component
    bootstrap: [AppComponent]
})
export class AppModule {
    constructor() {

    }
}
