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

let idCount = links.length + 1;
const resolvers = {
    Query: {
        info: () => 'Hello GraphQL devs!',
        greet: () => 'hello world',
        feed: () => links,
        getLink: (root, args) => {
            const id = parseInt(args.id);
            return links.find(link => link.id === id);
        }
        // create a resolver for greet field
        //return the message hello world from the greet resolver
    },
    Mutation: {
        post: (root, {url, description}) => {
            const link = {
                id: idCount++,
                url,
                description
            };
            links.push(link);
            return link;
        },
        updateLink: (root, {id, url, description}) => {
            id = parseInt(id);
            const index = links.findIndex(link => link.id === id);
            if (url) {
                links[index].url = url;
            }
            if (description) {
                links[index].description = description;
            }
            return links[index];
        },
        deleteLink: (url, {id}) => {
            id = parseInt(id);
            const index = links.findIndex(link => link.id === id);
            links.splice(index, 1);

            return links[index];
        }
    }
};

const server = new GraphQLServer({
    typeDefs: './src/schema.graphql',
    resolvers
});
server.start(() => console.log('server is running at localhost:4000'));