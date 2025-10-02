import { getInfo } from '@/utils/storage'
import { Dialog } from 'vant'

export default {
  data () {
    return {
    }
  },
  methods: {
    loginConfirm () {
      if (getInfo().token === '') {
        Dialog.confirm({
          title: '温馨提示',
          message: '此时需要先登入才能继续操作哦~',
          confirmButtonText: '去登入',
          cancelButtonText: '再逛逛'
        })
          .then(() => {
            // on confirm
            // 如果希望跳转到登入，登入完后还能跳回来，需要在跳转的那里添加参数（当前路径地址）原：this.$router.push('/cart')
            // this.$router.fullPath (包含完整地址，包括查询参数)  this.$router.path (不包含查询参数)
            this.$router.push({
              path: '/login',
              query: {
                backUrl: this.$route.fullPath
              }
            })
          })
          .catch(() => {
            // on cancel
          })
        return false
      }
    }
  }
}
