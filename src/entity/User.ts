import { Field, ObjectType } from "type-graphql";
import { BaseEntity, Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@ObjectType()
@Entity()
export class User extends BaseEntity {
  @Field(() => String)
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Field(() => String)
  @Column("varchar", { length: 255, unique: true })
  email: string;

  @Field(() => String, { nullable: true })
  @Column("varchar", { length: 255, unique: true, nullable: true })
  username: string;

  //Field exposes to GraphQL, don't want to expose password
  @Column("text")
  password: string;

  @Field(() => Boolean, { description: "True if user has activated/confirmed their account" })
  @Column("bool", { default: false })
  confirmed: boolean;

  @Field()
  @CreateDateColumn()
  createdAt: Date;

  @Field()
  @UpdateDateColumn()
  updatedAt: Date;
}
