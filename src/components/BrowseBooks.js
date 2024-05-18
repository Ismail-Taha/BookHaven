// src/components/BrowseBooks.js
import React, { useEffect, useState } from 'react';
import { useAuth } from '../AuthContext';
import '../styles/BrowseBooks.css';

const BrowseBooks = () => {
    const { user } = useAuth();
    const [books, setBooks] = useState([]);

    useEffect(() => {
        const fetchBooks = async () => {
            const response = await fetch('http://localhost:3000/books');
            const data = await response.json();
            setBooks(data);
        };
        fetchBooks();
    }, []);

    const handleAddBook = async (book) => {
        if (!user) {
            alert('Please sign in to add books.');
            return;
        }
        console.log('Adding book:', book);
    };

    const handleDeleteBook = async (bookId) => {
        if (!user) {
            alert('Please sign in to delete books.');
            return;
        }
        console.log('Deleting book:', bookId);
    };

    return (
        <div className="browse-books-container">
            <h1>Browse Books</h1>
            {user && <button className="add-book-btn" onClick={() => handleAddBook({ title: "New Book", author: "Author Name" })}>Add Book</button>}
            <div className="books-grid">
                {books.map(book => (
                    <div className="book-card" key={book.id}>
                        <img src={book.cover} alt={book.title} className="book-cover" />
                        <h3 className="book-title">{book.title}</h3>
                        <p className="book-author">{book.author}</p>
                        {user && <button className="delete-book-btn" onClick={() => handleDeleteBook(book.id)}>Delete</button>}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default BrowseBooks;
