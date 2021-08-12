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
    noteFeed: async (parent, { cursor }, { models }) => {
        const limit = 2;    // Жестко кодируем лимит в 10 элементов
        let hasNextPage = false;// Устанавливаем значение false по умолчанию для hasNextPage
                        // Если курсор передан не будет, то по умолчанию запрос будет пуст
        let cursorQuery = {};// В таком случае из БД будут извлечены последние заметки
        if (cursor) {  // Если курсор задан, запрос будет искать заметки с ObjectId < курсора
            cursorQuery = { _id: { $lt: cursor } };
        }
        let notes = await models.Note.find(cursorQuery) // Находим в БД limit + 1 заметок,
            .sort({ _id: -1 })                          // сортируя их от старых к новым
            .limit(limit + 1);
        if (notes.length > limit) { // Если число найденных заметок > limit, устанавливаем
            hasNextPage = true;     // hasNextPage как true и обрезаем заметки до лимита
            notes = notes.slice(0, -1);
        }    // Новым курсором будет ID Mongo-объекта последнего элемента массива списка
        const newCursor = notes[notes.length - 1]._id;
        return {
            notes,
            cursor: newCursor,
            hasNextPage
        };
    }
}
