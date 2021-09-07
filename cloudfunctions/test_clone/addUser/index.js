// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init({
  env: cloud.DYNAMIC_CURRENT_ENV
})
const db = cloud.database()
// 云函数入口函数
exports.main = async (event, context) => {
  const wxContext = cloud.getWXContext()
  await db.collection('user_table').add({
    // data 字段表示需新增的 JSON 数据
    data: {
      nickName:event.userInfo.nickName,
      gender:event.userInfo.gender,
      language:event.userInfo.language,
      city:event.userInfo.city,
      province:event.userInfo.province,
      country:event.userInfo.country,
      avatarUrl:event.userInfo.avatarUrl,
      openid: wxContext.OPENID,
      appid: wxContext.APPID,
      unionid: wxContext.UNIONID,
    }
  })
 let obj = await db.collection('user_table').where({
    openid:wxContext.OPENID
  }).get()
  return {
    event,
    type:'addUser',
    data:obj.data
  }
}