import {userServiceInjectables} from './user.service';
import {eventServiceInjectables} from './event.service';

export * from './user.service';
export * from './event.service';

export var servicesInjectables: Array<any> = [
  userServiceInjectables,
  eventServiceInjectables
]
