import { useEffect, useState } from "react";
import axios from "axios";
import AddBookModal from "./components/AddBookModal";
import "./App.css";

function App() {
  const [books, setBooks] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("");

  const fetchBooks = async () => {
    const res = await axios.get("http://localhost:5000/books");
    setBooks(res.data);
  };

  useEffect(() => {
    fetchBooks();
  }, []);

  const filteredBooks = books.filter(
    (b) =>
      b.title.toLowerCase().includes(search.toLowerCase()) &&
      (category === "" || b.category === category)
  );

  const categories = [...new Set(books.map((b) => b.category))];

  return (
    <>
      <header className="header">
        <h1>Library Management System</h1>
        <p>Organize, search, and manage your book collection with ease.</p>
      </header>

      <div className="container">
        <div className="top-bar">
          <h2>Book Catalog</h2>
          <button className="add-btn" onClick={() => setShowModal(true)}>
            + Add Book
          </button>
        </div>

        <div className="filters">
          <input
            placeholder="Search books by title..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />

          <select value={category} onChange={(e) => setCategory(e.target.value)}>
            <option value="">Filter books by category</option>
            {categories.map((c, i) => (
              <option key={i}>{c}</option>
            ))}
          </select>
        </div>

        {filteredBooks.length === 0 ? (
          <div className="empty">
            <p>📖 Your library is empty</p>
            <span>Click “Add Book” to get started.</span>
          </div>
        ) : (
          <table>
            <thead>
              <tr>
                <th>Title</th>
                <th>Author</th>
                <th>Category</th>
                <th>Copies</th>
                <th>Created At</th>
              </tr>
            </thead>
       <tbody>
          {filteredBooks.map((b) => (
            <tr key={b._id}>
              <td>{b.title}</td>
              <td>{b.author}</td>
              <td>{b.category}</td>
              <td>{b.availableCopies}</td>
              <td>{new Date(b.createdAt).toLocaleDateString()}</td>
            </tr>
          ))}
        </tbody>


          </table>
        )}
      </div>

      {showModal && (
        <AddBookModal
          onClose={() => setShowModal(false)}
          refresh={fetchBooks}
        />
      )}
    </>
  );
}

export default App;