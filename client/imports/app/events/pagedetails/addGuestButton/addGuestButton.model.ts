import gql from 'graphql-tag';

export const addGuestMutation: any = gql`
  mutation addGuest($eventid: String! , $userid: String! ){
    addGuest(eventId: $eventid, userId: $userid) {
      _id
      guestids
    }
}
`;
