const { gql } = require('apollo-server-express');
module.exports = gql`
    scalar DateTime
    type User {
        id: ID!
        username: String!
        email: String!
        avatar: String
        notes: [Note!]!
        favorites: [Note!]!
    }
    type Note {
        id: ID!
        content: String!
        author: User!
        favoriteCount: Int!
        favoritedBy: [User!]
        createdAt: DateTime!
        updatedAt: DateTime!
    }
    type NoteFeed {
        notes: [Note]!
        cursor: String!
        hasNextPage: Boolean!
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
        users: [User!]!
        user(username: String!): User
        me: User!
        noteFeed(cursor: String): NoteFeed
    }
    type Mutation {
        signUp(username: String!, email: String!, password: String!): String!
        signIn(username: String, email: String, password: String!): String!

        newNote(content: String!): Note!
        updateNote(id: ID!, content: String!): Note!
        deleteNote(id: ID!): Boolean!
        toggleFavorite(id: ID!): Note!

        newPizza(size: String! slices: Int): Pizza!
        updatePizza(id: ID!, size: String! slices: Int): Pizza!
        deletePizza(id: ID!): Boolean!
    }
`;
