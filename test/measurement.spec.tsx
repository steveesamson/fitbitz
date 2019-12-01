import React from "react";
import { MockedProvider, wait } from "@apollo/react-testing";
import { mount } from "enzyme";
import { MeasurementProps } from "../src/frontend/types/measurement";
import { Measurement } from "../src/frontend/components/measurement";
import { MeasurementType } from "../src/frontend/types/measurement";
import { deleteMeasurementMutation } from "../src/frontend/actions/measurement";

describe("<Measurement/> Component with props", () => {
  const item = { id: "1", weight: 45.4, time: "2019-10-02", userid: "1" };
  const props: MeasurementProps = {
    measurement: item,
    onEdit: jest.fn(() => item)
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
    }
  ];
  const container = mount<MeasurementType>(
    <MockedProvider mocks={mocks} addTypename={false}>
      <table>
        <tbody>
          <Measurement {...props} />
        </tbody>
      </table>
    </MockedProvider>
  );

  it("should have 1 table row", () => {
    expect(container.find("tr")).toHaveLength(1);
  });
  it("should have 4 table columns", () => {
    expect(container.find("td")).toHaveLength(4);
  });

  it("should call onEdit when edit button is clicked", () => {
    container.find(".edit-button").simulate("click");
    expect(props.onEdit).toHaveBeenCalledWith(item);
  });
});
