//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    userInfo: {},
    videoUrl: '',
    defaultUrl: 'http://v.douyin.com/aWcudQ/'
  },
  //事件处理函数
  bindViewTap: function () {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  onLoad: function () {
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
    } else if (this.data.canIUse) {
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          })
        }
      })
    }
  },
  onShow() {
    var t = this
    wx.getClipboardData({ success: res => {
      var str = res.data.trim()
      if (str) {
        t.setData({
          defaultUrl: str
        })
      }
    } })
  },
  onShareAppMessage: function(res) {
    let that = this;
    // console.log('主图------------->',that.data.goodsObj.MainImages)
    return {
      title: "短视频去水印永久免费",
      path: '/pages/index/index',
      success: function(res) {
        console.log(res, "转发成功")
      },
      fail: function(res) {
        console.log(res, "转发失败")
      }
    }
  },
  onShareTimeline(){
    return {
      title: '短视频去水印永久免费'
    }
  },
  mousuosuo_showSvPro(e) {
    var index = e.target.dataset.index
    var t = this
    switch (index) {
      case '0':
        t.showToast('分享点复制连接')
        break
      case '1':
        t.showToast('视频自带无法去除')
        break
      case '2':
        t.showToast('先授权保存到相册')
        break
      default:
        break
    }
  },
  mousuosuo_clear: function () {
    this.setData({
      defaultUrl: ''
    })
  },
  mousuosuo_input: function (t) {
    this.setData({
      defaultUrl: t.detail.value,
      videoUrl: t.detail.value
    })
  },
  getUserInfo: function (t) {
    
    var a = this
    if (null != app.globalData.userInfo) return 'mousousuo',
      a.oSubmit(), a.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: !0
      })
    wx.getUserInfo({
      success: function (o) {
        console.log(123)
        app.globalData.userInfo = t.detail.userInfo, a.setData({
          userInfo: t.detail.userInfo,
          hasUserInfo: !0
        })
      },
      fail: function () {
        a.showToast('未获取授权登录失败')
      }
    })
  },
  replaceReg: function (t) {
    var e = this, a = /(http:\/\/|https:\/\/)((\w|=|\?|\.|\/|&|-)+)/g
    return t.replace(a, function (t) {
      e.setData({
        videoUrl: t
      })
    })
  },
  regUrl: function (t) {
    return /(http|ftp|https):\/\/[\w\-_]+(\.[\w\-_]+)+([\w\-\.,@?^=%&:/~\+#]*[\w\-\@?^=%&/~\+#])?/.test(t)
  },
  oSubmit: function () {
    var a = this
    var reg=/(http|ftp|https):\/\/[\w\-_]+(\.[\w\-_]+)+([\w\-\.,@?^=%&amp;:/~\+#]*[\w\-\@?^=%&amp;/~\+#])?/;
    if(this.data.defaultUrl.match(reg)==null){
      a.showToast('请复制正确链接')
      return
    }
    let urlstr=this.data.defaultUrl.match(reg)[0]
    wx.showLoading({
      title: '正在解析视频'
    })
    wx.cloud.callFunction({
      name:'test',
      data:{
        url:"api",
        link:urlstr
      },
      success(res){
        console.log(res)
        let result=res.result.body
        if(result.code!=200 || url==''){
          wx.hideLoading()
          a.showToast('解析失败,'+result.msg)
          return
        }
        let url=result.data.video_url
        wx.cloud.callFunction({
          name:'test',
          data:{
            url:"uploadFile",
            link:url
          },
          success(res){
            console.log(res.result)
            wx.hideLoading()
            wx.setStorageSync('fileID', res.result.fileID)
            wx.setStorageSync('dataUrl', url), app.globalData.videoSrc = url
            wx.navigateTo({
              url: '../../pages/video/video'
            })
          },
          fail(){
             wx.hideLoading()
              wx.setStorageSync('dataUrl', url)
              app.globalData.videoSrc = url
              wx.navigateTo({
                url: '../../pages/video/video'
              })
          }
        })
      }
    })
  },
  showToast: function(o) {
    var t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : "none", n = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : 1500
    wx.showToast({
        title: o,
        icon: t,
        duration: n
    })
}
})
