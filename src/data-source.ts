import "reflect-metadata";
import { DataSource } from "typeorm";
import { __prod__ } from "./constants";
import { Property } from "./entity/Property";
import { User } from "./entity/User";
require("dotenv").config();

export const dataSource = new DataSource({
  type: "postgres",
  host: "localhost",
  port: 5432,
  username: "postgres",
  password: process.env.DB_PASSWORD,
  database: "airbnb",
  synchronize: !__prod__,
  logging: !__prod__,
  entities: [User, Property],
  migrations: [],
  subscribers: [],
});
