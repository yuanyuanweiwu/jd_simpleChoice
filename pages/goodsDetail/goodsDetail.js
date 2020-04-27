// pages/goodsDetail/goodsDetail.js
import util from "../../utils/util.js";
import servicePath from "./../../utils/config";
Page({
  /**
   * 页面的初始数据
   */
  data: {
    goods: {},
    comments: [],
    id: null,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let id = options.id;

    let goods = {};
    let comments = [];
    util.request(servicePath.goodsPage).then((res) => {
      res.data.goods.forEach((item) => {
        if (item._id === id) {
          goods = item;
        }
      });
      res.data.comments.forEach((item) => {
        if (item.goods === goods.title) {
          comments.push(item);
        }
      });
      wx.setStorage({
        key: 'comments',
        data: comments,

      });
      goods.content = goods.content
        .replace(/(。)/g, "。\n\n")
        .replace(/(~)/g, "~\n\n");
      console.log(goods)
      this.setData({
        id,
        goods,
        comments: comments.reverse().slice(0, 3),
      });
    });
  },

  goComments:function () {
    wx.navigateTo({
      url: '../commentDetail/commentDetail',
      success: (result)=>{
        
      },
      fail: ()=>{},
      complete: ()=>{}
    });
  },
  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
    return {
      title: this.data.goods[0].title,
      path: "pages/goodsDetail/goodsDetail?id=" + this.data.id,
      success: function () {
        console.log("分享成功");
      },
    };
  },
  defaultTap(){
    wx.navigateTo({
      url: '/pages/jd/jd?id'+this.data.id,
      success: (result)=>{
        
      },
      fail: ()=>{},
      complete: ()=>{}
    });
  }
});
