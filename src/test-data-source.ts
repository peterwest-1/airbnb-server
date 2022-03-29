import "reflect-metadata";
import { User } from "./entity/User";

import { DataSource } from "typeorm";
import { Property } from "./entity/Property";

require("dotenv").config();

export const testDataSource = (drop: boolean = false) =>
  new DataSource({
    type: "postgres",
    host: "localhost",
    port: 5432,
    username: "postgres",
    password: process.env.DB_PASSWORD,
    database: "backend-boiler-test",
    synchronize: drop,
    dropSchema: drop,
    entities: [User, Property],
    migrations: [],
    subscribers: [],
  });
