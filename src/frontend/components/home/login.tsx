import React, { useState } from "react";
import { useValidator, emailRe, Input, saveSession } from "../../core";
import { ButtonClickEvent, InputChangeEvent } from "../../types/common";
import { useLogin } from "../../actions/auth";

const Login: React.FC<any> = (props: any): JSX.Element => {
  const [log, setLog] = useState<any>({});
  const { errors, checkError, validate, addError } = useValidator(log);
  const [login, { loading, data }] = useLogin();

  function doLogin(e: ButtonClickEvent): void {
    e && e.preventDefault();
    if (!validate(["password", "email"])) {
      return;
    }
    if (Object.keys(errors).length) return;
    const { email } = log;
    if (!email.match(emailRe)) {
      addError("Not a valid email", "email");
      return;
    }

    login({ variables: log });
  }

  function onField(e: InputChangeEvent, field: string): void {
    const val = e.target.value;
    checkError(val, field);
    setLog((pre: any) => ({ ...pre, [field]: val }));
  }

  if (loading) return <p>Loading ...</p>;

  const onKeydown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.nativeEvent.keyCode === 13) {
      doLogin(null);
    }
  };

  if (data && data.login) {
    const loginData = { ...data.login };

    saveSession(loginData);
    props.onView("/home");
  }

  return (
    <form>
      <fieldset className="slick-form-fields">
        <span className="legend">Login to FitBitz</span>
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
          label="Secret"
          onKey={onKeydown}
        />
      </fieldset>
      <fieldset className="form-submit">
        <button type="button" className="login-button" onClick={doLogin}>
          Login
        </button>
        <button
          type="button"
          className="signup-button"
          onClick={_ => props.onView("/adduser")}
        >
          Sign Up
        </button>
      </fieldset>
    </form>
  );
};

export default Login;
