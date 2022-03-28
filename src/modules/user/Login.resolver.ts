import argon2 from "argon2";
import { Arg, Ctx, Mutation, Resolver } from "type-graphql";
import { User } from "../../entity/User";
import { MyContext } from "../../types/MyContext";
import { AuthenticationInput } from "./AuthenticationInput";
import { UserResponse } from "./UserResponse";

@Resolver()
export class LoginResolver {
  @Mutation(() => UserResponse, { nullable: true })
  async login(@Arg("data") { email, password }: AuthenticationInput, @Ctx() context: MyContext): Promise<UserResponse> {
    const user = await User.findOne({ where: { email } });

    if (!user) {
      return {
        errors: [{ field: "email", message: "email does not exist" }],
      };
    }

    const valid = await argon2.verify(user.password, password);

    if (!valid) {
      return {
        errors: [{ field: "password", message: "password does not match" }],
      };
    }

    if (!user.confirmed) {
      return {
        errors: [{ field: "account", message: "account not verified" }],
      };
    }

    context.req.session.userId = user.id;

    return { user };
  }
}
