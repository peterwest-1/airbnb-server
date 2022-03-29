import { User } from "../../entity/User";
import { ObjectType, Field } from "type-graphql";
import { FieldError } from "../FieldError";
import { Property } from "../../entity/Property";

@ObjectType()
export class PropertyResponse {
  @Field(() => [FieldError], { nullable: true })
  errors?: FieldError[];

  @Field(() => Property, { nullable: true })
  property?: Property;
}
