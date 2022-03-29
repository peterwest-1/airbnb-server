import { Field, ObjectType } from "type-graphql";
import { BaseEntity, Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@ObjectType()
@Entity()
export class Property extends BaseEntity {
  @Field(() => String)
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Field(() => String)
  @Column("uuid")
  creatorId: String;

  @Field(() => String)
  @Column()
  title: String;

  @Field({ description: "Price per night for the property" })
  @Column()
  price: number;

  @Field({ description: "number of guests this property can accepty" })
  @Column()
  guests: number;

  @Field({ description: "number of bedrooms for the property" })
  @Column()
  bedrooms: number;

  @Field({ description: "number of bathrooms for the property" })
  @Column()
  bathrooms: number;

  @Field()
  @CreateDateColumn()
  createdAt: Date;

  @Field()
  @UpdateDateColumn()
  updatedAt: Date;
}
