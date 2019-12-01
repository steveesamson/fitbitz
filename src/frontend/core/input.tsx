import React from "react";

import { Errors, InputChangeEvent } from "../types/common";

interface InputProps {
  errors: Errors;
  name: string;
  value?: any;
  label: string;
  type: string;
  onField: (e: InputChangeEvent, field: string) => void;
  onKey?: (e: React.KeyboardEvent<HTMLInputElement>) => void;
}

const Input = ({
  errors,
  name,
  label,
  value,
  type,
  onField,
  onKey
}: InputProps): JSX.Element => (
  <section className="input-group">
    {errors[name] && <span className="error">{errors[name]}</span>}
    <div className="inplace_text">
      <label htmlFor={name}>{label}</label>
      <input
        autoComplete="off"
        className="inplace-text"
        type={type}
        name={name}
        defaultValue={value}
        id={name}
        onKeyPress={onKey}
        onChange={e => onField(e, name)}
      />
    </div>
  </section>
);

export { Input };
