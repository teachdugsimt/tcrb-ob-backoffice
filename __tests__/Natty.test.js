import React from 'react'
import Natty from '../pages/Natty'
import OtpUnlock from '../components/customer-services-menu/otp-unlocking'
import { shallow, mount } from 'enzyme'

describe("Natty component", () => {
  test("it's renders", () => {
    const wrapper = shallow(<OtpUnlock />);
    expect(wrapper.exists()).toBe(true);
  });
});
