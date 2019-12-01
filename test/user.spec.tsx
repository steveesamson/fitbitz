import React from "react";
import { MockedProvider, wait } from "@apollo/react-testing";
import { mount } from "enzyme";
import {} from "../src/frontend/types/user";
import { User } from "../src/frontend/components/user";
import { UserType } from "../src/frontend/types/user";
import { deleteUserMutation } from "../src/frontend/actions/user";

describe("<User /> Component with props", () => {
  const item = {
    id: "1",
    fullname: "Some Name",
    email: "someone@someplace.com"
  };

  const mocks = [
    {
      request: {
        query: deleteUserMutation,
        variables: {
          id: item.id
        }
      },
      result: {
        data: {
          removeUser: item
        }
      }
    }
  ];
  const container = mount<UserType>(
    <MockedProvider mocks={mocks} addTypename={false}>
      <table>
        <tbody>
          <User {...item} />
        </tbody>
      </table>
    </MockedProvider>
  );

  it("should have 1 table row", () => {
    expect(container.find("tr")).toHaveLength(1);
  });
  it("should have 3 table columns", () => {
    expect(container.find("td")).toHaveLength(3);
  });
});
