// 存放所有登录相关的api
import request from '@/utils/request'
// 1、获取图形验证码
export const getPicCode = async () => {
  return request.get('/captcha/image')
}
export const getMessageCode = async (form) => {
  return request.post('/captcha/sendSmsCaptcha', form)
}
export const login = async (form) => {
  return request.post('/passport/login', { form })
}
