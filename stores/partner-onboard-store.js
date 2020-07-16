import { observable, action, computed } from "mobx"
import { create, persist } from 'mobx-persist'

class PartnerOnboardStore {
  @persist @observable id = ""
  @persist @observable password = ""
  @observable select_modify = ""

  @observable nextPageIsManageProductOnBoard = false

  @action setPage = (page_name) => {
    this.select_modify = page_name
  }


  // @computed get getMenu() {
  //   let arr = this.menu.filter(e => e.typeLv <= this.type)
  //   return arr
  // }

}
export default PartnerOnboardStore


// test commit
