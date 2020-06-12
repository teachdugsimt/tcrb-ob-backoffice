import { CustomerServicesMenuStore } from '../../stores'
const store = new CustomerServicesMenuStore()

describe("OTP Unlocking", () => {
  it("input Citizen Id is 123456789012", () => {
    store.setCitizenId('123456789012')
    expect(store.citizenId).toBe('123456789012')
  })
})
