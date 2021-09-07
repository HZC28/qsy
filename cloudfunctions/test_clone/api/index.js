const cloud = require('wx-server-sdk')
const request = require('request');
const querystring = require('querystring')
cloud.init({
  env: cloud.DYNAMIC_CURRENT_ENV
})
const db = cloud.database()
// 获取openId云函数入口函数
exports.main = async (event, context) => {
    let options = {
        url: "https://v2.alapi.cn/api/video/url",
        method: "POST",
        json: true,
        headers: {
            "content-type": "application/x-www-form-urlencoded",
        },
        body:querystring.stringify({
          token:"AbbRSJFpZBjsTSMK",
          url:event.link
        })
    }
    console.log("return")
    // 获取基础信息
    const wxContext = cloud.getWXContext()
    let url;
    return new Promise(function (resolve, reject) {
        request(options, function (error, response, body) {
          resolve(response)
        })
      })
}