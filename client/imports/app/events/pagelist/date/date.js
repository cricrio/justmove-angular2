import angular from 'angular';
import angularMeteor from 'angular-meteor';
import moment from 'moment';
import template from './date.html';

class EventDate {
    constructor() {
        'ngInject';
        this.$onInit = function() {
            this.event = {
                month:  moment(this.date).format('MMM').toUpperCase(),
                day:  moment(this.date).format('Do')
            }
        }
    }
}

const name = 'eventDate';

export default angular.module(name, [angularMeteor]).component(name, {
    templateUrl: template,
    controllerAs: name,
    controller: EventDate,
    bindings: {
        date: "<"
    }
});
