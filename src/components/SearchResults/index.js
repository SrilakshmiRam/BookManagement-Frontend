import { Link } from 'react-router-dom';

import axios from 'axios'

import React, { useState } from 'react';

import './index.css'

const SearchResults = props => {
  // Sample data for demonstration (Replace with API data)
  const {results}=props
  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const booksPerPage = 10;

  // Pagination logic
  const indexOfLastBook = currentPage * booksPerPage;
  const indexOfFirstBook = indexOfLastBook - booksPerPage;
  const currentBooks = results.slice(indexOfFirstBook, indexOfLastBook);

  const totalPages = Math.ceil(results.length / booksPerPage);
  
  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleViewDetails = (bookId) => {
    console.log(`Viewing details for book ID: ${bookId}`);
  };

  const handleEditBook = (bookId) => {
    console.log(`Editing book ID: ${bookId}`);
  };

  const handleDeleteBook = async (bookId) => {
    const isConfirmed = window.confirm('Are you sure you want to delete this book?');
    if (isConfirmed) {
      try {
        await axios.delete(`https://bookmanagement-backend-qh1z.onrender.com/books/${bookId}`);
        alert('Book deleted successfully!');
        
        // Remove the deleted book from the state
        results.filter((book) => book.bookId !== bookId);
      } catch (error) {
        console.error('Error deleting book:', error);
        alert('Failed to delete the book. Please try again.');
      }
    }
  };
  

  return (
    <div className='container'>
      <h1>Search Results</h1>

      {/* Book List */}
      <div className='grid'>
          {currentBooks.map((book, index) => (
             <div key={book.bookId || index} className='card'>
                  <h2>{book.title}</h2>
                  <p>Author: {book.authorId}</p>
                  <p>Genre: {book.genreId}</p>
                  <p>Pages: {book.pages}</p>
                  <p>Published Date: {book.publishedDate}</p>
                  <div className='buttonGroup'>
                  <Link to={`/book/${book.bookId}`} className='navLink'>
                     <button onClick={() => handleViewDetails(book.bookId)} className='button'>
            View
                     </button>
                  </Link>
                  <Link to='add/edit' className='navLink'>
          <button onClick={() => handleEditBook(book.bookId)} className='button'>
            Edit
          </button>
                  </Link>
                  <button onClick={() => handleDeleteBook(book.bookId)} className='deleteButton'>
          Delete
                  </button>
                </div>
             </div>
           ))}
      </div>


      {/* Pagination Controls */}
      <div className='pagination'>
        <button onClick={handlePreviousPage} disabled={currentPage === 1} className='paginationButton'>
          Previous
        </button>
        <span>Page {currentPage} of {totalPages}</span>
        <button onClick={handleNextPage} disabled={currentPage === totalPages} className='paginationButton'>
          Next
        </button>
      </div>
    </div>
  );
};


export default SearchResults