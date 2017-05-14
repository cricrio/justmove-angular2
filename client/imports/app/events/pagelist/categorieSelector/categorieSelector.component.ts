import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Categorie } from '../../../../../../both/models';
import { CategorieCollection } from '../../../../../../both/collections/categorie.collection';
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
    @Input() categorie: string;
    categorieSub: Subscription;
    categories: Categorie[];
    categorieEvent: Categorie;
    showChange: boolean;


    ngOnInit() {
        console.log(this.categorie);

        this.categorieSub = MeteorObservable.subscribe('categories').subscribe(() => {
            CategorieCollection.find({}).subscribe((categories) => {
                this.categories = categories;
                if (this.categorie) {
                    this.categorieEvent = this.categories.filter(categorie => categorie.name == this.categorie)[0];
                    console.log(this.categorie);
                    console.log(this.categorieEvent);
                }
            });
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
    resetCategorie() {
        this.categorieEvent = null;
    }
    setShowChangeImage() {
        this.showChange = true;
    }
    showChangeImage() {
        return this.showChange;
    }
}
