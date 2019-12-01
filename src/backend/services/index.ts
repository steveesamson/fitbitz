import knex from "knex";
import { createMeasurementService } from "./measurement";
import { createUserService } from "./user";
const { DB_HOST, DB_USER, DB_PASS, DB_NAME } = process.env;

// console.log("ALL", DB_HOST, DB_USER, DB_PASS, DB_NAME);

export const db = knex({
  client: "pg",
  connection: {
    host: DB_HOST,
    user: DB_USER,
    password: DB_PASS,
    database: DB_NAME
  },
  pool: { min: 0, max: 7 }
});

const measurementService = createMeasurementService(db);
const userService = createUserService(db);
export { measurementService, userService };
