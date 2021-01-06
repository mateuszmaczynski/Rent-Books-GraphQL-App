const db = require("./db");
const BASE_ASSETS_URL = "http://examples.devmastery.pl/assets";

const resolvers = {
  Author: {
    books: parent => parent.bookIds.map(db.getBookById),
    photo: parent => ({
      path: parent.photoPath
    })
  },
  Avatar: {
    image: parent => ({
      path: parent.imagePath
    })
  },
  Book: {
    title: parent => parent.title.toUpperCase(),
    author: parent => db.getAuthorById(parent.authorId),
    cover: parent => ({
      path: parent.coverPath
    })
  },
  Image: {
    url: parent => BASE_ASSETS_URL + parent.path
  },
  User: {
    email: parent => parent.email.toLowerCase(),
    randomNameUser: () => db.getRandomUser().toUpperCase()
  }
};

module.exports = resolvers;
