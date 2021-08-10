const models = require("../models");
module.exports = {
    newNote: async (parent, args, { models }) => {
        return await models.Note.create({
            content: args.content,
            author: 'Adam Scott'
        });
    },
    newPizza: async (parent, args, { models }) => {
        return await models.Pizza.create({
            size: args.size,
            slices: args.slices
        });
    }
}
