const { GraphQLServer } = require('graphql-yoga');

let links = [
    {
        id: 'link-0',
        url: 'www.fullstackhour.com',
        description: 'Fullstak web app with React, Node,Prisma and GraphQL'
    },
    {
        id: 'link-1',
        url: 'www.fullstackhour.com',
        description: 'GraphQL advanced Course'
    },
    {
        id: 'link-2',
        url: 'www.fullstackhour.com',
        description: 'PassportJs course'
    },
    {
        id: 'link-3',
        url: 'www.fullstackhour.com',
        description: 'NodeJs course'
    }
];

const typeDefs = `
type Query {
 info: String!
 feed : [Link!]!
 getLink(id: ID!): Link
}
type Link {
    id: ID!
    url : String!
    description: String!
}
`;

const resolvers = {
    Query: {
        info: () => 'Hello GraphQL devs !!',
        feed: () => links, //first execution
        getLink: (root, { id }) => links.find(link => link.id === id)

        //write resolver for getLink
        //get the id
        //find the link by id
        //return the link

    },
    Link: {
        id(root) {
            console.log(root)
            return root.id;
        },
        url(root) {
            return root.url
        },
        description(root) {
            return root.description
        }
    }

}

const server = new GraphQLServer({
    typeDefs,
    resolvers
});
server.start(() => console.log('server is running at localhost:4000'));