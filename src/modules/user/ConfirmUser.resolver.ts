import { Resolver, Mutation, Arg } from "type-graphql";

import { redis } from "../../redis";
import { User } from "../../entity/User";
import { confirmAccountPrefix } from "../../constants";

@Resolver()
export class ConfirmUserResolver {
  @Mutation(() => Boolean)
  async confirmUser(@Arg("token") token: string): Promise<boolean> {
    const userId = await redis.get(`${confirmAccountPrefix}${token}`);

    if (!userId) {
      return false;
    }

    await User.update({ id: userId }, { confirmed: true });
    await redis.del(`${confirmAccountPrefix}${token}`);

    return true;
  }
}
