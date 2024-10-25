import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

function BookList() {
    const [books, setBooks] = useState([]);

    useEffect(() => {
        fetchBooks();
    }, []);

    const fetchBooks = async () => {
        const response = await axios.get('http://localhost:5000/books');
        setBooks(response.data);
    };

    const deleteBook = async (id) => {
        await axios.delete(`http://localhost:5000/books/${id}`);
        fetchBooks();
    };

    return (
        <div className="container mx-auto p-8">
            <h1 className="text-3xl font-bold mb-6">Book List</h1>
            <Link to="/add" className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 mb-6 inline-block">Add New Book</Link>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-4">
                {books.map((book) => (
                    <div key={book._id} className="bg-white p-6 rounded-lg shadow-md">
                        <h2 className="text-xl font-semibold">
                            <Link to={`/books/${book._id}`} className="text-blue-500 hover:underline">
                                {book.title}
                            </Link>
                        </h2>
                        <h4 className="text-gray-700">{book.author}</h4>
                        <h3 className="text-gray-700 font-bold">{book.description}</h3>
                        <p className="text-green-700 font-bold">${book.price}</p>
                        
                        <div className="mt-4">
                            <Link to={`/edit/${book._id}`} className="text-blue-500 hover:underline mr-4">Edit</Link>
                            <button onClick={() => deleteBook(book._id)} className="text-red-500 hover:underline">Delete</button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default BookList;
