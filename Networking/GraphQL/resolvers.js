const data = {
  author: [
    { id: "1", name: "Arham Chowdhry", booksIds: ["101", "301"] },
    { id: "2", name: "Bilal", booksIds: ["101", "201", "301"] },
    { id: "3", name: "Mustafa ", booksIds: ["401"] },
    { id: "4", name: "Anas", booksIds: ["301", "501"] },
    { id: "5", name: "Faizan", booksIds: ["201", "301"] },
  ],
  books: [
    {
      id: "101",
      title: "Frontend Developement",
      publishYear: 2017,
      authorID: "1",
    },
    {
      id: "201",
      title: "Backend Developement",
      publishYear: 2016,
      authorID: "2",
    },
    {
      id: "301",
      title: "Gyming",
      publishYear: 2014,
      authorID: "4",
    },
    {
      id: "401",
      title: "SAP",
      publishYear: 2000,
      authorID: "3",
    },
    {
      id: "501",
      title: "Accountant",
      publishYear: 2018,
      authorID: "5",
    },
  ],
};

// Resolvers define how to fetch the types defined in your schema.
// This resolver retrieves books from the "books" array above.
export const resolvers = {
  Book: {
    author: (parent, args, context, info) => {
      console.log(parent, "--parent");
      return data.author.find((authorDetails) => {
        return authorDetails.id === parent.authorID;
      });
    },
  },

  Author: {
    books: (parent, args, context, info) => {
      return data.books.filter((book) => parent.booksIds.includes(book.id));
    },
  },

  Query: {
    authors: () => data.author,
    books: () => data.books,
  },

  Mutation: {
    addBooks: (parent, args, context, info) => {
      let newBook = { id: data.books.length + 1 + "", ...args };
      data.books.push(newBook);
      console.log(data.books);
      return newBook;
    },
  },
};
