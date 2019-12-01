import knex from "knex";
const returnList = ["time", "weight"];

export interface Measurement {
  id: number;
  userid: number;
  weight: number;
  time: string;
}
const createMeasurementService = (db: knex<any, any>) => {
  return {
    create(options: Measurement) {
      return db<Measurement>("measurements").insert(options, ["id"]);
    },
    getAll(options: any = {}) {
      return db<Measurement>("measurements").where(options);
    },
    getByOwner(user: number) {
      return db<Measurement>("measurements").where("userid", user);
    },
    update(options: Measurement) {
      const id = options.id;
      delete options.id;
      return db<Measurement>("measurements")
        .where("id", id)
        .update(options, returnList);
    },
    destroy(id: number) {
      return db<Measurement>("measurements")
        .where("id", id)
        .del();
    }
  };
};

export { createMeasurementService };
