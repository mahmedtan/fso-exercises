const { UserInputError, AuthenticationError } = require("apollo-server-errors");
const Author = require("./models/Author");
const Book = require("./models/Book");
const User = require("./models/User");
const jwt = require("jsonwebtoken");
const { PubSub } = require("apollo-server");
const pubsub = new PubSub();
require("dotenv").config();

module.exports = {
  Query: {
    bookCount: async () => {
      const books = await Book.find({});
      return books.length;
    },
    authorCount: async () => {
      const authors = await Author.find({});
      return authors.length;
    },
    allBooks: async (root, args) => {
      const books = await Book.find({}).populate("author");
      return args.author && args.genre
        ? books.filter(
            (book) =>
              book.author === args.author && book.genres.indexOf(args.genre)
          )
        : args.author
        ? books.filter((book) => book.author === args.author)
        : args.genre
        ? books.filter((book) => book.genres.indexOf(args.genre) >= 0)
        : books;
    },
    allAuthors: async () => {
      const authors = await Author.find({});
      const books = await Book.find({}).populate("author");

      return authors.map((author) => ({
        name: author.name,
        born: author.born,
        id: author._id,
        bookCount: books.reduce(
          (previous, current) =>
            current.author.name === author.name ? previous + 1 : previous,
          0
        ),
      }));
    },
    me: (root, args, { user }) => {
      return user;
    },
  },
  Mutation: {
    addBook: async (root, args, { user }) => {
      try {
        if (!user) throw new AuthenticationError("Invalid Token");

        let author = await Author.findOne({ name: args.author });
        if (!author) {
          author = new Author({ name: args.author });
          await author.save();
        }
        const book = new Book({ ...args, author });

        await book.save();
        pubsub.publish("ADDED_BOOK", { bookAdded: book });
        pubsub.publish("ADDED_AUTHOR", { authorAdded: author });
        return book;
      } catch (err) {
        throw new UserInputError(err.message, {
          invalidArgs: args,
        });
      }
    },
    editAuthor: async (root, args, { user }) => {
      try {
        if (!user) throw new AuthenticationError("Invalid Token");

        const author = await Author.findOneAndUpdate(
          { name: args.name },
          { born: args.setBornTo },
          { new: true }
        );

        const books = await Book.find({}).populate("author");

        return (
          author && {
            name: author.name,
            born: author.born,
            id: author._id,
            bookCount: books.reduce(
              (previous, current) =>
                current.author.name === author.name ? previous + 1 : previous,
              0
            ),
          }
        );
      } catch (err) {
        throw new UserInputError(err.message, { invalidArgs: args });
      }
    },
    createUser: async (root, args) => {
      try {
        const { username, favoriteGenre } = args;
        const user = new User({ username, favoriteGenre });
        await user.save();
        return user;
      } catch (error) {
        throw new UserInputError(error.message, { invalidArgs: args });
      }
    },
    login: async (root, args) => {
      try {
        const user = await User.findOne({ username: args.username });
        if (!user || args.password !== "secret")
          throw new AuthenticationError("Bad username or password");
        const token = jwt.sign(
          { username: user.username, id: user._id },
          process.env.JWT_SECRET
        );

        return { value: token };
      } catch (err) {
        throw new UserInputError(err.message, { invalidArgs: args });
      }
    },
  },
  Subscription: {
    bookAdded: {
      subscribe: () => pubsub.asyncIterator(["ADDED_BOOK"]),
    },
    authorAdded: {
      subscribe: () => pubsub.asyncIterator(["ADDED_AUTHOR"]),
    },
  },
};
