import gql from 'graphql-tag';

export const eventQuery = gql`
query getEvent($id: String){
  event(id : $id){
    _id
    title
    owner{
      name
      picture
    }
    picture
    date
    description
    location
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
  mutation addGuest($eventid: String! , $userid: String! ){
    addGuest(eventId: $eventid, userId: $userid) {
      _id
      guestids
    }
}
`;
