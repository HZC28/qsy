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
  // async function find_link (link, collback) {
  //   console.log(131313)
  //   async function f(link) {
  //     console.log(1231323345)
  //       var options = {
  //           url: link,
  //           followRedirect: false,
  //           headers : {
  //               'Content-Type': 'application/x-www-form-urlencoded',
  //               'Accept-Charset': 'UTF-8;',
  //               'User-Agent':'Mozilla/5.0 (Windows; U; Windows NT 5.1; zh-CN; rv:1.9.2.8) Firefox/3.6.8',
  //           }
  //       }
  //       await new Promise(resolve => {
  //         request(options,async (error, response, body)=> {
  //           console.log(response.statusCode);
  //           if (response.statusCode == 301 || response.statusCode == 302) {
  //               var location = response.headers.location;
  //               console.log('location: ' + location);
  //               f(location);
  //           } else {
  //               //console.log(body);
  //               collback(link);
  //               resolve("123")
  //           }
  //         })
  //       });
        
  //   }
  //   await f(link);
  // }
  // await find_link("https://aweme.snssdk.com/aweme/v1/play/?video_id=v0d00fg10000c4nom4jc77u3ev61ut70&ratio=720p&line=0",function(link){
  //   console.log(link)
  //   url==link
  //   console.log("return")
  //   return url
  // });
  // console.log("return")
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