const data = {
  author: [
    { id: 1, name: "Arham Chowdhry", booksIds: [100, 301] },
    { id: 2, name: "Bilal", booksIds: [201, 101, 301] },
    { id: 3, name: "Mustafa ", books: [401] },
    { id: 4, name: "Anas", books: [301, 501] },
    { id: 5, name: "Faizan", books: [301, 501] },
  ],
  books: [
    { id: 101, title: "Frontend Developement", publishYear: 2017, authorID: 1 },
    {
      id: 201,
      title: "Backend Developement",
      publishYear: 2016,
      authorID: 2,
    },
    {
      id: 301,
      title: "Gyming",
      publishYear: 2014,
      authorID: 4,
    },
    {
      id: 401,
      title: "SAP",
      publishYear: 2000,
      authorID: 3,
    },
    {
      id: 501,
      title: "Backend Development",
      publishYear: 2018,
      authorID: 5,
    },
  ],
};

// Resolvers define how to fetch the types defined in your schema.
// This resolver retrieves books from the "books" array above.
export const resolvers = {
  Query: {
    authors: () => data.author,
    books: () => data.books,
  },
};
