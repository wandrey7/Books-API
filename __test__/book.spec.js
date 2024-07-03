const app = require("../index");
const supertest = require("supertest");

const api = supertest(app);

const book = {
  title: "Memórias Póstumas de Brás Cubas",
  author: "Machado De Assis",
  genre: "Clássicos da literatura mundial",
  published_date: "2022/05/16",
  summary: "test summary",
};

describe("GET /api", () => {
  it("should return a status code of 200", async () => {
    const res = await api.get("/api/books");

    expect(res.status).toEqual(200);
  });
});

describe("GET /api/books/{id}", () => {
  it("Search for invalid ID", async () => {
    const createBook = await api.post("/api/books").send([book]);
    console.log(createBook.body);

    expect(createBook.statusCode).toEqual(200);
    expect(createBook.body).toHaveProperty(
      "message",
      "Successfully created books!"
    );
    expect(createBook.body).toHaveProperty("books");

    const bookId = createBook.body.books[0].id;

    const res = await api.get(`/api/books/${bookId}`);

    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty("title");
    expect(res.body).toHaveProperty("author");
    expect(res.body).toHaveProperty("genre");

    const deleteBook = await api.delete(`/api/books/${bookId}`);

    expect(deleteBook.statusCode).toEqual(200);
    expect(deleteBook.body).toHaveProperty(
      "message",
      "The book with the given id has been deleted"
    );

    // Check if it has really been deleted
    const afterDeletion = await api.delete(`/api/books/${bookId}`);

    expect(afterDeletion.statusCode).toEqual(404);
    expect(afterDeletion.body).toHaveProperty(
      "error",
      "No book with this ID was found"
    );
  });

  it("check invalid id", async () => {
    const res = await api.get("/api/books/9999");

    expect(res.statusCode).toEqual(404);
    expect(res.body).toHaveProperty("error", "No book with this ID was found");
  });
});

describe("POST /api/books", () => {
  it("Create a Book", async () => {
    const res = await api.post("/api/books").send([book]);
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty("message", "Successfully created books!");
    expect(res.body).toHaveProperty("books");

    const createdBooks = res.body.books;
    expect(createdBooks).toHaveLength(1);

    const createdBookId = createdBooks[0].id;

    const deleteResponse = await api.delete(`/api/books/${createdBookId}`);

    expect(deleteResponse.statusCode).toEqual(200);
    expect(deleteResponse.body).toHaveProperty(
      "message",
      `The book with the given id has been deleted`
    );

    const bookId = res.body.books[0].id;

    // Check if it has really been deleted
    const afterDeletion = await api.delete(`/api/books/${bookId}`);

    expect(afterDeletion.statusCode).toEqual(404);
    expect(afterDeletion.body).toHaveProperty(
      "error",
      "No book with this ID was found"
    );
  });

  it("should return an error when the book data is incomplete", async () => {
    const book = {};

    const res = await api.post("/api/books").send([book]);

    expect(res.status).toEqual(500);
  });
});

describe("GET /api/books/{params}", () => {
  it("Search book by params", async () => {
    const res = await api.post("/api/books").send([book]);

    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty("message", "Successfully created books!");
    expect(res.body).toHaveProperty("books");

    const titleParameters = await api
      .get("/api/books")
      .query(`title=${res.body.books[0].title}`);

    expect(titleParameters.statusCode).toEqual(200);
    expect(titleParameters.body.book).toHaveLength(1);
    expect(titleParameters.body).toHaveProperty("message", "Book Found");
    expect(titleParameters.body).toHaveProperty("book");

    // Checks that the search book is the same as the one sent previously
    expect(titleParameters.body.book[0].title).toEqual(book.title);
    expect(titleParameters.body.book[0].author).toEqual(book.author);
    expect(titleParameters.body.book[0].genre).toEqual(book.genre);

    const bookId = res.body.books[0].id;
    const delBook = await api.delete(`/api/books/${bookId}`);

    expect(delBook.statusCode).toEqual(200);
    expect(delBook.body).toHaveProperty(
      "message",
      "The book with the given id has been deleted"
    );

    // Check if it has really been deleted
    const afterDeletion = await api.delete(`/api/books/${bookId}`);

    expect(afterDeletion.statusCode).toEqual(404);
    expect(afterDeletion.body).toHaveProperty(
      "error",
      "No book with this ID was found"
    );
  });
});

describe("DEL /api/books/{id}", () => {
  it("Delete book by id", async () => {
    const createBook = await api.post("/api/books").send([book]);

    expect(createBook.statusCode).toEqual(200);
    expect(createBook.body).toHaveProperty(
      "message",
      "Successfully created books!"
    );
    expect(createBook.body).toHaveProperty("books");

    const bookId = createBook.body.books[0].id;
    const deleteBook = await api.delete(`/api/books/${bookId}`);

    expect(deleteBook.statusCode).toEqual(200);
    expect(deleteBook.body).toHaveProperty(
      "message",
      "The book with the given id has been deleted"
    );

    // Check if it has really been deleted
    const afterDeletion = await api.delete(`/api/books/${bookId}`);

    expect(afterDeletion.statusCode).toEqual(404);
    expect(afterDeletion.body).toHaveProperty(
      "error",
      "No book with this ID was found"
    );
  });
});

describe("PUT /api/books/", () => {
  it("Update books by id", async () => {
    const updatedBook = {
      title: "Updated Test Book",
      author: "Updated Test Author",
    };

    const createBook = await api.post("/api/books").send([book]);
    expect(createBook.statusCode).toEqual(200);
    expect(createBook.body).toHaveProperty(
      "message",
      "Successfully created books!"
    );
    expect(createBook.body).toHaveProperty("books");

    const bookId = createBook.body.books[0].id;

    const updateBook = await api.put(`/api/books/${bookId}`).send(updatedBook);
    expect(updateBook.statusCode).toEqual(201);
    expect(updateBook.body).toHaveProperty("message", "Updated book");
    expect(updateBook.body).toHaveProperty("book");

    const getAfterUpdated = await api.get(`/api/books/${bookId}`);
    expect(getAfterUpdated.statusCode).toEqual(200);
    expect(getAfterUpdated.body).toMatchObject(updatedBook);

    const deleteBook = await api.delete(`/api/books/${bookId}`);
    expect(deleteBook.statusCode).toEqual(200);
    expect(deleteBook.body).toHaveProperty(
      "message",
      "The book with the given id has been deleted"
    );

    const afterDeletion = await api.delete(`/api/books/${bookId}`);
    expect(afterDeletion.statusCode).toEqual(404);
    expect(afterDeletion.body).toHaveProperty(
      "error",
      "No book with this ID was found"
    );
  });
});
