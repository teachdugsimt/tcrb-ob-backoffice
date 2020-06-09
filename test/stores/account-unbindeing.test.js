import { CustomerServicesMenuStore } from '../../stores'
const store = new CustomerServicesMenuStore()

describe("Account Unbinding", () => {
  it("input Citizen Id is 123456789012" ,()=>{
    store.setCitizenId('123456789012')
    expect(store.citizenId).toBe('123456789012')

  })
  it("input Citizen Id is 123456789012 then find Account Number is 665335587329" ,()=>{
    store.setCitizenId('123456789012')
    store.accountId = '665335587329'
    expect(store.citizenId).toBe('123456789012')
    expect(store.accountId).toBe('665335587329')
  })


})
