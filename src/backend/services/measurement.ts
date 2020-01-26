import knex from "knex";
const returnList = ["time", "weight"];

export interface Measurement {
  id: number;
  userid: number;
  weight: number;
  time: string;
}
const createMeasurementService = (db: knex<any, any>) => {
  const _db = db<Measurement>("measurements");
  return {
    create(options: Measurement) {
      return _db.insert(options, ["id"]);
    },
    getAll(options: any = {}) {
      return _db.where(options);
    },
    getByOwner(user: number) {
      return _db.where("userid", user);
    },
    update(options: Measurement) {
      const id = options.id;
      delete options.id;

      _db.where({ id });

      return _db.update(options, returnList);
    },
    destroy(id: number) {
      return _db.where("id", id).del();
    }
  };
};

export { createMeasurementService };
