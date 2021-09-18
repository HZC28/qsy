//获取应用实例
var app = getApp(), n = ''
Page({
    data: {
        videoSrc: '',
        dataUrl: '',
        savabtn:true,
        saveSucess:false
    },
    onLoad: function () {
        console.log(app.globalData.videoSrc)
        this.setData({
            dataUrl: app.globalData.videoSrc
        })
    },
    setClipboard(){
        console.log(1313)
        wx.setClipboardData({  data: app.globalData.videoSrc})
    },
    getdataUrl: function (o) {
        return wx.getStorageSync(o)
    },
    onUnload: function () {
        n && n.abort()
    },
    goBack: function () {
        n ? (n.abort(), setTimeout(function () {
            wx.navigateBack({
                delta: 1
            })
        }, 1e3)) : wx.navigateBack({
            delta: 1
        })
    },
    download:async function () {
        if(this.data.saveSucess==true){
            this.showToast('视频已保存，无需重复保存')
            return
        }
        if(this.data.savabtn==false){
            return
        }
        this.setData({
            savabtn: false
        })
       
        var t = this, e = t.data.dataUrl // o.default + '/downVideo.php?url=' + this.data.dataUrl
        let result1=await wx.cloud.callFunction({
            name:'test',
            data:{
              url:"getTime"
            }
        })
        if(result1.result.data[0].download_time>=3){
            this.showToast('当日下载次数已用完，请点击复制链接到浏览器下载或者第二天下载')
            this.setData({
                savabtn: true
            })
            return
        }
        wx.showLoading({
            title: '保存中 0%'
        }), (n = wx.cloud.downloadFile({
            fileID:  wx.getStorageSync('fileID'),
            success: function (o) {
                wx.hideLoading(), wx.saveVideoToPhotosAlbum({
                    filePath: o.tempFilePath,
                    success: function (o) {
                        t.showToast('保存成功', 'success'), setTimeout(function () {
                            t.setData({
                                savabtn: true,
                                saveSucess:true
                            })
                            wx.cloud.callFunction({
                                name:'test',
                                data:{
                                  url:"downloadTime"
                                }
                            })
                        }, 1e3)
                    },
                    fail: function (o) {
                        t.showToast('保存失败')
                        t.setData({
                            savabtn: true
                        })
                    }
                })
            },
            fail: function (o) {
                this.setData({
                    savabtn: true
                })
                n = null, wx.hideLoading(), t.showToast('下载失败')
            }
        })).onProgressUpdate(function (o) {
            100 === o.progress ? '' : wx.showLoading({
                title: '保存中 ' + o.progress + '%'
            })
        })
    },
    postSave: function (o) {
        var t = this
        wx.getSetting({
            success: function (o) {
                o.authSetting['scope.writePhotosAlbum'] ? t.download() : wx.authorize({
                    scope: 'scope.writePhotosAlbum',
                    success: function () {
                        t.download()
                    },
                    fail: function (o) {
                        wx.showModal({
                            title: '提示',
                            content: '视频保存到相册需获取相册权限请允许开启权限',
                            confirmText: '确认',
                            cancelText: '取消',
                            success: function (o) {
                                o.confirm ? (wx.openSetting({
                                    success: function (o) { }
                                })) : ''
                            }
                        })
                    }
                })
            }
        })
    },
    showToast: function (o) {
        var t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : 'none', n = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : 1500
        wx.showToast({
            title: o,
            icon: t,
            duration: n
        })
    }
})
