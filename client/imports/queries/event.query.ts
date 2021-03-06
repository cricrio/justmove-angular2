import gql from 'graphql-tag';

export const eventQuery = gql`
query getEvent($id: String){
  event(id : $id){
    _id
    title
    owner{
      _id
      name
      picture
    }
    categorie
    picture
    date
    description
    location
    guests{
      _id
      name
      picture
    }
  }
}`;

export const eventsListQuery = gql`
query getEvents{
  events{
    _id
    title
    owner{
      name
      picture
    }
    picture
    date
    categorie
    location
  }
}`;

export const guestsQuery = gql`
query getGuests($id: String){
  guests(id : $id){
    _id,
    picture,
    name
  }
}
`;

export const addGuestMutation: any = gql`
  mutation addGuest($eventid: String!){
    addGuest(eventId: $eventid) {
      _id
      name
      picture
    }
}
`;
export const removeGuestMutation: any = gql`
mutation addGuest($eventid: String!){
  removeGuest(eventId: $eventid) {
    _id
    name
    picture
  }
}
`;
export const addEventMutation: any = gql`
mutation addEvent($event: EventInput!){
  addEvent(event: $event){
    _id
    title
    owner{
      name
      picture
    }
    picture
    date
    categorie
    location
  }
}
`;
export const updateEventMutation: any = gql`
mutation updateEvent($eventId: String, $diff: EventInput!){
  updateEvent(eventId: $eventId ,diff: $diff) {
    _id
    title
    owner{
      name
      picture
    }
    picture
    date
    categorie
    location
  }
}
`;