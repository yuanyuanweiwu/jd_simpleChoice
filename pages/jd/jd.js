// pages/jd/jd.js
import util from "../../utils/util";
import servicePath from "./../../utils/config";
const app = getApp();
Page({
  /**
   * 页面的初始数据
   */
  data: {
    navbarData: {
      showCapsule: 1, //是否显示左上角图标   1表示显示    0表示不显示
      title: "商品详情", //导航栏 中间的标题,
    },
    height: app.globalData.height,
    goods: [], //所有商品信息,
    currData: {}, //当前商品,
    price_before_dot: "", // 价格小数点前的数字
    price_after_dot: "", // 价格小数点之后的数字
    imgList: [], // 所有图片的url地址
    infos: [], //详情图片集合
    self_sell: false, // 是否为自营店铺
    discountShow: false, // 是否显示优惠券卡片
    isGet: false, // 是否领取了优惠券
    choose_value: "版本一",
    num: 1,
    showModalStatus: false,
    floorstatus: false,
    scrollTop: 0,
    currentOption: 0, //默认选择版本
    choose_value: "版本一",
    allNum: 0,
  },
  /**
   * 显示大图
   */
  bigImage(e) {
    let index = e.currentTarget.dataset.index;
    let imgList = this.data.imgList;
    wx.previewImage({
      current: imgList[index],
      urls: imgList,
    });
  },
  /**
   * 显示优惠
   */
  showDiscount() {
    this.setData({
      discountShow: !this.data.discountShow,
    });
  },
  /**
   * 显示促销
   */
  showPromote() {
    // 显示和隐藏促销卡片
    this.setData({
      promoteShow: !this.data.promoteShow,
    });
  },
  /**显示modal */
  showModal() {
    let animation = wx.createAnimation({
      duration: 400,
      timingFunction: "linear",
    });
    this.animation = animation;
    animation.translateY(600).step();
    this.setData({
      animationData: animation.export(),
      showModalStatus: true,
    });

    var timer1 = setTimeout(
      function () {
        animation.translateY(0).step();
        this.setData({
          animationData: animation.export(),
        });
      }.bind(this),
      100
    );
    this.setData({
      timer1,
    });
  },
  /**隐藏modal */
  hideModal() {
    let animation = wx.createAnimation({
      duration: 400,
      timingFunction: "linear",
    });
    this.animation = animation;
    animation.translateY(300).step();
    this.setData({
      animationData: animation.export(),
    });
    var timer2 = setTimeout(
      function () {
        animation.translateY(0).step();
        this.setData({
          animationData: animation.export(),
          showModalStatus: false,
        });
      }.bind(this),
      300
    );
    this.setData({
      timer2,
    });
  },
  scroll(e) {
    let floorstatus = false;
    if (e.detail.scrollTop > 300) {
      floorstatus = true;
    }
    this.setData({
      floorstatus,
    });
  },
  /**回到顶部 */
  goTop() {
    this.setData({
      scrollTop: 0,
    });
  },
  /**选择类型 */
  select(e) {
    let currType = e.currentTarget.dataset.type;
    let currId = e.currentTarget.dataset.id;
    this.setData({
      currentOption: parseInt(currId),
      choose_value: currType,
    });
  },
  /**加入购物车 */
  addCart() {
    this.hideModal()
    // 真正实现添加购物车的部分
    let cartData = wx.getStorageSync("cart") || [];
    let count = 0;
    cartData.map((val) => {
      if (val.title === this.data.currData.title && val.type === this.data.choose_value) {
        val.num += this.data.num;
        count++; // 标记是否有找到相同的商品
      }
    });
    if (count === 0) {
      // 没找到 添加新的商品信息进购物车
      let data = {
        id:  this.data.currData._id,
        title:  this.data.currData.title,
        weight: "0.78kg",
        type: this.data.choose_value,
        num: this.data.num,
        price:  this.data.currData.plain_price,
        img:  this.data.currData.thumb,
        discount: 20,
        select: true, // 是否选中，方便后续计算总价
      };
      cartData.push(data);
    }
    // 刷新购物车图标上的数量
    let allNum = 0;
    cartData.forEach((val) => {
      allNum += val.num;
    });
    console.log(allNum, "num");
    this.setData({
      allNum,
    });
    wx.setStorage({
      key: "cart",
      data: cartData,
    });
  },
  change_num(){
    let cartgoods = wx.getStorageSync('cart') || [];
    let allNum = 0
    cartgoods.forEach(val => {
      allNum += val.num
    });
    this.setData({
      allNum
    })
  },
  onChange(e) {
    let num = e.detail;
    let minShow = false;
    if (num === 1) {
      minShow = true;
    }
    this.setData({
      num,
      minShow,
    });
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let id = options.id;
    util.request(servicePath.goodsPage).then((res) => {
      const goods = res.data.goods;
      const currData = goods.find((item) => item._id === id);
      let split = currData.plain_price.split(".");
      let self_sell = false;
      if (
        currData.store.indexOf("京东") >= 0 ||
        currData.store.indexOf("自营") >= 0
      ) {
        self_sell = true;
      }
      this.setData({
        goods,
        currData,
        infos: currData.infos,
        imgList: currData.images,
        price_before_dot: split[0],
        price_after_dot: split[1],
        self_sell,
      });
    });
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {},

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    this.change_num()
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {},

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnLoad() {
    clearTimeOut(this.data.timer1);
    clearTimeOut(this.data.timer2);
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {},

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {},

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
    return {
      title: this.data.currData.title,
      path: "pages/jd/jd?id" + this.data.id,
      imageUrl: this.data.imgList[0], // 设置分享的时候显示的图片(大图的第一张)
      success: function () {
        console.log("分享成功");
      },
    };
  },
});
