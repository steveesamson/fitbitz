import * as React from "react";

import Measurement from "./measurement";
import { MeasurementType } from "../../types/measurement";
import { queryMeasurementsByOwner } from "../../actions/measurement";
import { getSession } from "../../core";

const Measurements: React.FC<any> = (props: any): JSX.Element => {
  const { id } = getSession() || {};
  const { loading, error, data, fetchMore } = queryMeasurementsByOwner({
    offset: 0,
    first: 20,
    user: id
  });
  if (loading) return <p>Loading ...</p>;
  if (error) return <p>Sorry there was an error ...</p>;

  return (
    <div>
      {data.measurements.length ? (
        <table className="users">
          <caption>
            Measurements
            <button
              className="add-button"
              type="button"
              onClick={_ => props.onEdit({})}
            >
              Add Measurement
            </button>
          </caption>
          <thead>
            <tr>
              <th>USER</th>
              <th>WEIGHT</th>
              <th>TIME</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {data.measurements.map((m: MeasurementType) => (
              <Measurement measurement={m} key={m.id} onEdit={props.onEdit} />
            ))}
          </tbody>
        </table>
      ) : (
        <p className="sorry">
          Sorry, there are no measurements presently.{" "}
          <button
            className="inline"
            type="button"
            onClick={_ => props.onForm()}
          >
            add some here
          </button>
        </p>
      )}
    </div>
  );
};

export default Measurements;
