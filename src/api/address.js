import request from '@/utils/request'

// 获取订单地址列表
export const getAddressList = () => {
  return request.get('address/list')
}
