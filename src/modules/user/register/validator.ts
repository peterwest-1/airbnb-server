import { DUPLICATE_EMAIL, INVALID_EMAIL, PASSWORD_LENGTH } from "../../../modules/shared/Errors";
import { User } from "../../../entity/User";
import { AuthenticationInput } from "../AuthenticationInput";

//Probably not even necessary, can be implemented with TypeGraphQL
export const validateRegister = async (options: AuthenticationInput) => {
  await User.find({ where: { email: options.email } }).then((user) => {
    if (user) {
      return DUPLICATE_EMAIL;
    }
    return true;
  });

  if (!options.email.includes("@")) {
    return INVALID_EMAIL;
  }

  if (options.password.length <= 2) {
    return PASSWORD_LENGTH;
  }

  return null;
};
