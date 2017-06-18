import { EventDetailsInfoComponent } from './detailsEventInfo/detailsEventInfo.component';
import { EventDetailsComponent } from './details/details.component';
import { EventListUserComponent } from './listUser/listUser.component';
import { EventUserComponent } from './user/user.component';
import { EventDetailsMessageRoomComponent } from './detailsMessageRoom/detailsMessageRoom.component';
import { EventDetailsMessageComponent } from './detailsMessage/detailsMessage.component';
import { UserSmallPictureComponent } from './userSmallPicture/userSmallPicture.component';
import { EventDetailsAddGuestButtonComponent } from './addGuestButton/addGuestButton.component';
import {EventUpdateButton} from './updateEventButton/updateEventButton.component';
import {JustmoveCalendarComponent} from './justmove-calendar/justmove-calendar.component';
import {JustmoveMapsComponent} from './justmove-maps/justmove-maps.component';

export const EVENTS_PAGE_DETAILS_DECLARATIONS = [
    EventDetailsComponent,
    EventDetailsInfoComponent,
    EventUserComponent,
    EventListUserComponent,
    EventDetailsMessageRoomComponent,
    EventDetailsMessageComponent,
    EventDetailsAddGuestButtonComponent,
    UserSmallPictureComponent,
    EventUpdateButton,
    JustmoveCalendarComponent,
    JustmoveMapsComponent
];
