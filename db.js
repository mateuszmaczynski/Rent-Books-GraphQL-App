const data = {
  books: [
    {
      title: "Harry Potter and the Sorcerer's Stone",
      cover: {
        url:
          "http://examples.devmastery.pl/assets/images/book-covers/harry1.jpg"
      }
    },
    {
      title: "Harry Potter and the Chamber of Secrets",
      cover: {
        url:
          "http://examples.devmastery.pl/assets/images/book-covers/harry2.jpg"
      }
    },
    {
      title: "Harry Potter and the Prisoner of Azkaban",
      cover: {
        url:
          "http://examples.devmastery.pl/assets/images/book-covers/harry3.jpg"
      }
    },
    {
      title: "Harry Potter and the Goblet of Fire",
      cover: {
        url:
          "http://examples.devmastery.pl/assets/images/book-covers/harry4.jpg"
      }
    },
    {
      title: "Harry Potter and the Order of the Phoenix",
      cover: {
        url:
          "http://examples.devmastery.pl/assets/images/book-covers/harry5.jpg"
      }
    },
    {
      title: "Harry Potter and the Half-Blood Prince",
      cover: {
        url:
          "http://examples.devmastery.pl/assets/images/book-covers/harry6.jpg"
      }
    },
    {
      title: "Harry Potter and the Deathly Hallows",
      cover: {
        url:
          "http://examples.devmastery.pl/assets/images/book-covers/harry7.jpg"
      }
    },
    {
      title: "Leviathan Wakes",
      cover: {
        url:
          "http://examples.devmastery.pl/assets/images/book-covers/expanse1.jpg"
      }
    },
    {
      title: "Caliban's War",
      cover: {
        url:
          "http://examples.devmastery.pl/assets/images/book-covers/expanse2.jpg"
      }
    },
    {
      title: "Abaddon's Gate",
      cover: {
        url:
          "http://examples.devmastery.pl/assets/images/book-covers/expanse3.jpg"
      }
    },
    {
      title: "Cibola Burn",
      cover: {
        url:
          "http://examples.devmastery.pl/assets/images/book-covers/expanse4.jpg"
      }
    },
    {
      title: "Nemesis Games",
      cover: {
        url:
          "http://examples.devmastery.pl/assets/images/book-covers/expanse5.jpg"
      }
    },
    {
      title: "Babylon's Ashes",
      cover: {
        url:
          "http://examples.devmastery.pl/assets/images/book-covers/expanse6.jpg"
      }
    },
    {
      title: "Persepolis Rising",
      cover: {
        url:
          "http://examples.devmastery.pl/assets/images/book-covers/expanse7.jpg"
      }
    },
    {
      title: "Tiamat's Wrath",
      cover: {
        url:
          "http://examples.devmastery.pl/assets/images/book-covers/expanse8.jpg"
      }
    },
    {
      title: "Blood of Elves",
      cover: {
        url:
          "http://examples.devmastery.pl/assets/images/book-covers/witcher1.jpg"
      }
    },
    {
      title: "Time of contempt",
      cover: {
        url:
          "http://examples.devmastery.pl/assets/images/book-covers/witcher2.jpg"
      }
    },
    {
      title: "Baptism of fire",
      cover: {
        url:
          "http://examples.devmastery.pl/assets/images/book-covers/witcher3.jpg"
      }
    },
    {
      title: "The tower of the swallow",
      cover: {
        url:
          "http://examples.devmastery.pl/assets/images/book-covers/witcher4.jpg"
      }
    },
    {
      title: "The lady of the lake",
      cover: {
        url:
          "http://examples.devmastery.pl/assets/images/book-covers/witcher5.jpg"
      }
    }
  ],
  authors: [
    {
      name: "J. K. Rowling",
      photo: {
        url:
          "http://examples.devmastery.pl/assets/images/book-authors/j-k-rowling.jpg"
      }
    },
    {
      name: "James S. A. Corey",
      photo: {
        url:
          "http://examples.devmastery.pl/assets/images/book-authors/james-s-a-corey.jpg"
      }
    },
    {
      name: "Andrzej Sapkowski",
      photo: {
        url:
          "http://examples.devmastery.pl/assets/images/book-authors/andrzej-sapkowski.jpg"
      }
    }
  ],
  users: [
    {
      name: "Alice Keys",
      email: "alice@example.com",
      avatar: {
        image: {
          url: "http://examples.devmastery.pl/assets/images/avatars/w13.png"
        },
        color: "yellow"
      }
    },
    {
      name: "Bob Dylan",
      email: "bob@example.com",
      avatar: {
        image: {
          url: "http://examples.devmastery.pl/assets/images/avatars/m10.png"
        },
        color: "green"
      }
    },
    {
      name: "Celine Dion",
      email: "celine@example.com",
      avatar: {
        image: {
          url: "http://examples.devmastery.pl/assets/images/avatars/w2.png"
        },
        color: "red"
      }
    },
    {
      name: "Dan Abramov",
      email: "DAN@example.com",
      avatar: {
        image: {
          url: "http://examples.devmastery.pl/assets/images/avatars/m25.png"
        },
        color: "blue"
      }
    }
  ],
  bookIdsByAuthorId: {
    1: [1, 2, 3, 4, 5, 6, 7],
    2: [8, 9, 10, 11, 12, 13, 14],
    3: [15, 16, 17, 18, 19, 20]
  }
};

const getAuthorIdByBookId = bookId => (
  parseInt(
    Object.entries(data.bookIdsByAuthorId).find(([authorId, bookIds]) =>
      bookIds.includes(bookId)
    )[0], 10
  )
);

const getAuthorById = id => ({
  ...data.authors[id - 1],
  id,
  bookIds: data.bookIdsByAuthorId[id]
});

const getBookById = id => ({
  ...data.books[id - 1],
  id,
  authorId: getAuthorIdByBookId(id)
});

const getUserById = id => ({
  ...data.users[id - 1],
  id
});

const getAllAuthors = () => data.authors.map((author, index) => getAuthorById(index + 1));
const getAllBooks = () => data.books.map((book, index) => getBookById(index + 1));
const getAllUsers = () => data.users.map((user, index) => getUserById(index + 1));

const getRandomUser = () => data.users[Math.floor(Math.random() * 3)].name;

const db = {
  getAuthorById,
  getBookById,
  getUserById,
  getAllAuthors,
  getAllBooks,
  getAllUsers,
  getRandomUser
};

module.exports = db;
