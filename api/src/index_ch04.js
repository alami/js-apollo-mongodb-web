const express = require('express');
const { ApolloServer, gql } = require('apollo-server-express');

let notes = [
    { id: '1', content: 'This is a note', author: 'Adam Scott' },
    // { id: '2', content: 'This is another note', author: 'Harlow Everly' },
    // { id: '3', content: 'Oh hey look, another note!', author: 'Riley Harrison' }
];
let pizzas = [
    { id: '1', size: 'This is a pizza', slices: '3'},
];

const typeDefs = gql`
    type Pizza {
        id: ID!
        size: String!
        slices: Int
#        toppings: [String]
    }
    type Note {
        id: ID!
        content: String!
        author: String!
    }
    type Query {
        hello: String
        notes: [Note!]!
        pizzas: [Pizza!]!
        note(id: ID!): Note
        pizza(id: ID!): Pizza
    }
    type Mutation {
        newNote(content: String!): Note!
        newPizza(size: String! slices: Int): Pizza!
    }

`;
const resolvers = {
    Query: {
        hello: () => 'Hello world!',
        notes: () => notes,
        note: (parent, args) => {
            return notes.find(note => note.id === args.id);
        },
        pizzas: () => pizzas,
        pizza: (parent, args) => {
            return pizzas.find(pizza => pizza.id === args.id);
        },
    },
    Mutation: {
        newPizza: (parent, args) => {
            let nPizza = {
                id: String(pizzas.length + 1),
                size: args.size,
                slices: args.slices
            };
            pizzas.push(nPizza);
            return nPizza;
        },
        newNote: (parent, args) => {
            let noteValue = {
                id: String(notes.length + 1),
                content: args.content,
                author: 'Adam Scott'
            };
            notes.push(noteValue);
            return noteValue;
        }
    }
};
const port = process.env.PORT || 4000;
const app = express();
const server = new ApolloServer({ typeDefs, resolvers });
server.applyMiddleware({ app, path: '/api' });
app.listen({ port }, () =>
    console.log(
        `GraphQL Server running at http://localhost:${port}${server.graphqlPath}`
    )
);
/* app.get('/', (req, res) => res.send('Hello World!!!'));
   app.listen(port, () => console.log(`Listening on port ${port}!`)); */

