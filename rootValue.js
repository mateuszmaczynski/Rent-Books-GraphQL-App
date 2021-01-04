const db = require("./db");

const book = db.getBookById(2);
console.log("Book #2", book);
const author = db.getAuthorById(book.authorId);
console.log("Author of that book", author);
const books = author.bookIds.map(bookId => db.getBookById(bookId));
console.log("Books by that author", books);

const rootValue = () => {
  return {
    authors: db.getAllAuthors(),
    books: db.getAllBooks(),
    users: db.getAllUsers()
  };
};

module.exports = rootValue;
