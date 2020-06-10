import React from 'react'
import Natty from '../pages/Natty'
import { shallow, mount } from 'enzyme'

describe("Natty component", () => {
  test("it's renders", () => {
    const wrapper = shallow(<Natty />);
    expect(wrapper.exists()).toBe(true);
  });
});
