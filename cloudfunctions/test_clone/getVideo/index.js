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
  var options = {
    url: event.videoUrl,
    followRedirect: false,
    headers : {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Accept-Charset': 'UTF-8;',
        'User-Agent':'Mozilla/5.0 (Windows; U; Windows NT 5.1; zh-CN; rv:1.9.2.8) Firefox/3.6.8',
    }
}
  await new Promise(resolve => {
    request(options,async (error, response, body)=> {
      console.log(response.statusCode);
      if (response.statusCode == 301 || response.statusCode == 302) {
          var location = response.headers.location;
          console.log('location: ' + location);
          url=response.headers.location
          resolve("13213")
      } 
    })
  });
  return url
  
}