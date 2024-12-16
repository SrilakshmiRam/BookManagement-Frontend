import React, { useState } from 'react';
import './index.css';

const AddorEditBook = ({ initialData, onSubmit, isEditMode, setIsEditMode }) => {
  const [formData, setFormData] = useState({
    title: '',
    authorId: '',
    genreId: '',
    pages: '',
    publishedDate: '',
  });

  // Populate the form with initial data for editing
  React.useEffect(() => {
    if (isEditMode && initialData) {
      setFormData({
        title: initialData.title || '',
        authorId: initialData.authorId || '',
        genreId: initialData.genreId || '',
        pages: initialData.pages || '',
        publishedDate: initialData.publishedDate || '',
      });
    } else {
      setFormData({
        title: '',
        authorId: '',
        genreId: '',
        pages: '',
        publishedDate: '',
      });
    }
  }, [isEditMode, initialData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validation
    const { title, authorId, genreId, pages, publishedDate } = formData;
    if (!title || !authorId || !genreId || !pages || !publishedDate) {
      alert('All fields are required!');
      return;
    }

    if (isNaN(pages) || pages <= 0) {
      alert('Pages must be a positive number!');
      return;
    }

    try {
      const updatedData = {
        ...formData,
        author_id: parseInt(authorId, 10),
        genre_id: parseInt(genreId, 10),
      };

      await onSubmit(updatedData);
      alert('Book saved successfully!');
      setIsEditMode(false); // Reset to Add mode after submission
    } catch (error) {
      console.error('Error saving book:', error);
      alert('Failed to save the book. Please try again.');
    }
  };

  return (
    <form className="book-form" onSubmit={handleSubmit}>
      <h2>{isEditMode ? 'Edit Book' : 'Add Book'}</h2>

      <label>
        Title:
        <input
          type="text"
          name="title"
          value={formData.title}
          onChange={handleChange}
          required={!isEditMode} // 'required' only for Add Book
        />
      </label>
      <label>
        Author ID:
        <input
          type="number"
          name="authorId"
          value={formData.authorId}
          onChange={handleChange}
          required={!isEditMode} // 'required' only for Add Book
        />
      </label>
      <label>
        Genre ID:
        <input
          type="number"
          name="genreId"
          value={formData.genreId}
          onChange={handleChange}
          required={!isEditMode} // 'required' only for Add Book
        />
      </label>
      <label>
        Pages:
        <input
          type="number"
          name="pages"
          value={formData.pages}
          onChange={handleChange}
          required={!isEditMode} // 'required' only for Add Book
        />
      </label>
      <label>
        Published Date:
        <input
          type="date"
          name="publishedDate"
          value={formData.publishedDate}
          onChange={handleChange}
          required={!isEditMode} // 'required' only for Add Book
        />
      </label>

      <button type="submit">{isEditMode ? 'Update Book' : 'Add Book'}</button>
    </form>
  );
};

export default AddorEditBook;



