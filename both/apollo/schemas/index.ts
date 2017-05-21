export const typeDefs = [`
  scalar Date

  type User {
    _id: String
    name: String
    picture: String
    events: [Event]
  }
  type Event {
    _id: String
    title: String
    date: Date
    categorie: String
    location: String
    description: String
    picture: String
    owner: User
    guestids: [String]
    guests: [User]
    organisatorids : [String]
    organisators: [User]
  }
  type Query {
    event(id: String): Event
    events: [Event]
    user(id: String): User
    guests(id: String ): [User]
    organisators(id: String ): [User]
  }

  input EventInput{
    title: String
    date: Date
    categorie: String
    location: String
    description: String
    picture: String
    owner: String
    organisatorids :String
  }
  type Mutation {
    addGuest (
      eventId : String!
    ): User
    removeGuest (
      eventId : String!
    ): User
    addEvent(event :EventInput): Event
    updateEvent(event :EventInput): Event
  }

  schema {
    query: Query
    mutation: Mutation
  }
  `];
