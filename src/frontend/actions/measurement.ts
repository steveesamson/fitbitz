import gql from "graphql-tag";
import { useQuery, useMutation } from "@apollo/react-hooks";
import { MeasurementType, MeasurementsType } from "../types/measurement";
import { DelProps } from "../types/common";
import { getSession } from "../core";
const session = getSession();
const measurementsQuery = gql`
  query Measurements($user: String!, $offset: Int = 0, $first: Int = 20) {
    measurements(user: $user, offset: $offset, first: $first) {
      id
      userid
      time
      weight
    }
  }
`;

const measurementQuery = gql`
  query Measurement($id: ID!) {
    measurement(id: $id) {
      id
      userid
      time
      weight
    }
  }
`;

const addMeasurementMutation = gql`
  mutation addMeasurement($user: String!, $time: String!, $weight: Float!) {
    addMeasurement(
      addMeasurementInput: { userid: $user, time: $time, weight: $weight }
    ) {
      id
      userid
      time
      weight
    }
  }
`;

const updateMeasurementMutation = gql`
  mutation updateMeasurement(
    $id: ID!
    $user: String
    $time: String
    $weight: Float
  ) {
    updateMeasurement(
      editMeasurementInput: {
        id: $id
        userid: $user
        time: $time
        weight: $weight
      }
    ) {
      id
      userid
      time
      weight
    }
  }
`;

const deleteMeasurementMutation = gql`
  mutation removeMeasurement($id: ID!) {
    removeMeasurement(id: $id) {
      id
      userid
      time
      weight
    }
  }
`;

const getMeasurements = (options: any) => useQuery(measurementsQuery, options);
const getMeasurement = (options: any) => useQuery(measurementQuery, options);

const useAddMeasurement = () => {
  const [addMeasurement] = useMutation(addMeasurementMutation);
  return (params: MeasurementType) => {
    const _variables = {
      user: getSession().id
    };
    return addMeasurement({
      variables: params,
      update: (store, { data: { addMeasurement } }) => {
        const { measurements } = store.readQuery<MeasurementsType, any>({
          query: measurementsQuery,
          variables: _variables
        });

        store.writeQuery({
          query: measurementsQuery,
          variables: _variables,
          data: {
            measurements: [...measurements, addMeasurement]
          }
        });
      }
    });
  };
};

const useUpdateMeasurement = () => {
  const [updateMeasurement] = useMutation(updateMeasurementMutation);
  return (params: MeasurementType) => {
    return updateMeasurement({
      variables: params
    });
  };
};

const useDeleteMeasurement = () => {
  const [removeMeasurement] = useMutation(deleteMeasurementMutation);

  return (params: DelProps) => {
    const { id, sessionUser } = params;
    const _variables = {
      user: sessionUser
    };
    return removeMeasurement({
      variables: { id },
      update: (store, { data: { removeMeasurement } }) => {
        const { measurements } = store.readQuery<MeasurementsType, any>({
          query: measurementsQuery,
          variables: _variables
        });

        store.writeQuery({
          query: measurementsQuery,
          variables: _variables,
          data: {
            measurements: measurements.filter(
              (current: MeasurementType) => current.id != removeMeasurement.id
            )
          }
        });
      }
    });
  };
};
const queryMeasurementsByOwner = (props: any) => {
  return getMeasurements({
    variables: props,
    fetchPolicy: "cache-and-network"
  });
};

const queryOneMeasurement = (props: any) =>
  getMeasurement({
    variables: props,
    fetchPolicy: "cache-and-network"
  });

export {
  queryOneMeasurement,
  queryMeasurementsByOwner,
  useAddMeasurement,
  useDeleteMeasurement,
  useUpdateMeasurement,
  measurementsQuery,
  measurementQuery,
  addMeasurementMutation,
  deleteMeasurementMutation,
  updateMeasurementMutation
};
