// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init({
  env: cloud.DYNAMIC_CURRENT_ENV
})
const db=cloud.database()
// 云函数入口函数
exports.main = async (event, context) => {
  const wxContext = cloud.getWXContext()
  const _ = db.command
  let result= await db.collection('downloads_table').where({
    download_time_today:_.neq(0)
  }).update({
    data: {
      download_time_today: 0
    }
  })
  return {
    result:result
  }
}