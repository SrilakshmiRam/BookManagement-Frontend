import { Link } from 'react-router-dom';
import React, { useState,useEffect } from 'react';

import axios from 'axios'
import SearchResults from '../SearchResults';
import './index.css';

const Home = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]); // To store filtered data
  const [isLoading, setIsLoading] = useState(false); // To handle loading state
  const [error, setError] = useState(null); // To handle errors

  
  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const serverResponse = await axios.get('https://bookmanagement-backend-qh1z.onrender.com/books');
        const { response } = serverResponse.data; // Ensure this matches your backend's data structure
  
        // Map and format the response
        const updatedResponse = response.map(each => ({
          bookId: each.book_id,
          title: each.title,
          authorId: each.author_id,
          pages: each.pages,
          genreId: each.genre_id,
          publishedDate: each.published_date,
        }));
  
        // Update the state with the fetched books
        setSearchResults(updatedResponse);
      } catch (error) {
        console.error('Error fetching books:', error);
        alert('Failed to fetch books.');
      }
    };
  
    fetchBooks(); // Call the async function
  }, []);

  const handleSearch = async () => {
    const trimmedQuery = searchQuery.trim();
  
    if (!trimmedQuery) {
      console.log("Please enter a search query.");
      return;
    }
  
    setIsLoading(true);
    setError(null);
  
    try {

      // Filter books on the frontend based on the search query
      const filteredBooks = searchResults.filter(book =>
        book.title.toLowerCase().includes(trimmedQuery.toLowerCase())
      );
  
      setSearchResults(filteredBooks);
      
      if (filteredBooks.length === 0) {
        console.log("No books found matching the search query.");
      }
    } catch (error) {
      setError("Failed to fetch books. Please try again later.");
      console.error("Error fetching books:", error);
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <div className="home-container">
      {/* Navigation Bar */}
      <nav className="navbar">
        <Link to="/" className="navLink">Home</Link>
        <Link to="/contact" className="navLink">Contact</Link>
        <Link to="/about" className="navLink">About</Link>
        <Link to="add/edit" className="navLink">Add Book</Link>
      </nav>

      {/* Search Section */}
      <div className="searchSection">
        <h1>Search Books</h1>

        <div className="filterGroup">
          {/* Search Input */}
          <input
            type="text"
            placeholder="Search by title..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="input"
          />
          {/* Search Button */}
          <button onClick={handleSearch} className="search-button">
            Search
          </button>
        </div>

        {/* Search Results */}
        {isLoading ? (
          <p>Loading...</p>
        ) : error ? (
          <p className="error">{error}</p>
        ) : (
          <SearchResults results={searchResults} />
        )}
      </div>
    </div>
  );
};

export default Home;
