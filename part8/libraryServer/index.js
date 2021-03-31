const { ApolloServer, gql } = require("apollo-server");
const Mongoose = require("mongoose");
const { v4: uuid } = require("uuid");
const Author = require("./models/Author");
const Book = require("./models/Book");

Mongoose.connect(
  "mongodb+srv://dylan:Dkdc18cv!@cluster0.if8ur.mongodb.net/library?retryWrites=true&w=majority",
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false,
  }
)
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((err) => console.log(err));

const typeDefs = gql`
  type Book {
    title: String!
    published: Int!
    author: Author!
    id: String!
    genres: [String!]!
  }

  type Author {
    name: String!
    born: Int
    id: String!
    bookCount: Int!
  }

  type Query {
    bookCount: Int!
    authorCount: Int!
    allBooks(author: String, genre: String): [Book!]!
    allAuthors: [Author!]!
  }
  type Mutation {
    addBook(
      title: String!
      published: Int!
      author: String!
      genres: [String!]!
    ): Book!
    editAuthor(name: String!, setBornTo: Int!): Author
  }
`;

const resolvers = {
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
      console.log(books);

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
  },
  Mutation: {
    addBook: async (root, args) => {
      try {
        let author = await Author.findOne({ name: args.author });
        console.log(author);
        if (!author) {
          author = new Author({ name: args.author });
          await author.save();
        }
        const book = new Book({ ...args, author });

        console.log("hey", book);

        await book.save();
        return book;
      } catch (err) {
        console.log(err);
      }
    },
    editAuthor: async (root, args) => {
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
    },
  },
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

server.listen().then(({ url }) => {
  console.log(`Server ready at ${url}`);
});
