const app = getApp()
export function login(){
  
  let userInfo = {}
  wx.getUserInfo({
    success: res => {
      app.globalData.userInfo = res.userInfo
      userInfo = app.globalData.userInfo
    }
  })
  
}