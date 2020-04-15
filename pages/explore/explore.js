// pages/explore/explore.js
import util from "../../utils/util";
import servicePath from "./../../utils/config";
Page({
  /**
   * 页面的初始数据
   */
  data: {
    goods: [], // 所有商品
    currData: [], // 当前分类下商品
    currentTab: 0,
    navScrollLeft: 0,
    category: "0", // 默认导航显示全部
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    util.request(servicePath.explorePage).then((res) => {
      const navData = res.data.navData;
      this.setData({
        navData,
      });
    });
    util.request(servicePath.goodsPage).then((res) => {
      this.setData({
        goods: res.data.goods,
        currData: res.data.goods,
      });
    });
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    wx.showToast({
      title: "人家可是有底线的",
      icon: "none",
      duration: 1000,
    });
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
    return {
      title: "什么值得买京东优选",
      path: "pages/index/index",
      success: function () {
        console.log("success");
      },
    };
  },

  scrollViewClick: function (e) {
    let current = e.target.dataset.current;
    let currData = [];
    if (current == 0) {
      currData = this.data.goods;
    } else {
      this.data.goods.forEach((element) => {
        if (element.category === current.toString()) {
          currData.push(element);
        }
      })
    }
    this.setData({
      currentTab:current,
      currData
    })
  },
  goDetail(e){
    let id=e.currentTarget.dataset.id
     wx.navigateTo({
       url: '../goodsDetail/goodsDetail?id='+id,
       success: (result)=>{
        //console.log("goodsDetail跳转成功");
       },
       fail: ()=>{
        console.log("goodsDetail跳转失败");
       },
       complete: ()=>{}
     });
  }
});
