// pages/profile/childCpns/w-header/w-header.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    userInfo: {
      type: Object,
      value: {}
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    imgURL: "/assets/images/profile/avatar.png"
  },

  /**
   * 组件的方法列表
   */
  methods: {
    // loginClick(){
    //   this.triggerEvent('login',{},{})
    // },
    loginClick(e){
      this.triggerEvent('login', e.detail.userInfo)
    }
  }
})
