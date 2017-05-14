import {CollectionObject} from './collection-object.model';

export interface Categorie extends CollectionObject{
  name : string,
  imageLarge : string,
  imageSmall : string
}
