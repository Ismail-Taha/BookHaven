import React, { useState, useEffect } from 'react';
import '../styles/BrowseBooks.css';

const BrowseBooks = () => {
  const [books, setBooks] = useState([]);
  const [file, setFile] = useState(null);
  const [title, setTitle] = useState('');
  const [preview, setPreview] = useState('');
  const [user, setUser] = useState({ name: 'Ismail-Taha' });

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleUpload = async (e) => {
    e.preventDefault();
    if (!file || !title) {
      alert('Please provide both a file and a title.');
      return;
    }

    const formData = new FormData();
    formData.append('file', file);
    formData.append('title', title);

    try {
      const res = await fetch('http://localhost:3002/api/upload', {
        method: 'POST',
        body: formData,
      });
      if (res.ok) {
        const data = await res.json();
        setBooks([...books, { title: data.title, filePath: data.filePath }]);
        setPreview(data.filePath);
        setTitle('');
        setFile(null);
        alert('Book added successfully!');
      } else {
        alert('Failed to add book.');
      }
    } catch (err) {
      console.error('Error uploading file', err);
      alert('Error uploading file. Please try again.');
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
    <div className="browse-books-container">
      <div className="header-section">
        <div className="dashboard">
          <h2>User Dashboard</h2>
          <p>Signed in successfully</p>
          <p>User: {user.name}</p>
        </div>
        <form onSubmit={handleUpload} className="upload-form">
          <input type="file" onChange={handleFileChange} />
          <input
            type="text"
            placeholder="Book Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <button type="submit">Add Book</button>
        </form>
      </div>
      <h1>Browse Books</h1>
      <h2>PDF Books</h2>
      <div className="pdf-books-grid">
        {books.map((book, index) => (
          <div key={index} className="pdf-book-card">
            <iframe src={`/pdfs/${book.filePath}`} frameBorder="0" width="100%" height="250px"></iframe>
            <p>{book.title}</p>
          </div>
        ))}
      </div>
      {preview && (
        <div className="pdf-preview">
          <h3>Preview:</h3>
          <iframe id="myPDF" src={preview} frameBorder="0" width="100%" height="250px"></iframe>
        </div>
      )}
    </div>
  );
};

export default BrowseBooks;
