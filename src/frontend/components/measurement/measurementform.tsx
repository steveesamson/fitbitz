import React, { useState } from "react";
import { useValidator, Input, getSession, toDate } from "../../core";
import { ButtonClickEvent, InputChangeEvent } from "../../types/common";
import {
  useAddMeasurement,
  useUpdateMeasurement
} from "../../actions/measurement";
import { MeasurementType, MeasurementFormProps } from "../../types/measurement";

const MeasurementForm: React.FC<MeasurementFormProps> = (
  props: MeasurementFormProps
): JSX.Element => {
  const [data, setData] = useState<MeasurementType>(props.measurement);
  const { errors, checkError, validate } = useValidator(data);
  const addMeasurement = useAddMeasurement();
  const updateMeasurement = useUpdateMeasurement();
  const session = getSession();
  function saveData(e: ButtonClickEvent): void {
    e.preventDefault();
    if (!validate(["weight", "time"])) {
      return;
    }
    if (Object.keys(errors).length) return;

    const load = { ...data, user: session.id };
    load.weight = parseFloat(load.weight + "");
    if (load.id) {
      updateMeasurement(load);
    } else {
      addMeasurement(load);
    }

    props.onDone && props.onDone();
  }

  function onField(e: InputChangeEvent, field: string) {
    const val = e.target.value;
    checkError(val, field);
    setData((pre: any) => ({ ...pre, [field]: val }));
  }

  const { time, weight } = data;

  const title = data.id ? "Edit Measurement" : "Add Measurement";
  return (
    <form>
      <fieldset className="slick-form-fields">
        <span className="legend">{title}</span>
        <Input
          name="weight"
          value={weight}
          type="number"
          errors={errors}
          onField={onField}
          label="Weight"
        />
        <Input
          name="time"
          type="date"
          value={time}
          errors={errors}
          onField={onField}
          label="Time"
        />
      </fieldset>
      <fieldset className="form-submit">
        <button type="button" className="login-button" onClick={saveData}>
          Save
        </button>
        <button
          type="button"
          className="remove-button"
          onClick={_ => props.onDone && props.onDone()}
        >
          Cancel
        </button>
      </fieldset>
    </form>
  );
};

export default MeasurementForm;
