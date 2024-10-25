const mongoose = require('mongoose');

const bookSchema = new mongoose.Schema({
    title: { type: String, required: true },
    author: { type: String, required: true },
    price: { type: Number, required: true },
    description: { type: String },
    isbn: { type: String, unique: true, required: true },
});

module.exports = mongoose.model('Book', bookSchema);