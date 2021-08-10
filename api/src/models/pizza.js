const mongoose = require('mongoose');                     // Запросим библиотеку mongoose
const pizzaSchema = new mongoose.Schema(                 // Определяем схему БД заметки
    {
        size: {
            type: String,
            required: true
        },
        slices: {
            type: Number,
            required: true
        },
        /*toppings: {
            type: String,
            required: false
        }*/
    },
    {
        timestamps: true                  // Присваиваем поля createdAt и updatedAt с типом данных
    }
);

const Pizza = mongoose.model('Pizza', pizzaSchema);   // Определяем модель '3' со схемой
module.exports = Pizza;                                   // Экспортируем модуль

