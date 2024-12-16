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
    const trimmedQuery = searchQuery.trim();
  
    if (!trimmedQuery) {
      console.log("Please enter a search query.");
      return;
    }
  
    setIsLoading(true);
    setError(null);
  
    try {
      const options={
        method:'GET'
      }
      const responseStatus = await fetch(
        'https://bookmanagement-backend-qh1z.onrender.com/books',options
      );
  
      if (!responseStatus.ok) {
        throw new Error("Failed to fetch books.");
      }
  
      const booksResponse = await responseStatus.json();
      console.log(booksResponse)
      const {response}=booksResponse
      const updatedBooks=response.map(each=>({
        bookId:each.book_id,
        title:each.title,
        authorId:each.author_id,
        pages:each.pages,
        genreId:each.genre_id,
        publishedDate:each.published_date
      }))
  
      // Filter books on the frontend based on the search query
      const filteredBooks = updatedBooks.filter(book =>
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
