import {Component, OnInit, Output,EventEmitter} from '@angular/core';
import { Observable } from 'rxjs/Observable';
import {Categorie, JmEvent} from '../../../../../../both/models';
import {CategorieDataService} from '../../categorie-data.service';


import style from './categorieSelector.component.scss';
import template from './categorieSelector.component.html';

@Component({
    selector: 'event-categorie-selector',
    styles: [style],
    template
})
export class EventCategorieSelectorComponent implements OnInit {
    @Output() onCategorieSelected = new EventEmitter<Categorie>();
    categories: Observable<Categorie[]>;
    categorieEvent: Categorie;
    showChange: boolean;

    constructor(private categorieDataService: CategorieDataService) { }
    ngOnInit() {
        this.categories = this.categorieDataService.getData();
    }
    setCategorieEvent(categorie: Categorie) {

        this.categorieEvent = categorie;
        this.onCategorieSelected.emit(categorie);
    }
    showList() {
        return !this.categorieEvent;
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
