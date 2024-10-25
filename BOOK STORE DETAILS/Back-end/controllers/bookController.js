const Book = require('../models/book');

const getBooks = async (req, res) => {
    try {
        const books = await Book.find();
        res.status(200).json(books);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching books' });
    }
};

const addBook = async (req, res) => {
    try {
        const newBook = new Book(req.body);
        await newBook.save();
        res.status(201).json(newBook);
    } catch (error) {
        res.status(500).json({ message: 'Error adding book' });
    }
};

const updateBook = async (req, res) => {
    try {
        const updatedBook = await Book.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.status(200).json(updatedBook);
    } catch (error) {
        res.status(500).json({ message: 'Error updating book' });
    }
};

const deleteBook = async (req, res) => {
    try {
        await Book.findByIdAndDelete(req.params.id);
        res.status(200).json({ message: 'Book deleted' });
    } catch (error) {
        res.status(500).json({ message: 'Error deleting book' });
    }
};

const getBook = async (req, res) => {
    const { id } = req.params;
    try {
        const book = await Book.findById(id);
        if (!book) {
            return res.status(404).json({ message: 'Book not found' });
        }
        res.json(book);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


module.exports = { getBooks, getBook,  addBook, updateBook, deleteBook };
