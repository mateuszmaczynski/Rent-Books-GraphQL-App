const resolvers = {
  Query: {
    books: (rootValue, args, { db }) => db.getAllBooks(),
    authors: (rootValue, args, { db }) => db.getAllAuthors(),
    users: (rootValue, args, { db }) => db.getAllUsers()
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
  Book: {
    title: book => book.title.toUpperCase(),
    author: (book, args, { db }) => db.getAuthorById(book.authorId),
    cover: book => ({
      path: book.coverPath
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
