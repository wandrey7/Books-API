const Book = require("../models/book");
const { Op } = require("sequelize");
const { validationResult } = require("express-validator");

class BookController {
  async searchBookByID(req, res) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      const validationErrors = errors.array().map((err) => ({
        message: `Validation error': ${err.msg}`,
      }));
      return res.status(400).json({ errors: validationErrors });
    }

    const id = BigInt(req.params.id);
    const searchBook = await Book.findOne({
      where: { id: id },
      attributes: {
        exclude: ["createdAt", "updatedAt"],
      },
    });

    if (!searchBook) {
      return res.status(404).json({ error: "No book with this ID was found" });
    }
    res.send(searchBook);
  }

  async searchBookByParams(req, res) {
    const { author, title, genre, limit = 10, offset = 0 } = req.query;

    const filters = {};

    if (author) {
      filters.author = { [Op.like]: `%${author}%` };
    }
    if (title) {
      filters.title = { [Op.like]: `%${title}%` };
    }
    if (genre) {
      filters.genre = { [Op.like]: `%${genre}%` };
    }

    try {
      const books = await Book.findAll({
        where: filters,
        limit: parseInt(limit),
        offset: parseInt(offset),
        attributes: {
          exclude: ["createdAt", "updatedAt"],
        },
      });

      if (books.length === 0) {
        return res.status(404).json({ error: "No books found" });
      }

      return res.status(200).json({
        message: "Book Found",
        book: books,
      });
    } catch (error) {
      res.status(500).json({ error: "Error when searching for books" });
    }
  }

  async createBook(req, res) {
    let books = req.body;

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      const validationErrors = errors.array().map((err) => ({
        message: `Validation error': ${err.msg}`,
      }));
      return res.status(400).json({ errors: validationErrors });
    }
    try {
      const existingBooks = await Book.findAll({
        where: {
          [Op.or]: books.map((book) => {
            const conditions = [];
            if (book.isbn) {
              conditions.push({ isbn: book.isbn });
            }
            if (book.title) {
              conditions.push({ title: book.title });
            }
            return { [Op.or]: conditions };
          }),
        },
        attributes: {
          exclude: ["createdAt", "updatedAt"],
        },
      });

      const newBooks = [];
      const conflicts = [];

      for (const book of books) {
        const existingBook = existingBooks.find(
          (existingBook) =>
            existingBook.isbn === book.isbn || existingBook.title === book.title
        );

        if (existingBook) {
          conflicts.push({
            message: `There is already a book with ISBN '${book.isbn}' or title '${book.title}'`,
            book: existingBook,
          });
        } else {
          if ("id" in book) {
            delete book.id;
          }

          try {
            const newBook = await Book.create(book);
            newBooks.push(newBook);
          } catch (e) {
            return res.status(500).json({
              error: "Error creating, Check that the data is valid!",
            });
          }
        }
      }

      if (conflicts.length > 0) {
        return res.status(409).json({
          message: "Conflicts found!",
          conflicts: conflicts,
        });
      }

      res.status(200).json({
        message: "Successfully created books!",
        books: newBooks.map((book) => ({
          ...book.toJSON(),
          createdAt: undefined,
          updatedAt: undefined,
        })),
      });
    } catch (e) {
      res
        .status(500)
        .json({ error: "An error occurred while checking the books" });
    }
  }

  async updateBook(req, res) {
    const id = req.params.id;
    const bookData = req.body;

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      const validationErrors = errors.array().map((err) => ({
        message: `Validation error: ${err.msg}`,
      }));
      return res.status(400).json({ errors: validationErrors });
    }

    try {
      const findBook = await Book.findByPk(id, {
        attributes: {
          exclude: ["createdAt", "updatedAt"],
        },
      });

      if (!findBook) {
        return res.status(404).json({ error: "Book not found" });
      }

      if (bookData.title) findBook.title = bookData.title;
      if (bookData.author) findBook.author = bookData.author;
      if (bookData.genre) findBook.genre = bookData.genre;
      if (bookData.published_date)
        findBook.published_date = bookData.published_date;
      if (bookData.summary) findBook.summary = bookData.summary;
      if (bookData.isbn) findBook.isbn = bookData.isbn;

      await findBook.save();

      return res.status(201).json({
        message: "Updated book",
        book: findBook,
      });
    } catch (error) {
      return res
        .status(500)
        .json({ error: "Internal error when updating book." });
    }
  }

  async deleteBook(req, res) {
    const id = req.params.id;

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      const validationErrors = errors.array().map((err) => ({
        message: `Validation error': ${err.msg}`,
      }));
      return res.status(400).json({ errors: validationErrors });
    }

    try {
      const searchBook = await Book.findOne({
        where: { id: req.params.id },
        attributes: {
          exclude: ["createdAt", "updatedAt"],
        },
      });

      if (!searchBook) {
        return res.status(404).json({
          error: "No book with this ID was found",
        });
      }

      await Book.destroy({ where: { id: id } });

      res.status(200).json({
        message: `The book with the given id has been deleted`,
      });
    } catch (error) {
      res
        .status(500)
        .json({ error: "An error occurred when deleting the book" });
    }
  }
}

module.exports = new BookController();
