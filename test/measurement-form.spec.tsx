import React from "react";
import { mount } from "enzyme";
import { MockedProvider } from "@apollo/react-testing";
import { MeasurementForm } from "../src/frontend/components/measurement";
import { MeasurementFormProps } from "../src/frontend/types/measurement";
import {
  updateMeasurementMutation,
  deleteMeasurementMutation
} from "../src/frontend/actions/measurement";

describe("<MeasurementForm /> with props", () => {
  const item = { id: "1", weight: 45.4, time: "2019-10-02", userid: "1" };
  const props: MeasurementFormProps = {
    onDone: jest.fn(() => item),
    measurement: item
  };
  const mocks = [
    {
      request: {
        query: deleteMeasurementMutation,
        variables: {
          id: item.id
        }
      },
      result: {
        data: {
          removeMeasurement: item
        }
      }
    },
    {
      request: {
        query: updateMeasurementMutation,
        variables: {
          id: item
        }
      },
      result: {
        data: {
          updateMeasurement: item
        }
      }
    }
  ];
  const container = mount(
    <MockedProvider mocks={mocks} addTypename={false}>
      <MeasurementForm {...props} />
    </MockedProvider>
  );

  it("should match the snapshot", () => {
    expect(container.html()).toMatchSnapshot();
  });

  it("should have 1 date field", () => {
    expect(container.find('input[type="date"]').length).toEqual(1);
  });

  it("should have a number field", () => {
    expect(container.find('input[type="number"]').length).toEqual(1);
  });

  it("should have 2 buttons", () => {
    expect(container.find("button").length).toEqual(2);
  });

  it("should return item when edit button is clicked", () => {
    container.find(".remove-button").simulate("click");
    expect(props.onDone).toBeCalled();
  });
});
