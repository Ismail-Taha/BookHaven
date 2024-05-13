import React from 'react';
import '../styles/FeaturedBooks.css';

const FeaturedBooks = ({ books }) => {
    return (
        <div className="featured-books">
            {books.map(book => (
                <div key={book.id} className="book">
                    <img src={book.cover} alt={book.title} />
                    <h3>{book.title}</h3>
                    <p>{book.author}</p>
                </div>
            ))}
        </div>
    );
};

export default FeaturedBooks;
