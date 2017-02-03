import { Meteor } from 'meteor/meteor';
import {CategorieCollection} from '../../both/collections/categorie.collection';

Meteor.publish('categories',function(){
  return CategorieCollection.find();
})
