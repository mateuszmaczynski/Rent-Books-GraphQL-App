const db = require("./db");

console.log("A book", db.getBookById(2));
console.log("A book", db.getAllBooks());

const rootValue = () => {
  return {
    authors: db.getAllAuthors(),
    books: db.getAllBooks(),
    users: db.getAllUsers()
  };
};

module.exports = rootValue;
