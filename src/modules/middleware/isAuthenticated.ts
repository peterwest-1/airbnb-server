import { MyContext } from "../../types/MyContext";
import { MiddlewareFn } from "type-graphql";

export const isAuthenticated: MiddlewareFn<MyContext> = async ({ context }, next) => {
  if (!context.req.session!.userId) {
    throw new Error("Not Authenticated");
  }

  return next();
};
