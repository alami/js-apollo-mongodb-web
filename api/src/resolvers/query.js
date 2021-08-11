const models = require("../models");
module.exports = {
    users: async (parent, args, { models }) => {
        return await models.User.find()
    },
    notes: async (parent, args, { models }) => {
        return await models.Note.find()
    },
    note: async (parent, args, { models }) => {
        return await models.Note.findById(args.id);
    },
    pizzas: async (parent, args, { models }) =>  {
        return await models.Pizza.find();
    },
    pizza: async (parent, args, { models }) => {
        return await models.Pizza.findById(args.id);
    },
}
