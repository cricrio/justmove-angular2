import {CategorieCollection} from '../both/collections/categorie.collection';
import {Categorie} from '../both/models/categorie.model';


const path = './images_categories/';
const largeExtension = '_large.jpg';
const smallExtension = '_small.jpg';

Meteor.startup(() => {
  if (CategorieCollection.find().cursor.count() === 0) {
    const categories : Categorie[]= [{
      'name': 'Vélo',
      'imageLarge' : path + 'velo/velo'+ largeExtension,
      'imageSmall':  path + 'velo/velo'+ smallExtension,
    }, {
      'name': 'Cinéma',
      'imageLarge' : path + 'cinema/cinema'+ largeExtension,
      'imageSmall' : path + 'cinema/cinema'+ smallExtension
    }, {
      'name': 'Lecture',
      'imageLarge' : path + 'book/book'+ largeExtension,
      'imageSmall' : path + 'book/book'+ smallExtension
    },{
      'name': 'Concert',
      'imageLarge' : path + 'concert/concert'+ largeExtension,
      'imageSmall' : path +'concert/concert'+ smallExtension
    }];
    console.log(categories);
    categories.forEach((categorie : Categorie) => {
      CategorieCollection.insert(categorie);
    });
   }
});
