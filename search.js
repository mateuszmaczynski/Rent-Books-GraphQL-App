const lunr = require("lunr");

function initAuthorsIndex(db) {
  return lunr(function() {
    this.ref("id");
    this.field("name");
    this.field("bio");
    db.getAllAuthors().forEach(function(author) {
      this.add(author);
    }, this);
  });
}

function initBooksIndex(db) {
  return lunr(function() {
    this.ref("id");
    this.field("title", { boost: 10 });
    this.field("description");
    db.getAllBooks().forEach(function(book) {
      this.add(book);
    }, this);
  });
}

function initUsersIndex(db) {
  return lunr(function() {
    this.ref("id");
    this.field("name");
    this.field("info");
    db.getAllUsers().forEach(function(user) {
      this.add(user);
    }, this);
  });
}

class Search {
  constructor(db) {
    this.db = db;
    this.authorsIndex = initAuthorsIndex(this.db);
    this.booksIndex = initBooksIndex(this.db);
    this.usersIndex = initUsersIndex(this.db);
  }

  findBooks(searchQuery) {
    const results = this.booksIndex.search(searchQuery);
    const foundIds = results.map(result => result.ref);
    return foundIds.map(this.db.getBookById);
  }

  findAuthors(searchQuery){
    const results = this.authorsIndex.search(searchQuery);
    const foundIds = results.map(result => result.ref);
    return foundIds.map(this.db.getAuthorById);
  }

  findUsers(searchQuery){
    const results = this.usersIndex.search(searchQuery);
    const foundIds = results.map(result => result.ref);
    return foundIds.map(this.db.getUserById);
  }
}

module.exports = {
  Search
};
