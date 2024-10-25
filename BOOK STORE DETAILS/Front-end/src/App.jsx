import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import BookList from './components/BookList';
import BookForm from './components/BookForm';
import BookDetails from './components/BookDetails';



function App() {
    return (
        <Router>
            <div className="App">
                <Routes>
                    <Route path="/" element={<BookList />} />
                    <Route path="/add" element={<BookForm />} />
                    <Route path="/edit/:id" element={<BookForm />} />
                    <Route path="/books/:id" element={<BookDetails />} />
                </Routes>
            </div>
        </Router>
    );
}

export default App;