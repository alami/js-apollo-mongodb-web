const mongoose = require('mongoose');

const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const {
    AuthenticationError,
    ForbiddenError
} = require('apollo-server-express');
require('dotenv').config();
const gravatar = require('../util/gravatar');

const models = require("../models");
module.exports = {
    signUp: async (parent, { username, email, password }, { models }) => {
        email = email.trim().toLowerCase();                 // Нормализуем имейл
        const hashed = await bcrypt.hash(password, 10); // Хешируем пароль
        const avatar = gravatar(email);                     // Создаем url gravatar-изображения
        try {
            const user = await models.User.create({
                username,
                email,
                avatar,
                password: hashed
            });
            return jwt.sign({ id: user._id }, process.env.JWT_SECRET);// Создаем и возвращаем json web token
        } catch (err) {
            console.log(err);
            throw new Error('Error creating account'); // Если при регистрации возникла проблема, выбрасываем ошибку
        }
    },
    signIn: async (parent, { username, email, password }, { models }) => {
        if (email) {
            email = email.trim().toLowerCase(); // Нормализуем e-mail
        }
        const user = await models.User.findOne({
            $or: [{ email }, { username }]
        });
        if (!user) {       // Если пользователь не найден, выбрасываем ошибку аутентификации
            throw new AuthenticationError('Error signing in');
        }
        const valid = await bcrypt.compare(password, user.password); // Если пароли не совпадают, выбрасываем ошибку аутентификации
        if (!valid) {
            throw new AuthenticationError('Error signing in');
        }
        return jwt.sign({ id: user._id }, process.env.JWT_SECRET); // Если пароли не совпадают, выбрасываем ошибку аутентификации
    },


    newNote: async (parent, args, { models, user }) => {
        if (!user) {
            throw new AuthenticationError('You must be signed in to create a note');
        }
        return await models.Note.create({
            content: args.content,
            author: mongoose.Types.ObjectId(user.id) // Ссылаемся на mongo id автора
        });
    },
    deleteNote: async (parent, { id }, { models, user }) => {
        if (!user) {        // Если не пользователь, выбрасываем ошибку авторизации
            throw new AuthenticationError('You must be signed in to delete a note');
        }
        const note = await models.Note.findById(id);// Находим заметку
        if (note && String(note.author) !== user.id) {
            throw new ForbiddenError("You don't have permissions to delete the note");
        }// Если владелец заметки и текущий пользователь не совпадают, выбрасываем запрет на действие

        try {  // Если все проверки проходят, удаляем заметку
            await note.remove();//await models.Note.findOneAndRemove({ _id: id});
            return true;
        } catch (err) {// Если в процессе возникает ошибка, возвращаем false
            return false;
        }
    },
    updateNote: async (parent, {content, id}, {models, user}) => {
        if (!user) { // Если не пользователь, выбрасываем ошибку авторизации
            throw new AuthenticationError('You must be signed in to update a note');
        }
        const note = await models.Note.findById(id);// Находим заметку
        if (note && String(note.author) !== user.id) {
            throw new ForbiddenError("You don't have permissions to update the note");
        }// Если владелец заметки и текущий пользователь не совпадают, выбрасываем запрет на действие
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
    toggleFavorite: async (parent, { id }, { models, user }) => {
        if (!user) { // Если контекст пользователя не передан, выбрасываем ошибку
            throw new AuthenticationError();
        }  // Проверяем, отмечал ли пользователь заметку как избранную
        let noteCheck = await models.Note.findById(id);
        const hasUser = noteCheck.favoritedBy.indexOf(user.id);
// Если пользователь есть в списке, удаляем его оттуда и уменьшаем значение favoriteCount на 1
        if (hasUser >= 0) {
            return await models.Note.findByIdAndUpdate(
                id,
                {
                    $pull: {
                        favoritedBy: mongoose.Types.ObjectId(user.id)
                    },
                    $inc: {
                        favoriteCount: -1
                    }
                },
                {// Устанавливаем new как true, чтобы вернуть обновленный документ
                    new: true
                }
            );
        } else {
// Если пользователя в списке нет, добавляем его туда и увеличиваем значение favoriteCount на 1
                return await models.Note.findByIdAndUpdate(
                    id,
                    {
                        $push: {
                            favoritedBy: mongoose.Types.ObjectId(user.id)
                        },
                        $inc: {
                            favoriteCount: 1
                        }
                    },
                    {
                        new: true
                    }
                );
            }
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
