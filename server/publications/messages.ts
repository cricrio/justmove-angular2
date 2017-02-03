import { Meteor } from 'meteor/meteor';
import {MessageCollection} from '../../both/collections/message.collection';

Meteor.publish('messages',function(eventid :string){
  return MessageCollection.find({eventid});
});
