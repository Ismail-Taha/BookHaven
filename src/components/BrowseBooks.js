import React, { useEffect, useState } from 'react';
import { useAuth } from '../AuthContext';
import '../styles/BrowseBooks.css';

const BrowseBooks = () => {
    const { user } = useAuth();
    const [books, setBooks] = useState([]);
    const [pdfBooks, setPdfBooks] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [newBook, setNewBook] = useState({ title: '', author: '', cover: '', coverFile: null });

    useEffect(() => {
        const fetchBooks = async () => {
            try {
                const response = await fetch('http://localhost:3000/books');
                if (!response.ok) throw new Error('Failed to fetch books');
                const data = await response.json();
                setBooks(data);
            } catch (error) {
                console.error('Error fetching books:', error);
            }
        };

        const fetchPdfBooks = async () => {
            try {
                const response = await fetch('http://localhost:3000/pdfs');
                if (!response.ok) throw new Error('Failed to fetch PDF books');
                const pdfFiles = await response.json();
                setPdfBooks(pdfFiles);
            } catch (error) {
                console.error('Error fetching PDF books:', error);
            }
        };

        fetchBooks();
        fetchPdfBooks();
    }, []);

    const handleAddBook = async (event) => {
        event.preventDefault();
        if (!user) {
            alert('Please sign in to add books.');
            return;
        }

        let coverUrl = newBook.cover;
        try {
            if (newBook.coverFile) {
                // Upload file logic here
                const formData = new FormData();
                formData.append('file', newBook.coverFile);
                const response = await fetch('http://localhost:3000/upload', {
                    method: 'POST',
                    body: formData,
                });
                if (!response.ok) throw new Error('Failed to upload cover file');
                const data = await response.json();
                coverUrl = data.url;
            }

            const book = {
                title: newBook.title,
                author: newBook.author,
                cover: coverUrl,
            };

            const response = await fetch('http://localhost:3000/books', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(book),
            });

            if (!response.ok) throw new Error('Failed to add book');
            const addedBook = await response.json();
            setBooks([...books, addedBook]);
            setShowModal(false);
            setNewBook({ title: '', author: '', cover: '', coverFile: null });
        } catch (error) {
            console.error('Error adding book:', error);
            alert('Failed to add book.');
        }
    };

    const handleInputChange = (event) => {
        const { name, value, files } = event.target;
        if (files) {
            setNewBook({ ...newBook, coverFile: files[0] });
        } else {
            setNewBook({ ...newBook, [name]: value });
        }
    };

    const handleDeleteBook = async (bookId) => {
        if (!user) {
            alert('Please sign in to delete books.');
            return;
        }
        try {
            const response = await fetch(`http://localhost:3000/books/${bookId}`, {
                method: 'DELETE',
            });
            if (!response.ok) throw new Error('Failed to delete book');
            setBooks(books.filter(book => book.id !== bookId));
        } catch (error) {
            console.error('Error deleting book:', error);
            alert('Failed to delete book.');
        }
    };

    return (
        <div className="browse-books-container">
            <h1>Browse Books</h1>
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
            <h2>PDF Books</h2>
            <div className="horizontal-scroll">
                {pdfBooks.map((pdf, index) => (
                    <div className="pdf-book-card" key={index}>
                        <a href={`/pdfs/${pdf}`} target="_blank" rel="noopener noreferrer">
                            <div className="pdf-thumbnail">{pdf}</div>
                        </a>
                    </div>
                ))}
            </div>
            {user && <button className="add-book-btn" onClick={() => setShowModal(true)}>Add Book</button>}
            {showModal && (
                <div className="modal">
                    <div className="modal-content">
                        <span className="close" onClick={() => setShowModal(false)}>&times;</span>
                        <form onSubmit={handleAddBook}>
                            <label>
                                Title:
                                <input type="text" name="title" value={newBook.title} onChange={handleInputChange} required />
                            </label>
                            <label>
                                Author:
                                <input type="text" name="author" value={newBook.author} onChange={handleInputChange} required />
                            </label>
                            <label>
                                Cover URL:
                                <input type="text" name="cover" value={newBook.cover} onChange={handleInputChange} />
                            </label>
                            <label>
                                Or Upload Cover:
                                <input type="file" name="coverFile" onChange={handleInputChange} />
                            </label>
                            <button type="submit">Add Book</button>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default BrowseBooks;
