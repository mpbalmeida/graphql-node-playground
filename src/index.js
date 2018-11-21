const { GraphQLServer } = require('graphql-yoga');

const links = [
    {
        id: 1,
        url: 'www.google.com',
        description: 'this is a description'
    },
    {
        id: 2,
        url: 'www.udemy.com',
        description: 'this is a second description'
    }
];

//add root field greet inside the Query
//the return type of greet should be non nullable String
const typeDefs = `
type Query {
 info: String!
 greet: String!
 feed: [Link!]!
 getLink(id: ID!): Link
}
type Link {
    id: ID!
    url: String!
    description: String!
}
`;

const resolvers = {
    Query: {
        info: () => 'Hello GraphQL devs!',
        greet: () => 'hello world',
        feed: () => links,
        getLink(root, args) {
            const id = parseInt(args.id);
            return links.find(link => link.id === id);
        }
        // create a resolver for greet field
        //return the message hello world from the greet resolver
    },
    Link: {
        id(root) {
            return root.id;
        },
        url(root) {
            return root.url;
        },
        description(root) {
            return root.description;
        }
    }
};

const server = new GraphQLServer({
    typeDefs,
    resolvers
});
server.start(() => console.log('server is running at localhost:4000'));