import React from "react";
import { mount } from "enzyme";
import { MockedProvider } from "@apollo/react-testing";
import { UserForm } from "../src/frontend/components/user";
import { usersQuery } from "../src/frontend/actions/user";

describe("<UserForm /> with props", () => {
  const props = {
    onView: () => {}
  };
  const items = [
    { id: "1", fullname: "Some Name", email: "someone@someplace.com" }
  ];

  const mocks = [
    {
      request: {
        query: usersQuery,
        variables: {
          offset: 0,
          first: 20
        }
      },
      result: {
        data: {
          users: items
        }
      }
    }
  ];

  const container = mount(
    <MockedProvider mocks={mocks} addTypename={false}>
      <UserForm {...props} />
    </MockedProvider>
  );
  it("should match the snapshot", () => {
    expect(container.html()).toMatchSnapshot();
  });

  it("should have 2 text field", () => {
    expect(container.find('input[type="text"]').length).toEqual(2);
  });

  it("should have a password field", () => {
    expect(container.find('input[type="password"]').length).toEqual(1);
  });

  it("should have 2 buttons", () => {
    expect(container.find("button").length).toEqual(2);
  });
});
