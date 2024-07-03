const { Router } = require("express");
const BookController = require("../controllers/BookController");
const { validateId, validateBooks } = require("../validations/validations");
const router = new Router();

router.get("/books/:id", validateId, BookController.searchBookByID);
router.get("/books/", BookController.searchBookByParams);

router.post("/books/", validateBooks, BookController.createBook);

router.put("/books/:id", validateId, BookController.updateBook);

router.delete("/books/:id", validateId, BookController.deleteBook);

module.exports = router;
