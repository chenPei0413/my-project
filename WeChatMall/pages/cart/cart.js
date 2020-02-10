// pages/cart/cart.js
const app = getApp()


Page({
  data: {
    cartList: [],
    isSelectAll: false,
    totalPrice: 0,
    totalCounter: 0
  },
  onLoad: function (options) {
    this.setData({
      cartList: app.globalData.cartList
    })
    app.addCartCallback = () => {
      this.setData({
        cartList: app.globalData.cartList
      })
      this.changeData()
    }
    app.changeGoodsState = (index, goods) => {
      // 1.修改某一项的选中状态
      this.setData({
        [`cartList[${index}]`]: goods
      })

      // 2.修改全部选中的状态
      const selectAll = !this.data.cartList.find(item => !item.checked)
      this.setData({
        isSelectAll: selectAll
      })
      this.changeData()
    }
  },
  onShow: function () {
    this.changeData()
    wx.setNavigationBarTitle({
      title: `购物车(${this.data.cartList.length})`,
    })
  },
  changeData(){
      let totalPrice = 0;
      let counter = 0;
      for(let item of this.data.cartList){
        if(item.checked){
          counter++;
          totalPrice += item.price * item.count;
        }
      }
      this.setData({
        totalCounter: counter,
        totalPrice: totalPrice
      })
  },
  onSelectAll(){
    if(this.data.isSelectAll){
      this.data.cartList.forEach(item => {
        item.checked = false;
      })
      this.setData({
        cartList: this.data.cartList,
        isSelectAll: false
      })
    }else{
      this.data.cartList.forEach(item => {
        item.checked = true;
      })
      this.setData({
        cartList: this.data.cartList,
        isSelectAll: true
      })
    }
    this.changeData()
  }
}) 