// pages/jd/jd.js
import util from "../../utils/util";
import servicePath from "./../../utils/config";
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    navbarData: {
      showCapsule: 1, //是否显示左上角图标   1表示显示    0表示不显示
      title: '商品详情', //导航栏 中间的标题,
    },
    height:app.globalData.height,
    goods:[],//所有商品信息,
    currData:{},//当前商品,
    price_before_dot: '', // 价格小数点前的数字
    price_after_dot: '', // 价格小数点之后的数字
    imgList: [], // 所有图片的url地址
    self_sell: false, // 是否为自营店铺
    discountShow: false, // 是否显示优惠券卡片
    isGet: false, // 是否领取了优惠券
  },
  /**
   * 显示大图
   */
  bigImage(e){
   let index=e.currentTarget.dataset.index
   let imgList=this.data.imgList
   wx.previewImage({
     current: imgList[index],
     urls: imgList,
   });
  },
  /**
   * 显示优惠
   */
  showDiscount(){
    this.setData({
      discountShow:!this.data.discountShow
    })
  },
  /**
   * 显示促销
   */
  showPromote() { // 显示和隐藏促销卡片
    this.setData({
      promoteShow: !this.data.promoteShow
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

    let id=options.id
    util.request(servicePath.goodsPage).then((res) => {
      const goods = res.data.goods;
      const currData=goods.find(item=>item._id===id)
      let split=currData.plain_price.split('.')
      let self_sell=false
      if (currData.store.indexOf("京东") >= 0 || currData.store.indexOf("自营") >= 0) {
        self_sell = true
      }
      this.setData({
        goods,
        currData,
        imgList: currData.images,
        price_before_dot: split[0],
        price_after_dot: split[1],
        self_sell
      });
    });
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

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
    return {
      title: this.data.currData.title,
      path: 'pages/jd/jd?id' + this.data.id,
      imageUrl: this.data.imgList[0], // 设置分享的时候显示的图片(大图的第一张)
      success: function () {
        console.log('分享成功')
      }
    }
  }
})