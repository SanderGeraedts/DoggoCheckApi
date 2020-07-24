import { ApolloServer, gql } from "apollo-server-express";
import express from "express";
import mongoose from "mongoose";
import jwt from "jsonwebtoken";
import { resolvers } from "./resolvers";
import { typeDefs } from "./typedefs";

require("dotenv").config();
const SECRET = process.env.PASSWORD_SECRET;
const PORT = process.env.PORT;

const startServer = async () => {
  const app = express();

  const addUser = async req => {
    const token = req.headers.authorization;

    if (token) {
      try {
        const { user } = await jwt.verify(token, SECRET);

        req.user = user;
      } catch (error) {
        console.log(error);
      }
    } else {
      req.user = null;
    }

    req.next();
  };

  app.use(addUser);

  const server = new ApolloServer({
    typeDefs,
    resolvers,
    context: ({ req }) => ({
      SECRET,
      user: req.user
    })
  });

  server.applyMiddleware({ app });

  await mongoose.connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  });

  app.listen({ port: PORT }, () => {
    console.log(
      `server ready at http://localhost:${PORT}${server.graphqlPath}`
    );
  });
};

startServer();
