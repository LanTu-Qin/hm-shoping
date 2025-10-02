// 约定一个统一的键名
const INFO_KEY = 'hm_shopping_info'
const SEARCH_HISTORY = 'user_search_history'

// 个人信息：
// 获取个人信息
export const getInfo = () => {
  const defaultInfo = { token: '', userId: '' }
  const res = localStorage.getItem(INFO_KEY)
  //   JSON.parse(res):将JSON文件解析成一般文字
  return res ? JSON.parse(res) : defaultInfo
}
// 设置个人信息
export const setInfo = (obj) => {
  // JSON.stringify(obj) :将一般文字序列化成json文件
  localStorage.setItem(INFO_KEY, JSON.stringify(obj))
}
// 移除个人信息
export const removeInfo = () => {
  localStorage.removeItem(INFO_KEY)
}

// 搜索历史：
// 获取搜索历史
export const getHistory = () => {
  const defaultHistory = []
  const res = localStorage.getItem(SEARCH_HISTORY)
  return res ? JSON.parse(res) : defaultHistory
}
// 更新搜索历史：
export const updateHistory = (newHistory) => {
  localStorage.setItem(SEARCH_HISTORY, JSON.stringify(newHistory))
}
