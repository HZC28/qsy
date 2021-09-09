const cloud = require('wx-server-sdk')
const request = require('request')
const fs = require('fs')
const path = require('path')
cloud.init({
  env: cloud.DYNAMIC_CURRENT_ENV
})
const db = cloud.database(); //初始化云数据库
exports.main = async (event, context) => {
  // 获取基础信息
  const wxContext = cloud.getWXContext()
  var url = event.link //下载地址,应该由前端进行传递,而后云函数进行下载
  var type = 'dump'; //type:'dump'(转储) 'trans'(传递)
  var filename = new Date().getTime()+ Math.floor(Math.random() * 1000)+".mp4";
  const _ = db.command
  //文件名称需要自己进行上传,或者substring 截取url
  var options = {
    url: url,
    encoding: null,
    headers: {
      "content-type": "application/octet-stream",
    },
  };
  return new Promise(function (resolve, reject) {
    request(options, function (error, response, body) {
      if(type=='trans'){
          //中继
        resolve(body)
      }else{
          //转储
          let openid = event.openid
          cloud.uploadFile({
            cloudPath: 'tmp/'+filename,
            fileContent: body,
          }).then(res=>{
            db.collection('vedioid_table').add({
              data:{
                fileID:res.fileID,
                openid: "",
                time:new Date().getTime()
              }
            }).then(res=>{
              db.collection("downloads_table").where({openid:openid}).get().then(res=>{
                console.log(res)
                if(res.data.length==0){
                  db.collection("downloads_table").add({
                    data:{
                      openid:openid,
                      download_times:0,
                      request_time:1
                    }
                  })
                }else{
                  db.collection("downloads_table").where({openid:openid}).update({
                    data:{
                      request_time:_.inc(1)
                    }
                  })
                }
              })
            })
            resolve(res)
            console.log(res)
          })
        
      }
    })
  })
}