import {Component, OnInit, Output, EventEmitter} from '@angular/core';
import {Categorie} from '../../../../../../both/models';
import {CategorieCollection} from '../../../../../../both/collections/categorie.collection';
import { MeteorObservable } from 'meteor-rxjs';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';
import style from './categorieSelector.component.scss';
import template from './categorieSelector.component.html';

@Component({
    selector: 'event-categorie-selector',
    styles: [style],
    template
})
export class EventCategorieSelectorComponent implements OnInit {
    @Output() onCategorieSelected = new EventEmitter<Categorie>();
    categorieSub: Subscription;
    categories: Observable<Categorie[]>;
    categorieEvent: Categorie;
    showChange: boolean;

    
    ngOnInit() {

        this.categorieSub = MeteorObservable.subscribe('categories').subscribe(() => {
            this.categories = CategorieCollection.find({}).zone();
        });

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
