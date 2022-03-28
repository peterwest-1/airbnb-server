import { dataSource } from "../../data-source";
import { User } from "../../entity/User";
import { AuthenticationInput } from "./AuthenticationInput";
import { validateRegister } from "./register/validator";
import { Arg, Ctx, Mutation, Resolver } from "type-graphql";
import { UserResponse } from "./UserResponse";
import argon2 from "argon2";
import { MyContext } from "../../types/MyContext";
import { sendEmail } from "./sendEmail";
import { createConfirmationLink } from "./createConfirmationLink";

@Resolver()
export class RegisterResolver {
  @Mutation(() => UserResponse)
  async register(@Arg("data") data: AuthenticationInput, @Ctx() context: MyContext): Promise<UserResponse> {
    const errors = await validateRegister(data);
    if (errors) {
      return { errors };
    }
    const hash = await argon2.hash(data.password);
    let user;
    try {
      user = await User.create({
        email: data.email,
        password: hash,
      }).save();
    } catch (error) {
      if (error.code == "23505" || error.detail.includes("already exists")) {
        return {
          errors: [
            {
              field: "email",
              message: "email already taken",
            },
          ],
        };
      }
    }
    await sendEmail(data.email, await createConfirmationLink(context.url, user?.id as string));

    return { user };
  }
}
