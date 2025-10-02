import request from '@/utils/request'

// mode:cart => obj里传cartsId mode:buyNow => obj里传goodsId goodsNum goodsSkuId
export const getCheckout = (mode, obj) => {
  return request.get('/checkout/order', {
    params: {
      mode, // buyNow或cart
      delivery: 10,
      couponId: 0,
      isUsePoints: 0,
      ...obj // 将传递过来的参数解构
    }
  })
}
