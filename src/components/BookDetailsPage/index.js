import React from 'react';

import './index.css'; // Create and use a CSS file for styling

const BookDetailsPage = ({ book }) => {
  // Mock book data for demonstration; replace with actual data from props or API
  const mockBook = book || {
    title: "The Great Gatsby",
    author: "F. Scott Fitzgerald",
    genre: "Fiction",
    pages: 180,
    publishedDate: "1925-04-10",
  };

  return (
    <div className="details-container">
      <h1 className="details-title">Book Details</h1>
      <div className="details-card">
        <h2 className="book-title">{mockBook.title}</h2>
        <p><strong>Author:</strong> {mockBook.author}</p>
        <p><strong>Genre:</strong> {mockBook.genre}</p>
        <p><strong>Pages:</strong> {mockBook.pages}</p>
        <p><strong>Published Date:</strong> {new Date(mockBook.publishedDate).toDateString()}</p>
      </div>
    </div>
  );
};

export default BookDetailsPage;