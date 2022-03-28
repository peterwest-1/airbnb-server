import { ProvidedRequiredArgumentsRule } from "graphql";

export const changePasswordPrefix = "changePassword:";
export const confirmAccountPrefix = "confirmAccount:";

export const TOKEN_EXPIRY = 60 * 60 * 24;
export const COOKIE_NAME = "qid";

export const __prod__ = process.env.NODE_ENV === "production";
