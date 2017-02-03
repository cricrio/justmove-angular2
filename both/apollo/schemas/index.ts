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
  }
  schema {
    query: Query
  }
  `];
