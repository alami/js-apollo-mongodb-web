const express = require('express');
const { ApolloServer, gql } = require('apollo-server-express');

require('dotenv').config();
const db = require('./db');

const port = process.env.PORT || 4000;
const DB_HOST = process.env.DB_HOST;

const models = require('./models');

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
        note(id: ID!): Note
        pizza(id: ID!): Pizza
        pizzas: [Pizza!]!
    }
    type Mutation {
        newNote(content: String!): Note!
        newPizza(size: String! slices: Int): Pizza!
    }

`;
const resolvers = {
    Query: {
        hello: () => 'Hello world!',
        notes: async () => {
            return await models.Note.find();
        },
        note: async (parent, args) => {
            return await models.Note.findById(args.id);
        },
        pizzas: async () => {
            return await models.Pizza.find();
        },
        pizza: async (parent, args) => {
            return await models.Pizza.findById(args.id);
        },
    },
    Mutation: {
        newPizza: async (parent, args) => {
            return await models.Pizza.create({
                size: args.size,
                slices: args.slices
            });
        },
        newNote: async (parent, args) => {
            return await models.Note.create({
                content: args.content,
                author: 'Adam Scott'
            });
        }
    }
};

const app = express();
db.connect(DB_HOST);

const server = new ApolloServer({ typeDefs, resolvers });
server.applyMiddleware({ app, path: '/api' });
app.listen({ port }, () =>
    console.log(
        `GraphQL Server running at http://localhost:${port}${server.graphqlPath}`
    )
);
