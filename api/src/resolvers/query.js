const models = require("../models");
module.exports = {
    user: async (parent, { username }, { models }) => {// Находим пользователя по имени
        return await models.User.findOne({ username });
    },
    users: async (parent, args, { models }) => {// Находим всех пользователей
        return await models.User.find({})
    },
    me: async (parent, args, { models, user }) => {
    // Находим пользователя по текущему пользовательскому контексту
        return await models.User.findById(user.id);
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
