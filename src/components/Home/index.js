import { Link } from 'react-router-dom';
import React, { useState } from 'react';
import SearchResults from '../SearchResults';
import './index.css';

const Home = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]); // To store filtered data
  const [isLoading, setIsLoading] = useState(false); // To handle loading state
  const [error, setError] = useState(null); // To handle errors

  const handleSearch = async () => {
    const trimmedQuery = searchQuery.trim().toLowerCase();
  
    if (!trimmedQuery) {
      console.log("Please enter a search query.");
      return;
    }
  
    setIsLoading(true); // Start loading
    setError(null); // Clear previous errors
  
    try {
      const response = await fetch(`https://bookmanagement-backend-qh1z.onrender.com/books?query=${encodeURIComponent(trimmedQuery)}`);
      const responseObj = await response.json();
      const { response: books } = responseObj;
  
      const filteredBooks = books.filter((book) => {
        const { title } = book;
        return title.toLowerCase().includes(trimmedQuery); // Match title only
      });
  
      setSearchResults(filteredBooks); // Store results
  
      if (filteredBooks.length === 0) {
        console.log("No books found matching the search query.");
      }
    } catch (error) {
      setError("Failed to fetch books. Please try again later."); // Set error message
      console.error("Error fetching books:", error);
    } finally {
      setIsLoading(false); // Stop loading
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
