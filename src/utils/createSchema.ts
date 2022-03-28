import { buildSchema } from "type-graphql";

export const createSchema = () =>
  buildSchema({
    resolvers: [__dirname + "/../modules/**/*.resolver.ts"],
    authChecker: ({ context: { req } }, _) => {
      return !!req.session.userId; // or false if access is denied
    },
    validate: false,
  });
