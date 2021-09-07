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
  let r =await request.get(event.link, function (err, res, body) {
    console.log(this.uri.href);
    url=this.uri.href
  });
  return url
  
}