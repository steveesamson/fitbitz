import * as React from "react";

import { useDeleteMeasurement } from "../../actions/measurement";
import { getSession } from "../../core";
import { MeasurementType } from "../../types/measurement";
interface MeasurementProps {
  measurement: MeasurementType;
  onEdit: (d: MeasurementType) => void;
}
const Measurement: React.FC<MeasurementProps> = (
  props: MeasurementProps
): JSX.Element => {
  const session = getSession();
  const { measurement } = props;
  const { id, userid, weight, time } = measurement;
  const deleteMeasurement = useDeleteMeasurement();
  const { name, id: sessionUser } = session || {};

  function onRemove() {
    if (confirm(`Do you really want to delete this measurement?`)) {
      deleteMeasurement({ id, sessionUser });
    }
  }

  return (
    <tr>
      <td>{name}</td>
      <td>{weight}</td>
      <td>{time}</td>
      <td>
        <button className="remove-button" type="button" onClick={onRemove}>
          Remove
        </button>
        <button
          className="edit-button"
          type="button"
          onClick={() => props.onEdit(measurement)}
        >
          Change
        </button>
      </td>
    </tr>
  );
};

export default Measurement;
