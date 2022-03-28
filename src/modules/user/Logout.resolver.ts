import { COOKIE_NAME } from "../../constants";
import { Ctx, Mutation, Resolver } from "type-graphql";
import { MyContext } from "src/types/MyContext";

@Resolver()
export class LogoutResolver {
  @Mutation(() => Boolean)
  logout(@Ctx() { req, res }: MyContext) {
    return new Promise((resolve, reject) =>
      req.session.destroy((err) => {
        res.clearCookie(COOKIE_NAME);
        if (err) {
          reject(false);
          return;
        }

        resolve(true);
      })
    );
  }
}
