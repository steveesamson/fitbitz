import React, { useState } from "react";
import { useAddUser, queryUsers } from "../../actions/user";
import { useValidator, emailRe, Input } from "../../core";
import { ButtonClickEvent, InputChangeEvent, Data } from "../../types/common";

interface OnView {
  onView: React.Dispatch<React.SetStateAction<string>>;
}
const UserForm: React.FC<OnView> = (props: OnView): JSX.Element => {
  queryUsers({ offset: 0, first: 20 });
  const [data, setData] = useState<any>({});
  const { errors, checkError, validate, addError } = useValidator(data);
  const addUser = useAddUser();

  function saveData(e: ButtonClickEvent): void {
    e.preventDefault();
    if (!validate(["fullname", "email", "password"])) {
      return;
    }
    if (Object.keys(errors).length) return;

    const { email } = data;
    if (!email.match(emailRe)) {
      addError("Not a valid email", "email");
      return;
    }
    // console.log(data);
    addUser(data);
    props.onView("/login");
  }

  function onField(e: InputChangeEvent, field: string) {
    const val = e.target.value;
    checkError(val, field);
    setData((pre: any) => ({ ...pre, [field]: val }));
  }

  return (
    <form>
      <fieldset className="slick-form-fields">
        <span className="legend">Signup to FitBitz</span>
        <Input
          name="fullname"
          type="text"
          errors={errors}
          onField={onField}
          label="Full Name"
        />
        <Input
          name="email"
          type="text"
          errors={errors}
          onField={onField}
          label="Your email"
        />

        <Input
          name="password"
          type="password"
          errors={errors}
          onField={onField}
          label="Password"
        />
      </fieldset>
      <fieldset className="form-submit">
        <button type="button" className="login-button" onClick={saveData}>
          Save
        </button>
        <button
          type="button"
          className="remove-button"
          onClick={_ => props.onView("/home")}
        >
          Cancel
        </button>
      </fieldset>
    </form>
  );
};

export default UserForm;
