const decodeBase64 = base64String =>
  Buffer.from(base64String, "base64").toString();
const encodeBase64 = rawString => Buffer.from(rawString).toString("base64");

const toExternalId = (dbId, type) => encodeBase64(`${type}-${dbId}`);
const toTypeAndDbId = externalId => decodeBase64(externalId).split("-", 2);
const toDbId = externalId => toTypeAndDbId(externalId)[1];

const getAnythingByExternalId = (externalId, db) => {
  const [type, dbId] = toTypeAndDbId(externalId);

  switch (type) {
    case "Book": {
      return db.getBookById(dbId);
    }
    case "Author": {
      return db.getAuthorById(dbId);
    }
    case "User": {
      return db.getUserById(dbId);
    }
    default:
      return null;
  }
};

const resolvers = {
  Query: {
    books: (rootValue, { searchQuery }, { db, search }) =>
      searchQuery.length > 0 ? search.findBooks(searchQuery) : db.getAllBooks(),
    authors: (rootValue, { searchQuery }, { db, search }) =>
      searchQuery.length > 0 ? search.findAuthors(searchQuery) : db.getAllAuthors(),
    users: (rootValue, { searchQuery }, { db, search }) =>
      searchQuery.length > 0 ? search.findUsers(searchQuery) : db.getAllUsers(),
    book: (rootValue, { id }, { db }) => db.getBookById(toDbId(id)),
    author: (rootValue, { id }, { db }) => db.getAuthorById(toDbId(id)),
    user: (rootValue, { id }, { db }) => db.getUserById(toDbId(id)),
    anything: (rootValue, { id }, { db }) => getAnythingByExternalId(id, db)
  },
  Book: {
    id: book => toExternalId(book.id, "Book"),
    author: (book, args, { db }) => db.getAuthorById(book.authorId),
    cover: book => ({
      path: book.coverPath
    })
  },
  Author: {
    id: author => toExternalId(author.id, "Author"),
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
    id: user => toExternalId(user.id, "User"),
    reader: (user, args, { db }) => ({
      name: db.getRandomReader()
    })
  },
  Anything: {
    __resolveType: anything => {
      if (anything.title) {
        return "Book";
      }
      if (anything.bio) {
        return "Author";
      }
      if (anything.info) {
        return "User";
      }
      return null;
    }
  }
};

module.exports = resolvers;
