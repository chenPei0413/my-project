// pages/profile/profile.js
const app = getApp()
let userInfo = {};

// import {login} from "../../service/login.js"

Page({
  data: {
    userInfo: {},
    orderList: [
      {icon: 'message.png', info: '我的消息'},
      {icon: 'pointer.png', info: '积分商城'},
      {icon: 'vip.png', info: '会员卡'}
    ],
    serviceList: [
      {icon: 'cart.png', info: '我的购物车'},
      {icon: 'app.png', info: '下载购物APP'}
    ]
  },
  onLoad: function(){
    // this._userInfo()
  },
  _userInfo(){
    if (app.globalData.userInfo) {
      userInfo = app.globalData.userInfo
      this.setData({
        hasUserInfo: true
      })
    } else if (this.data.canIUse){
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        userInfo = app.globalData.userInfo
        this.setData({
          hasUserInfo: true
        })
      }
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo
          userInfo = app.globalData.userInfo
          this.setData({
            hasUserInfo: true
          })
        }
      })
    }
  },
  loginClick(e){
    wx.showModal({
      content: '确定授权登录吗？',
      success: res => {
        if (res.confirm) {
          this.setData({
            userInfo: e.detail
          })
        } else if (res.cancel) {
          wx.showToast({
            title: '取消登录',
            icon: 'success',
            duration: 2000
          })
        }
      }
    })
  }
})