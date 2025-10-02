import { setInfo, getInfo, removeInfo } from '@/utils/storage'

export default {
  namespaced: true,
  state () {
    return {
      // 个人权重相关
      userInfo: getInfo()
    }
  },
  mutations: {
    setUserInfo (state, obj) {
      state.userInfor = obj
      setInfo(obj)
    },
    removeUserInfo (state) {
      state.userInfor = { token: '', userId: '' }
      removeInfo()
    }
  },
  actions: {},
  getters: {
  }
}
