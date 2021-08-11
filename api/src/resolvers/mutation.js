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
