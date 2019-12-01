export interface MeasurementType {
  id?: string;
  userid: string;
  time: string;
  weight: number;
  offset?: number;
  first?: number;
}

export interface MeasurementsType {
  measurements: Array<MeasurementType>;
}

export interface MeasurementProps {
  measurement: MeasurementType;
  onEdit: (d: MeasurementType) => void;
}

export interface MeasurementFormProps {
  onDone: () => void;
  measurement?: MeasurementType;
}
