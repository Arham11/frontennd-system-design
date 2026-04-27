// Original data
const blogPostsFromBE = [
  {
    id: 1,
    title: "Hello World",
    author: { id: 1, name: "John Doe" },
    comments: [
      { id: 1, text: "Great post!" },
      { id: 2, text: "Thanks for the info." },
    ],
  },
  {
    id: 2,
    title: "Data Normalization",
    author: { id: 2, name: "Jane Smith" },
    comments: [{ id: 3, text: "Very helpful post." }],
  },
];

const normalisedData = {
  post: {
    1: { id: 1, title: "Hello World", author: 1, comments: [1, 2] },
    2: { id: 2, title: "Data Normalization", author: 2, comments: [3] },
  },
  author: {
    1: { id: 1, name: "John Doe" },
    2: { id: 2, name: "Jane Smith" },
  },
  comments: {
    1: { id: 1, text: "Great post!" },
    2: { id: 2, text: "Thanks for the info." },
    3: { id: 3, text: "Very helpful post." },
  },
};

// Accessing a post, its author, and comments
const post = normalizedData.posts[1];
const author = normalizedData.authors[post.authorId];
const comments = post.comments.map(
  (commentId) => normalizedData.comments[commentId],
);

console.log(post, author, comments);
