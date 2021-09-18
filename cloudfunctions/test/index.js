const add =require('./addUser/index')
const getOpenId=require('./getOpenId/index')
const getUrl=require('./getUrl/index')
const getVideo=require('./getVideo/index')
const uploadFile=require('./uploadFile/index')
const downloadTime=require('./downloadTime/index')
const api=require("./api/index")
const getTime=require('./getTime/index')
// 云函数入口函数
exports.main = async (event, context) => {
  switch (event.url) {
    case 'addUser':
      return await add.main(event, context)
    case 'getOpenId':
      return await getOpenId.main(event, context)
    case 'getUrl':
      return await getUrl.main(event, context)
    case 'getVideo':
      return await getVideo.main(event, context)
    case 'uploadFile':
      return await uploadFile.main(event, context)
    case 'api':
      return await api.main(event, context)
    case 'downloadTime':
      return await downloadTime.main(event, context)
    case 'getTime':
      return await getTime.main(event, context)
  }
}