const { gql } = require('apollo-server-express');
module.exports = gql`
    scalar DateTime
    type User {
        id: ID!
        username: String!
        email: String!
        avatar: String
        notes: [Note!]!
    }
    type Note {
        id: ID!
        content: String!
        author: User!
        createdAt: DateTime!
        updatedAt: DateTime!
    }
    type Pizza {
        id: ID!
        size: String!
        slices: Int
        #        toppings: [String]
        createdAt: DateTime!
        updatedAt: DateTime!
    }
    type Query {
        notes: [Note!]!
        note(id: ID!): Note!
        pizzas: [Pizza!]!
        pizza(id: ID!): Pizza!
    }
    type Mutation {
        signUp(username: String!, email: String!, password: String!): String!
        signIn(username: String, email: String, password: String!): String!

        newNote(content: String!): Note!
        updateNote(id: ID!, content: String!): Note!
        deleteNote(id: ID!): Boolean!

        newPizza(size: String! slices: Int): Pizza!
        updatePizza(id: ID!, size: String! slices: Int): Pizza!
        deletePizza(id: ID!): Boolean!
    }
`;
