import {Component} from '@angular/core';
import {Event} from '../../../../../../both/models/event.model';

import style from './categorieSelector.component.scss';
import template from './categorieSelector.component.html';

@Component({
  selector : 'event-categorie-selector',
  styles : [style],
  template
})
export class EventCategorieSelectorComponent {
    categories: [any];
    categorieEvent : string;
    event : Event;
    showChange: boolean;

    constructor(){}
    setCategorieEvent(categorie) {
        this.categorieEvent = categorie;
        this.event.categorie = categorie.name;
        this.event.picture = categorie.imageLarge;
    }
    showList() {
        return ! this.categorieEvent;
    }
    showImage() {
        return !!this.categorieEvent && !this.showChange;
    }
    setShowChangeImage() {
        this.showChange = true;
    }
    showChangeImage() {
        return this.showChange;
    }
}
