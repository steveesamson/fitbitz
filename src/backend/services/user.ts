import knex from "knex";
const returnList = ["time", "weight"];

export interface User {
  id: number;
  fullname: string;
  email: string;
  password: string;
}

const createUserService = (db: knex<any, any>) => {
  return {
    create(options: User) {
      return db<User>("users").insert(options, ["id"]);
    },
    getByLogin(options: any) {
      return db<User>("users").where(options);
    },
    getAll(options: any = {}) {
      return db<User>("users").where(options);
    },
    destroy(id: number) {
      return db<User>("users")
        .where("id", id)
        .del();
    }
  };
};

export { createUserService };
