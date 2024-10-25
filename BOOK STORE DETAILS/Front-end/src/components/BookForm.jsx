import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';

function BookForm() {
    const [book, setBook] = useState({ title: '', author: '', price: '', description: '', isbn: '' });
    const { id } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        if (id) fetchBook();
    }, [id]);

    const fetchBook = async () => {
        const response = await axios.get(`http://localhost:5000/books/${id}`);
        setBook(response.data);
    };

    const handleChange = (e) => setBook({ ...book, [e.target.name]: e.target.value });

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (id) {
            await axios.put(`http://localhost:5000/books/${id}`, book);
        } else {
            await axios.post('http://localhost:5000/books', book);
        }
        navigate('/');
    };

    return (
        <div className="max-w-lg mx-auto p-4">
            <h1 className="text-2xl font-semibold text-gray-800 mb-6">{id ? 'Edit Book' : 'Add Book'}</h1>
            <form onSubmit={handleSubmit} className="space-y-4">
                <input
                    name="title"
                    value={book.title}
                    onChange={handleChange}
                    placeholder="Title"
                    className="w-full border border-gray-300 rounded px-3 py-2"
                />
                <input
                    name="author"
                    value={book.author}
                    onChange={handleChange}
                    placeholder="Author"
                    className="w-full border border-gray-300 rounded px-3 py-2"
                />
                <input
                    name="price"
                    value={book.price}
                    onChange={handleChange}
                    placeholder="Price"
                    type="number"
                    className="w-full border border-gray-300 rounded px-3 py-2"
                />
                <input
                    name="description"
                    value={book.description}
                    onChange={handleChange}
                    placeholder="Description"
                    className="w-full border border-gray-300 rounded px-3 py-2"
                />
                <input
                    name="isbn"
                    value={book.isbn}
                    onChange={handleChange}
                    placeholder="ISBN"
                    className="w-full border border-gray-300 rounded px-3 py-2"
                />
                <button type="submit" className="w-full bg-blue-600 hover:bg-blue-500 text-white px-4 py-2 rounded">
                    Save
                </button>
            </form>
        </div>
    );
}

export default BookForm;
