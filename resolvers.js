const db = require("./db");

const resolvers = {
  Author: {
    books: parent => parent.bookIds.map(db.getBookById)
  },
  Book: {
    title: parent => parent.title.toUpperCase(),
    author: parent => db.getAuthorById(parent.authorId)
  },
  User: {
    email: parent => parent.email.toLowerCase(),
    randomNameUser: () => db.getRandomUser().toUpperCase()
  }
};

module.exports = resolvers;
