import { createApolloServer } from 'meteor/apollo';
import { makeExecutableSchema, addMockFunctionsToSchema } from 'graphql-tools';

// import typeDefs from '../both/apollo/schemas';
// import resolvers from '../both/apollo/resolvers';

// const schema = makeExecutableSchema({
//   typeDefs,
//   resolvers,
// });
import {schema} from '../both/apollo/';
createApolloServer({
  schema,
});
