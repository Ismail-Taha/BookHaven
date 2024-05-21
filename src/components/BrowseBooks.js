import React, { useState, useEffect } from 'react';
import '../styles/BrowseBooks.css';

const BrowseBooks = () => {
  const [books, setBooks] = useState([]);
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState('');

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleUpload = async (e) => {
    e.preventDefault();
    if (!file) return;

    const formData = new FormData();
    formData.append('file', file);

    try {
      const res = await fetch('/api/upload', {
        method: 'POST',
        body: formData
      });
      const data = await res.json();
      setBooks([...books, data.filePath]);
      setPreview(data.filePath);
    } catch (err) {
      console.error('Error uploading file', err);
    }
  };

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const res = await fetch('http://localhost:3001/pdfBooks');
        const data = await res.json();
        setBooks(data);
      } catch (err) {
        console.error('Error fetching books', err);
      }
    };
    fetchBooks();
  }, []);

  return (
    <div className="browse-books-container" style={{ backgroundImage: "url('../assets/browsbooks.jpg')" }}>
      <h1>Browse Books</h1>
      <h2>PDF Books</h2>
      <div className="pdf-books-grid">
        {books.map((book, index) => (
          <div key={index} className="pdf-book-card">
            <embed src={book.filePath} width="100%" height="200px" />
            <p>{book.title}</p>
          </div>
        ))}
      </div>
      <form onSubmit={handleUpload}>
        <input type="file" onChange={handleFileChange} />
        <button type="submit">Add Book</button>
      </form>
      {preview && (
        <div className="pdf-preview">
          <h3>Preview:</h3>
          <embed src={preview} width="100%" height="500px" />
        </div>
      )}
    </div>
  );
};

export default BrowseBooks;
