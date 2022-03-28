import { IsEmail } from "class-validator";
import { Field, InputType } from "type-graphql";
import { PasswordInput } from "./PasswordInput";
import { IsEmailAlreadyExist } from "./register/isEmailAlreadyExists";

@InputType()
export class AuthenticationInput extends PasswordInput {
  @Field()
  @IsEmail()
  @IsEmailAlreadyExist({ message: "email already in use" })
  email: string;
}
