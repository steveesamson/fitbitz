import gql from "graphql-tag";
import { measurementService } from "../../services";

const typeDef: string = gql`
  extend type Query {
    measurements(user: String!, offset: Int, first: Int): [Measurement!]!
    measurement(id: ID!): Measurement
  }

  extend type Mutation {
    addMeasurement(addMeasurementInput: MeasureInput!): Measurement
    updateMeasurement(editMeasurementInput: EditMeasureInput): Measurement
    removeMeasurement(id: ID!): Measurement
  }

  type Measurement {
    id: ID!
    userid: String!
    weight: Float!
    time: String!
  }

  input EditMeasureInput {
    id: ID!
    userid: String
    weight: Float
    time: String
  }
  input MeasureInput {
    userid: String!
    weight: Float!
    time: String!
  }
`;

const resolver = {
  Query: {
    async measurements(obj: any, args: any, context: any) {
      const { user, offset, first } = args;
      return await measurementService.getByOwner(user);
    },
    async measurement(obj: any, args: any, context: any) {
      const { id } = args;
      const res = await measurementService.getAll({ id });
      if (res.length) {
        return res[0];
      }
      return null;
    }
  },
  Mutation: {
    async addMeasurement(_: any, args: any, context: any) {
      const { addMeasurementInput } = args;

      const res = await measurementService.create(addMeasurementInput);
      if (res.length) {
        return { ...addMeasurementInput, ...res[0] };
      }
      return null;
    },

    async updateMeasurement(_: any, args: any, context: any) {
      const { editMeasurementInput } = args;
      const { id } = editMeasurementInput;
      if (id) {
        const res = await measurementService.update(editMeasurementInput);
        if (res.length) {
          const tobe = { ...editMeasurementInput, ...res[0], ...{ id } };
          return tobe;
        }
        return null;
      }

      return null;
    },
    async removeMeasurement(_: any, args: any, context: any) {
      const { id } = args;

      if (id) {
        let res = await measurementService.getAll({ id });
        if (res.length) {
          const toBex = res[0];
          const r = await measurementService.destroy(id);
          if (r) return toBex;
        }

        return null;
      }
      return null;
    }
  }
};

export { typeDef, resolver };
