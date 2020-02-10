// pages/category/category.js
import {
  getCategory,
  getSubcategory,
  getCategoryDetail
} from '../../service/category.js'
Page({
  data: {
    categories: [],
    categoryData: {
    },
    currentIndex: 0
  },
  onLoad: function (options) {
    this._getCategory()

  },
  _getCategory(){
    getCategory().then(res => {
      const categories = res.data.data.category.list;
      const categoryData = {}
      for(let i=0; i<categories.length; i++){
        categoryData[i] = {
          subcategories: [],
          categoryDetail: []
        }
      }
      this.setData({
        categories: categories,
        categoryData: categoryData
      })
      this._getSubcategory(0)
      this._getCategoryDetail(0)
    })
  },
  _getSubcategory(currentIndex){
    const maitkey = this.data.categories[currentIndex].maitKey;
    getSubcategory(maitkey).then(res => {
      const tempCategoryData = this.data.categoryData;
      tempCategoryData[currentIndex].subcategories = res.data.data.list
      this.setData({
        categoryData: tempCategoryData
      })
    })
  },
  _getCategoryDetail(currentIndex){
    const miniWallKey = this.data.categories[currentIndex].miniWallkey;
    this._getRealCategoryDetail(currentIndex, miniWallKey, 'pop');
  },
  _getRealCategoryDetail(index, miniWallKey, type) {
    getCategoryDetail(miniWallKey, type).then(res => {
      // 1.获取categoryData
      const categoryData = this.data.categoryData;
      // 2.修改数据
      categoryData[index].categoryDetail = res;
      // 3.修改data中的数据
      this.setData({
        categoryData: categoryData
      })
      console.log(this.data.categoryData)
    })
  },
  menuClick(e) {
    // 1.改变当前的currentIndex
    const currentIndex = e.detail.currentIndex;
    this.setData({
      currentIndex
    })

    // 2.请求对应currentIndex的数据
    this._getSubcategory(currentIndex);

    // 3.请求对应的currentIndex的详情数据
    this._getCategoryDetail(currentIndex)
  }
})