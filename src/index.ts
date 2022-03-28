import { ApolloServer } from "apollo-server-express";
import cors from "cors";
import express from "express";
import session from "express-session";
import { graphqlUploadExpress } from "graphql-upload";
import { COOKIE_NAME, __prod__ } from "./constants";
import { dataSource } from "./data-source";
import { redis } from "./redis";
import { confirmEmail } from "./routes/confirmEmail";
import { createSchema } from "./utils/createSchema";

const main = async () => {
  await dataSource
    .initialize()
    .then(() => {
      console.log("🚀 Data Source has been initialized!");
    })
    .catch((err) => {
      console.error("Error during Data Source initialization", err);
    });

  const app = express();

  app.use(
    cors({
      credentials: true,
      origin: ["http://localhost:3000", "https://studio.apollographql.com"],
    })
  );

  const RedisStore = require("connect-redis")(session);

  app.use(
    session({
      store: new RedisStore({
        client: redis,
      }),
      name: COOKIE_NAME,
      secret: String(process.env.SESSION_SECRET),
      resave: false,
      saveUninitialized: false,
      cookie: {
        httpOnly: true,
        secure: __prod__,
        maxAge: 1000 * 60 * 60 * 24 * 365,
      },
    })
  );
  app.get("/confirm/:id", confirmEmail);
  const schema = await createSchema();

  const server = new ApolloServer({
    schema: schema,
    context: ({ req, res }) => ({ req, res, url: req.protocol + "://" + req.get("host") }),
    // plugins: [ApolloServerPluginLandingPageGraphQLPlayground],
  });

  await server.start();
  app.use(graphqlUploadExpress());
  server.applyMiddleware({ app });

  app.listen(4000, () => {
    console.log(`🚀 Server ready at http://localhost:4000${server.graphqlPath}`);
  });
};

main().catch((error) => {
  console.error(error);
});
