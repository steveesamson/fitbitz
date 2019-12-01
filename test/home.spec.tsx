import React from "react";
import { mount } from "enzyme";
import { Home } from "../src/frontend/components/home";

describe("<Home /> with no props", () => {
  const props = {
    onView: () => {}
  };
  const container = mount(<Home {...props} />);
  it("should match the snapshot", () => {
    expect(container.html()).toMatchSnapshot();
  });
});
