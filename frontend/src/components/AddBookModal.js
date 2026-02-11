import { useState } from "react";
import axios from "axios";

function AddBookModal({ onClose, refresh }) {
  const [book, setBook] = useState({
    title: "",
    author: "",
    category: "Technology",
    availableCopies: "",
  });

  const handleChange = (e) => {
    setBook({ ...book, [e.target.name]: e.target.value });
  };

  const submitBook = async (e) => {
    e.preventDefault();
    await axios.post("http://localhost:5000/books", book);
    refresh();
    onClose();
  };

  return (
    <div className="modal-overlay">
      <div className="modal">
        <button className="close-btn" onClick={onClose}>✕</button>

        <h3>Add New Book</h3>
        <p className="subtitle">
          Fill in the details below to add a new book to the library catalog.
        </p>

        <form onSubmit={submitBook}>
          <label>Title *</label>
          <input name="title" placeholder="Enter book title" onChange={handleChange} required />

          <label>Author *</label>
          <input name="author" placeholder="Enter author name" onChange={handleChange} required />

          <label>Category *</label>
          <select name="category" value={book.category} onChange={handleChange}>
            <option>Technology</option>
            <option>Programming</option>
            <option>Science</option>
            <option>Fiction</option>
            <option>History</option>
            <option>Self Help</option>
            <option>Motivation</option>
            <option>Biography</option>
            <option>Science</option>
            <option>Classic</option>
            <option>Education</option>
            <option>Health</option>
          </select>

          <label>Available Copies *</label>
          <input
            name="availableCopies"
            type="number"
            placeholder="24"
            onChange={handleChange}
            required
          />

          <button className="submit-btn">Add to Library</button>
        </form>
      </div>
    </div>
  );
}

export default AddBookModal;