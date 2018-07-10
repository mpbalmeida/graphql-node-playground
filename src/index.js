const { GraphQLServer } = require('graphql-yoga');

const typeDefs = `
type Query {
 info: String!
}
`;

const resolvers = {
    Query: {
        info: () => 'Hello GraphQL devs!'
    }
}

const server = new GraphQLServer({
    typeDefs,
    resolvers
});
server.start(() => console.log('server is running at localhost:4000'));