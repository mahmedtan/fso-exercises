const { ApolloServer, AuthenticationError } = require("apollo-server");
const Mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const typeDefs = require("./typeDefs");
const resolvers = require("./resolvers");
const User = require("./models/User");
require("dotenv").config();

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

Mongoose.set("debug", true);

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: async ({ req }) => {
    try {
      const auth = req ? req.headers.authorization : null;
      if (auth && auth.toLowerCase().startsWith("bearer ")) {
        const decodedToken = jwt.verify(
          auth.substring(7),
          process.env.JWT_SECRET
        );
        const user = await User.findById(decodedToken.id);

        return { user };
      }
    } catch (error) {
      throw new AuthenticationError(error.message);
    }
  },
});

server.listen().then(({ url, subscriptionsUrl }) => {
  console.log(`Server ready at ${url}`);
  console.log(`Subscriptions ready at ${subscriptionsUrl}`);
});
