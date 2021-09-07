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
  // 3600000//一小时前
  let interval=new Date().getTime()-3600000//一小时前
  // db.collection('vedioid_table').where({
  //   time: _.lt(interval)
  // }).remove().then(res=>{
  //   console.log(res)
  // }).catch(err=>{
  //   console.log(err)
  // })
  db.collection("vedioid_table").where({
    time: _.lt(interval)
  }).get().then(res=>{
    console.log(res.data,"res.data")
    let arr=res.data
    let fileList=[]
    arr.forEach(val=>{
      fileList.push(val.fileID)
    })
    if(fileList.length!=0){
      cloud.deleteFile({
        fileList: fileList
      }).then(res=>{
        console.log(res)
        db.collection('vedioid_table').where({
          time: _.lt(interval)
        }).remove()
      })
    }
    console.log(res)
  })
  return {
    result:'success'
  }
}