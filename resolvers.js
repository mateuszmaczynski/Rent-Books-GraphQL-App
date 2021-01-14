const NodeRSA = require("node-rsa");
const key = new NodeRSA({ b: 512 });

const toDbId = (externalId) => key.decrypt(externalId, "utf8");
const toExternalId = (dbId) => key.encrypt(dbId, "base64");

const resolvers = {
  Query: {
    books: (rootValue, args, { db }) => db.getAllBooks(),
    authors: (rootValue, args, { db }) => db.getAllAuthors(),
    users: (rootValue, args, { db }) => db.getAllUsers(),
    book: (rootValue, { id }, { db }) => db.getBookById(toDbId(id)),
    author: (rootValue, { id }, { db }) => db.getAuthorById(toDbId(id)),
    user: (rootValue, { id }, { db }) => db.getUserById(toDbId(id))
  },
  Book: {
    id: book => toExternalId(book.id),
    author: (book, args, { db }) => db.getAuthorById(book.authorId),
    cover: book => ({
      path: book.coverPath
    }),
    title: book => book.title.toUpperCase()
  },
  Author: {
    id: author => toExternalId(author.id),
    books: (author, args, { db }) => author.bookIds.map(db.getBookById),
    photo: author => ({
      path: author.photoPath
    })
  },
  Avatar: {
    image: avatar => ({
      path: avatar.imagePath
    })
  },
  Image: {
    url: (image, args, { baseAssetsUrl }) => baseAssetsUrl + image.path
  },
  User: {
    id: user => toExternalId(user.id),
    email: user => user.email.toLowerCase(),
    reader: (user, args, { db }) => ({
      name: db.getRandomReader()
    })
  }
};

module.exports = resolvers;