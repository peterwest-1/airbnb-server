import { User } from "../../entity/User";
import { Arg, Ctx, Mutation, Resolver } from "type-graphql";
import { createChangePasswordLink } from "./createChangePasswordLink";
import { MyContext } from "../../types/MyContext";
import { changePasswordPrefix } from "../../constants";
import { redis } from "../../redis";
import { v4 } from "uuid";
import { sendEmail } from "./sendEmail";

@Resolver()
export class ForgotPasswordResolver {
  @Mutation(() => Boolean)
  async forgotPassword(@Arg("email") email: string): Promise<boolean> {
    const user = await User.findOne({ where: { email } });
    if (!user) {
      return true;
    }

    const token = v4();
    await redis.set(`${changePasswordPrefix}${token}`, user.id, "ex", 60 * 60 * 24);
    //Change this to use front end url
    await sendEmail(email, `http://localhost:3000/user/change-password/${token}`);

    return true;
  }
}
