import {CategorieCollection} from '../../../../both/collections/categorie.collection';
import {Categorie} from '../../../../both/models/categorie.model';

import { Injectable } from "@angular/core";
import { ObservableCursor } from "meteor-rxjs";

@Injectable()
export class CategorieDataService {
    private data: ObservableCursor<Categorie>;

    constructor() {
        this.data = CategorieCollection.find({});
    }

    public addCategorie(categorie : Categorie) : void {
        CategorieCollection.insert(categorie);
    }
    public getData(): ObservableCursor<Categorie> {
        return this.data;
    }

}
