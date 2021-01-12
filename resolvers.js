const resolvers = {
  Query: {
    books: (rootValue, args, { db }) => db.getAllBooks(),
    authors: (rootValue, args, { db }) => db.getAllAuthors(),
    users: (rootValue, args, { db }) => db.getAllUsers(),
    book: (rootValue, { id }, { db }) => db.getBookById(id),
    author: (rootValue, { id }, { db }) => db.getAuthorById(id),
    user: (rootValue, { id }, { db }) => db.getUserById(id)
  },
  Book: {
    author: (book, args, { db }) => db.getAuthorById(book.authorId),
    cover: book => ({
      path: book.coverPath
    }),
    title: book => book.title.toUpperCase()
  },
  Author: {
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
    email: user => user.email.toLowerCase(),
    reader: (user, args, { db }) => ({
      name: db.getRandomReader()
    })
  }
};

module.exports = resolvers;