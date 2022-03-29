import { InputType, Field } from "type-graphql";

@InputType()
export class PropertyInput {
  @Field(() => String)
  title: String;

  @Field({ description: "Price per night for the property" })
  price: number;

  @Field({ description: "number of guests this property can accepty" })
  guests: number;

  @Field({ description: "number of bedrooms for the property" })
  bedrooms: number;

  @Field({ description: "number of bathrooms for the property" })
  bathrooms: number;
}
