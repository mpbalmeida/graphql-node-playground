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
let idCount = links.length;
const resolvers = {
    Query: {
        info: () => 'Hello GraphQL devs !!',
        feed: () => links,
        getLink: (root, { id }) => links.find(link => link.id === id)

    },
    Mutation: {
        post(root, { url, description }) {
            const link = {
                id: `link-${idCount++}`,
                url,
                description
            };
            links.push(link);
            return link;
        }
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
    typeDefs: './src/schema.graphql',
    resolvers
});
server.start(() => console.log('server is running at localhost:4000'));