import gql from 'graphql-tag';

export const addGuestMutation: any = gql`
  mutation addGuest($eventid: String!){
    addGuest(eventId: $eventid) {
      _id
      guestids
    }
}
`;
