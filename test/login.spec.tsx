import React from "react";
import { mount } from "enzyme";
import { Login } from "../src/frontend/components/home";

describe("<Login /> with no props", () => {
  const container = mount(<Login />);
  it("should match the snapshot", () => {
    expect(container.html()).toMatchSnapshot();
  });

  it("should have a text field", () => {
    expect(container.find('input[type="text"]').length).toEqual(1);
  });

  it("should have a password field", () => {
    expect(container.find('input[type="password"]').length).toEqual(1);
  });

  it("should have 2 buttons", () => {
    expect(container.find("button").length).toEqual(2);
  });
});
