const { GraphQLServer } = require('graphql-yoga');

//add root field greet inside the Query
//the return type of greet should be non nullable String
const typeDefs = `
type Query {
 info: String!
}
`;

const resolvers = {
    Query: {
        info: () => 'Hello GraphQL devs!',
        // create a resolver for greet field
        //return the message hello world from the greet resolver
    }
}

const server = new GraphQLServer({
    typeDefs,
    resolvers
});
server.start(() => console.log('server is running at localhost:4000'));