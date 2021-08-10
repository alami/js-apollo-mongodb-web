const { gql } = require('apollo-server-express');
module.exports = gql`
    type Note {
        id: ID!
        content: String!
        author: String!
    }
    type Pizza {
        id: ID!
        size: String!
        slices: Int
        #        toppings: [String]
    }
    type Query {
        notes: [Note!]!
        note(id: ID!): Note!
        pizzas: [Pizza!]!
        pizza(id: ID!): Pizza!
    }
    type Mutation {
        newNote(content: String!): Note!
        updateNote(id: ID!, content: String!): Note!
        deleteNote(id: ID!): Boolean!

        newPizza(size: String! slices: Int): Pizza!
        updatePizza(id: ID!, size: String! slices: Int): Pizza!
        deletePizza(id: ID!): Boolean!
    }
`;
