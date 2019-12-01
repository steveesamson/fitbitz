import React, { useEffect, useRef } from "react";
import Chart from "chart.js";
import { getSession } from "../../core";
import { queryMeasurementsByOwner } from "../../actions/measurement";
import { MeasurementsType, MeasurementType } from "../../types/measurement";

const Graph: React.FC<any> = (props: any): JSX.Element => {
  const { id, name } = getSession();
  const canvasRef = useRef();
  const { loading, error, data, fetchMore } = queryMeasurementsByOwner({
    offset: 0,
    first: 20,
    user: id
  });
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!data || !data.measurements || !canvas) return;
    const measurements: MeasurementType[] = data.measurements;
    const times: string[] = measurements.map((m: MeasurementType) => m.time);
    const weights: number[] = measurements.map(
      (m: MeasurementType) => m.weight
    );
    const chart = new Chart(canvas, {
      type: "line",

      data: {
        labels: times,
        datasets: [
          {
            data: weights,
            label: `${name}'s weight`,
            borderColor: "#dd0c75",
            backgroundColor: "#1d3e53",
            fill: false
          }
        ]
      }
    });
  }, [data]);

  if (loading) return <p>Loading ...</p>;
  if (error) return <p>Sorry there was an error ...</p>;

  return (
    <section className="graph">
      <canvas id="chart" ref={canvasRef}></canvas>
    </section>
  );
};

export default Graph;
