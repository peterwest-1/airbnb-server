import { MyContext } from "../../types/MyContext";
import { Ctx, Query, Resolver } from "type-graphql";
import { User } from "../../entity/User";

Resolver();
export class MeResolver {
  @Query(() => User, { nullable: true })
  me(@Ctx() { req }: MyContext) {
    if (!req.session.userId) {
      return null;
    }
    return User.findOne({ where: { id: req.session.userId } });
  }
}
