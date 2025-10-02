import { getCartList, updateCartList, deleteSelect } from '@/api/cart'
import { Toast } from 'vant'

export default {
  namespaced: true,
  state () {
    return {
      cartList: [],
      cartTotal: 0
    }
  },
  mutations: {
    newCartList (state, obj) {
      state.cartList = obj.list
      state.cartTotal = obj.cartTotal
    },
    toggleCheck (state, id) {
      const goods = state.cartList.find(item => item.goods_id === id)
      goods.isChecked = !goods.isChecked
    },
    AllChecked (state, data) {
      state.cartList.forEach(element => {
        element.isChecked = data
      })
    },
    changeCount (state, obj) {
      const ele = state.cartList.find(item => item.goods_id === obj.goodsId)
      ele.goods_num = obj.goodsNum
    }
  },
  actions: {
    async getCartAction (context) {
      const { data } = await getCartList()
      // 给每个商品加上是否选中的状态: isCheacked
      data.list.forEach(element => {
        element.isChecked = true
      })
      context.commit('newCartList', data)
    },
    async changeCountAction (context, obj) {
      const { goodsNum, goodsId, goodsSku } = obj
      // 先本地修改
      // context.commit('changeCount', { goodsNum, goodsId })
      // 再后台修改

      // 先后台修改，防止后台失败，本地成功
      const res = await updateCartList(goodsId, goodsNum, goodsSku)
      // console.log(res)
      if (res.status === 200) context.commit('changeCount', { goodsNum, goodsId })
      else Toast('修改失败')
    },
    async deleteSelect (context, list) {
      const res = await deleteSelect(list)
      if (res.status === 200) {
        // Toast('删除成功')
        context.dispatch('getCartAction').then(Toast('删除成功'))
      }
    }
  },
  getters: {
    // 商品总数
    cartTotalNum (state) {
      return state.cartList.reduce((sum, item) => sum + item.goods_num, 0)
    },
    // 选中的商品
    selCartList (state) {
      return state.cartList.filter(item => item.isChecked)
    },
    // 选中的总数
    selCount (state, getters) {
      return getters.selCartList.reduce((sum, item) => sum + item.goods_num, 0)
    },
    // 选中的总价
    selPrice (state, getters) {
      return getters.selCartList.reduce((sum, item) => sum + item.goods_num * item.goods.goods_price_min, 0)
    },
    // 是否全选
    isAllChecked (state) {
      return state.cartList.every(item => item.isChecked)
    }
  }
}
