import React, { useState, useEffect } from 'react';
import axios from 'axios';
import AddorEditBook from '../AddorEditBook';
import './index.css';

const BookManagementPage = () => {
  const [books, setBooks] = useState([]);
  const [editingBook, setEditingBook] = useState(null); // Initial state for editing a book
  const [originalBookData, setOriginalBookData] = useState(null);
  const [loading, setLoading] = useState(false);

  // Fetch all books
  const fetchBooks = async () => {
    setLoading(true);
    try {
      const serverResponse = await axios.get('https://bookmanagement-backend-qh1z.onrender.com/books');
      const { response } = serverResponse.data;
      const updatedResponse = response.map(each => ({
        BookId: each.book_id,
        title: each.title,
        authorId: each.author_id,
        pages: each.pages,
        genreId: each.genre_id,
        publishedDate: each.published_date,
      }));
      setBooks(updatedResponse);
    } catch (error) {
      console.error('Error fetching books:', error);
      alert('Failed to fetch books.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBooks();
  }, []);

  // Helper to get changed fields
  const getChangedFields = (originalData, updatedData) => {
    const changes = {};
    for (const key in updatedData) {
      if (updatedData[key] !== originalData[key] && updatedData[key] !== '') {
        changes[key] = updatedData[key];
      }
    }
    return changes;
  };

  // Add or update a book
  const handleAddOrUpdateBook = async (bookData) => {
    try {
      if (editingBook) {
        // Get only changed fields
        const changedFields = getChangedFields(originalBookData, bookData);

        if (Object.keys(changedFields).length === 0) {
          alert('No changes detected.');
          return;
        }

        await axios.put(
          `https://bookmanagement-backend-qh1z.onrender.com/books/${editingBook.BookId}`,
          changedFields
        );
        alert('Book updated successfully!');
      } else {
        await axios.post('https://bookmanagement-backend-qh1z.onrender.com/books', bookData);
        alert('Book added successfully!');
      }

      setEditingBook(null); // Reset editing state after operation
      setOriginalBookData(null);
      fetchBooks();
    } catch (error) {
      console.error('Error saving book:', error);
      alert('Failed to save the book. Please try again.');
    }
  };

  // Delete a book
  const handleDeleteBook = async (bookId) => {
    const isConfirmed = window.confirm('Are you sure you want to delete this book?');
    if (isConfirmed) {
      try {
        await axios.delete(`https://bookmanagement-backend-qh1z.onrender.com/books/${bookId}`);
        alert('Book deleted successfully!');
        fetchBooks();
      } catch (error) {
        console.error('Error deleting book:', error);
        alert('Failed to delete the book. Please try again.');
      }
    }
  };

  // Set book for editing
  const startEditing = (book) => {
    setEditingBook(book);
    setOriginalBookData({ ...book }); // Save the original data for comparison
  };

  return (
    <div className="book-management-container">
      {/* Pass editingBook state to AddorEditBook to switch between Add/Edit modes */}
      <AddorEditBook
        initialData={editingBook || {}}
        onSubmit={handleAddOrUpdateBook}
        isEditMode={editingBook !== null} // Set Edit Mode flag
        setIsEditMode={(mode) => setEditingBook(mode ? editingBook : null)} // Set editingBook to null when Add mode
      />

      <div className="book-list">
        <h2>Book List</h2>
        {loading ? (
          <p>Loading books...</p>
        ) : books.length === 0 ? (
          <p>No books available. Add a book to get started!</p>
        ) : (
          <ul>
            {books.map((book, index) => (
              <li key={book.BookId || index} className="book-item">
                <div>
                  <strong>{book.title}</strong> with authorId: {book.authorId}
                  <br />
                  GenreId: {book.genreId}, Pages: {book.pages}, Published: {book.publishedDate || 'N/A'}
                </div>
                <div className="action-buttons">
                  <button onClick={() => startEditing(book)}>Edit</button>
                  <button onClick={() => handleDeleteBook(book.BookId)} className="delete-button">
                    Delete
                  </button>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default BookManagementPage;








