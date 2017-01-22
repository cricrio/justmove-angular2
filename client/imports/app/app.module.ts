import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppComponent } from "./app.component";
import { RouterModule } from '@angular/router';
import { MaterialModule } from "@angular/material";
import {MomentModule} from 'angular2-moment';

import { ApolloModule } from 'angular2-apollo';
import ApolloClient from 'apollo-client';
import { meteorClientConfig } from 'meteor/apollo';

import {Navigation} from './navigation/navigation.component';
import {EventDataService} from './events/event-data.service';
import {CategorieDataService} from './events/categorie-data.service';
import { routes } from './app.routes';
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
        CategorieDataService
    ],
    // Modules
    imports: [
        ApolloModule.withClient(provideClient),
        RouterModule.forRoot(routes),
        MaterialModule.forRoot(),
        BrowserModule,
        FormsModule,
        ReactiveFormsModule,
        MomentModule
    ],
    // Main Component
    bootstrap: [AppComponent]
})
export class AppModule {
    constructor() {

    }
}
