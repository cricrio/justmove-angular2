import {resolvers} from './resolvers';
import {typeDefs} from './schemas';

import {makeExecutableSchema} from 'graphql-tools';

export const schema = makeExecutableSchema({typeDefs, resolvers});
