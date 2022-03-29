import { Property } from "../../entity/Property";
import { MyContext } from "../../types/MyContext";
import { Arg, Ctx, Field, InputType, Mutation, Query, Resolver, UseMiddleware } from "type-graphql";
import { isAuthenticated } from "../middleware/isAuthenticated";
import { PropertyInput } from "./PropertyInput";
import { PropertyResponse } from "./PropertyResponse";

@Resolver(Property)
export class PropertyResolver {
  @Query(() => [Property])
  async properties() {
    const properties = await Property.find({});
    return properties.slice(0, 5);
  }

  @Query(() => Property, { nullable: true })
  property(@Arg("id", () => String) id: string): Promise<Property | null> {
    return Property.findOneBy({ id });
  }

  @Mutation(() => PropertyResponse)
  @UseMiddleware(isAuthenticated)
  async createProperty(@Arg("data") data: PropertyInput, @Ctx() { req }: MyContext) {
    const property = await Property.create({
      ...data,
      creatorId: req.session.userId,
    }).save();

    return { property };
  }

  @Mutation(() => PropertyResponse)
  @UseMiddleware(isAuthenticated)
  async updateProperty(
    @Arg("id", () => String) id: string,
    @Arg("data") { title, price, guests, bedrooms, bathrooms }: PropertyInput
  ) {
    const property = await Property.findOneBy({ id });
    if (!property) {
      return {
        errors: [{ field: "account", message: "account not verified" }],
      };
    }
    property!.title = title;
    property!.price = price;
    property!.guests = guests;
    property!.bedrooms = bedrooms;
    property!.bathrooms = bathrooms;

    await property!.save();

    return { property };
  }

  @Mutation(() => Boolean)
  @UseMiddleware(isAuthenticated)
  async removeProperty(@Arg("id", () => String) id: String): Promise<Boolean> {
    //TODO - Confirm that this returns correct results
    await Property.delete(id as any);
    return true;
  }
}
