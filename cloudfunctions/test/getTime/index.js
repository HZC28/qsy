const cloud = require('wx-server-sdk')
const request = require('request-promise');
cloud.init({
  env: cloud.DYNAMIC_CURRENT_ENV
})
const db = cloud.database()
// 获取openId云函数入口函数
exports.main = async (event, context) => {
  // 获取基础信息
  const wxContext = cloud.getWXContext()
  let url;
  let l=db.collection('downloads_table').where({
    openid: wxContext.OPENID
  }).get()
  return l
  
}