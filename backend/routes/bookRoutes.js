const express = require("express");
const router = express.Router();
const Book = require("../models/Book");

// POST /books
router.post("/", async (req, res) => {
  try {
    const book = new Book({
      title: req.body.title,
      author: req.body.author,
      category: req.body.category,
      availableCopies: Number(req.body.availableCopies) // 🔥 FIX
    });

    await book.save();
    res.json(book);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
});


// GET /books
router.get("/", async (req, res) => {
  const books = await Book.find();
  res.json(books);
});

module.exports = router;
