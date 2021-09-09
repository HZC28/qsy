const cloud = require('wx-server-sdk')

cloud.init({
  env: cloud.DYNAMIC_CURRENT_ENV
})
const db = cloud.database()
// 获取openId云函数入口函数
exports.main = async (event, context) => {
  // 获取基础信息
  const wxContext = cloud.getWXContext()
  const _ = db.command
  let obj=[]
  let openid=wxContext.OPENID
  obj = await db.collection("downloads_table").where({openid:openid}).update({
    data:{
      download_time:_.inc(1)
    }
  })
  return obj.data
}