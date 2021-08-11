const mongoose = require('mongoose');
const UserSchema = new mongoose.Schema(
    {
        username: {
            type: String,
            required: true,
            index: { unique: true }
        },
        email: {
            type: String,
            required: true,
            index: { unique: true }
        },
        password: {
            type: String,
            required: true
        },
        avatar: {
            type: String
        }
    },
    {
        timestamps: true // Присваиваем поля createdAt и updatedAt с типом Date
    }
);
const User = mongoose.model('User', UserSchema);
module.exports = User;
