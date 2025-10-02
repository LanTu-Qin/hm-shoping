import request from '@/utils/request'

export const cartOrder = (mode, obj) => {
  return request.get('checkout/order', {
    params: {
      mode,
      delivery: 10, // 配送方式（10快递配送 20上门自提）
      shopId: 0,
      couponId: 0,
      isUsePoints: 0,
      ...obj // 如果是cart obj就是cartIds，如果是buyNow，obj就是{goodsId,goodsNum,goodsSkuId}
    }
  })
}
