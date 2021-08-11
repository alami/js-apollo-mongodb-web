const mongoose = require('mongoose');                     // Запросим библиотеку mongoose
// const noteSchema = new mongoose.Schema();                // Определяем схему БД заметки
const noteSchema = new mongoose.Schema(                 // Определяем схему БД заметки
    {
        content: {
            type: String,
            required: true
        },
        author: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: true
        },
        favoriteCount: {
            type: Number,
            default: 0
        },
        favoritedBy: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'User'
            }
        ]
    },
    {
        timestamps: true                  // Присваиваем поля createdAt и updatedAt с типом данных
    }
);

const Note = mongoose.model('Note', noteSchema);   // Определяем модель 'Note' со схемой
module.exports = Note;                                   // Экспортируем модуль

