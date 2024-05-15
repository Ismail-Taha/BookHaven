import React, { useEffect, useState } from 'react';
import { useAuth } from '../AuthContext';
import '../styles/BrowseBooks.css';


const BrowseBooks = () => {
    const { user } = useAuth(); // Corrected to useAuth
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
        <div>
            <h1>Browse Books</h1>
            {user && <button onClick={() => handleAddBook({ title: "New Book", author: "Author Name" })}>Add Book</button>}
            <div>
                {books.map(book => (
                    <div key={book.id}>
                        <img src={book.cover} alt={book.title} />
                        <h3>{book.title}</h3>
                        <p>{book.author}</p>
                        {user && <button onClick={() => handleDeleteBook(book.id)}>Delete</button>}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default BrowseBooks;
