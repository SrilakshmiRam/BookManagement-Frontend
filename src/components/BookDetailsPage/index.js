import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { TailSpin } from 'react-loader-spinner';
import axios from 'axios';
import './index.css';

const BookDetailsPage = () => {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);  // Added loading state
  const { id } = useParams();

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const serverResponse = await axios.get('https://bookmanagement-backend-qh1z.onrender.com/books');
        const { response } = serverResponse.data;

        // Format the response
        const updatedResponse = response.map(each => ({
          bookId: each.book_id,
          title: each.title,
          authorId: each.author_id,
          pages: each.pages,
          genreId: each.genre_id,
          publishedDate: each.published_date,
        }));

        setBooks(updatedResponse);
        setLoading(false);  // Set loading to false once the data is fetched
      } catch (error) {
        console.error('Error fetching books:', error);
        alert('Failed to fetch books.');
        setLoading(false);
      }
    };

    fetchBooks();
  }, []);

  // Ensure book is available before rendering
  const book = books.find(each => each.bookId === parseInt(id));

  // Display loading message until the book is found or data is loaded
  if (loading) {
    return <div className="loader-container">
    <TailSpin height="80" width="80" color="#00BFFF" ariaLabel="loading" />
  </div>
  }

  // Display error message if book is not found
  if (!book) {
    return <div>Book not found!</div>;
  }

  return (
    <div className="details-container">
      <h1 className="details-title">Book Details</h1>
      <div className="details-card">
        <h2 className="book-title">{book.title}</h2>
        <p><strong>Author Id:</strong> {book.authorId}</p>
        <p><strong>Genre ID:</strong> {book.genreId}</p>
        <p><strong>Pages:</strong> {book.pages}</p>
        <p><strong>Published Date:</strong> {new Date(book.publishedDate).toDateString()}</p>
      </div>
    </div>
  );
};

export default BookDetailsPage;
