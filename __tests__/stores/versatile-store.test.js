
import { VersatileStore } from '../../stores/'
const store = new VersatileStore()
// const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));
describe("Versatile store test ", () => {

  beforeAll(() => {
    jest.setTimeout("50000")
  })

  beforeEach(() => {
  })

  it("Should be return sidebar width when getter & setter sidebar width correct", async () => {
    store.setSidebarWidth(333)
    let result = store.getSidebar
    console.log("Result in test : ", result)
    expect(result).toEqual(333)
  })

  it("Should be return isShow value when getter & setter correct", async () => {
      store.setIsShow(true)
      expect(store.isShow).toEqual(true)
  })

})
