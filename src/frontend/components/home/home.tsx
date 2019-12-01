import React, { useState } from "react";
import { ButtonClickEvent } from "../../types/common";
import { getSession } from "../../core";
import { MeasurementForm, Measurements } from "../measurement";
import { MeasurementType } from "../../types/measurement";
import Graph from "./chart";
import "./home.css";

const Home: React.FC<any> = (props: any): JSX.Element => {
  const session = getSession();
  const [showForm, setShowForm] = useState<boolean>(false);
  const [measurement, setMeasurement] = useState<MeasurementType>();
  function onClick(e: ButtonClickEvent): void {
    e.preventDefault();
  }

  if (!session) {
    props.onView("/login");
    return null;
  }
  function onEditing(measure: any) {
    setMeasurement(measure);
    setShowForm(true);
  }

  return (
    <article className="home">
      <Graph />
      <section className="detail">
        {showForm && (
          <MeasurementForm
            onDone={() => setShowForm(false)}
            measurement={measurement}
          />
        )}
        <Measurements
          onForm={() => onEditing({ userid: session.id })}
          onEdit={onEditing}
        />
      </section>
    </article>
  );
};

export default Home;
