import React from "react";
import { shallow } from "enzyme";
import FieldContainer from "./FieldContainer";
import Field from "../../components/Field";

describe("FieldContainer", () => {
  it("the generated field contains the correct set of props", () => {
    const field = shallow(<FieldContainer size={4} />).find(Field);
    expect(field.props()).toEqual({
      field: expect.any(Array),
      onClick: expect.any(Function),
    });
  });
  it("clicking on the empty cell doesn't change its position", () => {
    const wrapper = shallow(<FieldContainer size={4} />);
    wrapper.find(Field).props().onClick(3, 3);
    wrapper.update();
    expect(wrapper.find(Field).props().field[3][3]).toEqual(0);
  });
  it("clicking on the cell that is not adjacent to the empty cell doesn't change the empty cell position", () => {
    const wrapper = shallow(<FieldContainer size={4} />);
    wrapper.find(Field).props().onClick(0, 0);
    wrapper.update();
    expect(wrapper.find(Field).props().field[3][3]).toEqual(0);
  });
  it("clicking on the adjacent cell change the empty cell position", () => {
    const wrapper = shallow(<FieldContainer size={2} />);
    wrapper.find(Field).props().onClick(1, 0);
    wrapper.update();
    expect(wrapper.find(Field).props().field[0][1]).toEqual(0);
    wrapper.find(Field).props().onClick(0, 0);
    wrapper.update();
    expect(wrapper.find(Field).props().field[0][0]).toEqual(0);
    wrapper.find(Field).props().onClick(0, 1);
    wrapper.update();
    expect(wrapper.find(Field).props().field[1][0]).toEqual(0);
  });
  it("component should update when size doesn't equal previous", () => {
    const wrapper = shallow(<FieldContainer size={2} />);
    const instance = wrapper.instance() as FieldContainer;
    const isUpdated = instance.shouldComponentUpdate({ size: 4 }, instance.state);
    expect(isUpdated).toBe(true);
  });
  it("component shouldn't update when size equals previous", () => {
    const wrapper = shallow(<FieldContainer size={2} />);
    const instance = wrapper.instance() as FieldContainer;
    const isUpdated = instance.shouldComponentUpdate({ size: 2 }, instance.state);
    expect(isUpdated).toBe(false);
  });
});
