import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import axios from 'axios';

function BookDetails() {
    const { id } = useParams(); 
    const navigate = useNavigate(); 
    const [book, setBook] = useState(null); 

    useEffect(() => {
        fetchBookDetails(); 
    }, [id]);

    const fetchBookDetails = async () => {
        try {
            const response = await axios.get(`http://localhost:5000/books/${id}`);
            if (response.data) {
                setBook(response.data);
            } else {
                console.error("Book not found");
            }
        } catch (error) {
            console.error("Error fetching book details:", error); 
        }
    };

    const deleteBook = async () => {
        try {
            await axios.delete(`http://localhost:5000/books/${id}`); 
            navigate('/'); 
        } catch (error) {
            console.error("Error deleting book:", error); 
        }
    };

    if (!book) {
        return <p className="text-center">Loading book details...</p>; 
    }

    return (
        <div className="max-w-xl mx-auto p-4">
            <h1 className="text-2xl font-semibold text-gray-800 mb-4">{book.title}</h1>
            <p><strong>Author:</strong> {book.author}</p>
            <p><strong>Price:</strong> ${book.price}</p>
            <p><strong>Description:</strong> {book.description}</p>
            <p><strong>ISBN:</strong> {book.isbn}</p>
            <div className="mt-4 flex gap-4">
                <Link to={`/edit/${id}`} className="text-blue-600">Edit Book</Link>
                <button onClick={deleteBook} className="text-red-600">Delete Book</button>
                <button onClick={() => navigate(-1)} className="text-gray-600">Go Back</button>
            </div>
        </div>
    );
}

export default BookDetails;
