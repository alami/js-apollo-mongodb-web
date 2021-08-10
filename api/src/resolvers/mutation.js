const models = require("../models");
module.exports = {
    newNote: async (parent, args, { models }) => {
        return await models.Note.create({
            content: args.content,
            author: 'Adam Scott'
        });
    },
    deleteNote: async (parent, { id }, { models }) => {
        try {
            await models.Note.findOneAndRemove({ _id: id});
            return true;
        } catch (err) {
            return false;
        }
    },
    updateNote: async (parent, {content, id}, {models}) => {
        return await models.Note.findOneAndUpdate(
            {
                _id: id,
            },
            {
                $set: {
                    content
                }
            },
            {
                new: true
            }
        );
    },

    newPizza: async (parent, args, { models }) => {
        return await models.Pizza.create({
            size: args.size,
            slices: args.slices
        });
    },
    updatePizza: async (parent, {size, slices, id}, {models}) => {
        return await models.Pizza.findOneAndUpdate(
            {
                _id: id,
            },
            {
                $set: {
                    size,
                    slices
                }
            },
            {
                new: true
            }
        );
    },
    deletePizza: async (parent, { id }, { models }) => {
        try {
            await models.Pizza.findOneAndRemove({ _id: id});
            return true;
        } catch (err) {
            return false;
        }
    },

}
