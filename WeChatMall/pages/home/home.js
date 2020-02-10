import {
  getMultiData,
  getGoodsData
} from "../../service/home.js"
const types = ['pop', 'new', 'sell'];
Page({
  data: {
    banners: [],
    recommends: [],
    titles: ['流行', '新款', '精选'],
    goods: {
      "pop": {page: 0, list: []},
      "new": {page: 0, list: []},
      "sell": {page: 0, list: []}
    },
    currentType: "pop",
    showBackTop: false,
    isTabFixed: false,
    tabScrollTop: 0
  },
  _getMultiData(){
    getMultiData().then(res => {
      const banners = res.data.data.banner.list.map(item => {
        return item.image
      })
      const recommends = res.data.data.recommend.list
      this.setData({
        banners,
        recommends
      })
    })
  },
  
  _getGoodsData(type){
    const page = this.data.goods[type].page + 1
    getGoodsData(type, page).then(res => {
      const list = res.data.data.list;
      const goods = this.data.goods;
      goods[type].list.push(...list)
      goods[type].page += 1;

      // 3.最新的goods设置到goods中
      this.setData({
        goods: goods
      })
      // const oldList = this.data.goods[type].list;
      // oldList.push(...list)
      // const typeKey = `goods.${type}.list`
      // const pageKey = `goods.${type}.page`
      // this.setData({
      //   [typeKey]: oldList,
      //   [pageKey]: page
      // })
      // this.data.goods[type].list.push(...list)
    }).catch(err => {
      console.log(err)
    })
  },

  handleTabClick(event){
    const index = event.detail.index
    this.setData({
      currentType: types[index]
    })
  },

  handleImageLoad(){
    wx.createSelectorQuery().select('#tab-control').boundingClientRect(rect => {
      this.data.tabScrollTop = rect.top
    }).exec()
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this._getMultiData()
    this._getGoodsData('pop')
    this._getGoodsData('new')
    this._getGoodsData('sell')
  },
  

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    this._getGoodsData(this.data.currentType)
  },

  onPageScroll(options){
    const scrollTop = options.scrollTop;
    const backFlag = scrollTop >= 550;
    if(backFlag != this.data.showBackTop){
      this.setData({
        showBackTop: backFlag
      })
    }
    const tabFlag = scrollTop >= this.data.tabScrollTop
    if(tabFlag != this.data.isTabFixed){
      this.setData({
        isTabFixed: tabFlag
      })
    }
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})