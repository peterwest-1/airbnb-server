import { User } from "../../entity/User";
import { Arg, Ctx, Mutation, Resolver } from "type-graphql";
import { ChangePasswordInput } from "./ChangePasswordInput";
import { redis } from "../../redis";
import { changePasswordPrefix } from "../../constants";
import argon2 from "argon2";
import { MyContext } from "../../types/MyContext";

@Resolver()
export class ChangePasswordResolver {
  @Mutation(() => User, { nullable: true })
  async changePassword(
    @Arg("data")
    { token, password }: ChangePasswordInput,
    @Ctx() context: MyContext
  ): Promise<User | null> {
    const userId = await redis.get(`${changePasswordPrefix}${token}`);
    if (!userId) {
      return null;
    }

    const user = await User.findOne({ where: { id: userId } });

    if (!user) {
      return null;
    }
    await redis.del(`${changePasswordPrefix}${token}`);

    const hash = await argon2.hash(password);
    user.password = hash;

    await user.save();

    context.req.session.userId = user.id;
    return user;
  }
}
