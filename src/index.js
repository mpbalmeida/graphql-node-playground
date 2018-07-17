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
        },
        //updateLink
        updateLink(root, { id, description, url }) {
            const index = links.findIndex(link => link.id === id);
            if (url) {
                links[index].url = url
            }
            if (description) {
                links[index].description = description
            }
            return links[index];
        },
        //deleteLink
        deleteLink(root, { id }) {
            const index = links.findIndex(link => link.id === id);
            links.splice(index, 1);
            return links[index];
        }
    },

}

const server = new GraphQLServer({
    typeDefs: './src/schema.graphql',
    resolvers
});
server.start(() => console.log('server is running at localhost:4000'));