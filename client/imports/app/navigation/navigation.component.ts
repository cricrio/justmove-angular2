import { Component} from '@angular/core';
import {Meteor} from 'meteor/meteor';
import template from './navigation.component.html';
import style from './navigation.component.scss';

@Component({
    selector: 'navigation',
    template,
    styles: [style]
})
export class Navigation {
    constructor() { }

    islogin(): boolean {
        return !!Meteor.userId();
    }
    logout(): void {
        Meteor.logout();
    }
}
