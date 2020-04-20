import servicePath from "./../../utils/config";
import util from "./../../utils/util";

const loginCacheKey = "Login:Flag";
Page({
  /**
   * 页面的初始数据
   */
  data: {
    loginFlag: 0,
    tag: "登录/注册",
    bean: 0,
    options: [],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    util.request(servicePath.userPage).then((res) => {
      this.setData({
        options: res.data.optionData,
      });
    });

    this.setData({
      loginFlag: wx.getStorageSync(loginCacheKey) || 0,
    });
    if (this.data.loginFlag) {
      this.setData({
        tag: wx.getStorageSync("user").nickName,
      });
    } else {
      this.setData({
        tag: "登录/注册",
      });
    }
  },
  login() {
    if (this.data.loginFlag === 0) {
      wx.navigateTo({
        url: "../login/login?prev=user",
      });
    }
  },
  logout() {
    wx.setStorage({
      key: loginCacheKey,
      data: 0,
    });
    wx.setStorage({
      key: "user",
      data: {},
    });
    this.setData({
      loginFlag:0,
      tag: "登录/注册",
    });
  },
  showAbout() {
    // 跳转关于界面
    wx.navigateTo({
      url: "../about/about",
    });
  },
  showFeedback() {
    // 跳转反馈界面
    wx.navigateTo({
      url: "../feedback/feedback",
    });
  },
  showAppointment() {
    // 跳转预约界面
    if (this.data.loginFlag === 0) {
      wx.navigateTo({
        url: "../login/login?prev=appointment",
      });
    } else {
      wx.navigateTo({
        url: "../appointment/appointment",
      });
    }
  },
  showDiscount() {
    // 跳转优惠券界面
    if (this.data.loginFlag === 0) {
      wx.navigateTo({
        url: "../login/login?prev=discount",
      });
    } else {
      wx.navigateTo({
        url: "../discount/discount",
      });
    }
  },
  showOptions(e) {
    // 跳转账户选项界面
    let index = e.currentTarget.dataset.index;
    console.log(index);
    if (this.data.loginFlag === 0) {
      wx.navigateTo({
        url: "../login/login?prev=account",
      });
    } else if (index === 3) {
      wx.navigateTo({
        url: "../service/service",
      });
    } else {
      index = index + 1;
      if (index > 3) {
        index = 0;
      }
      // 使用storage携带index给下一个界面，否则无法在加载时渲染数据
      wx.setStorage({
        key: "account:index",
        data: index,
      });
      wx.navigateTo({
        url: "../account/account?index=" + index,
      });
    }
  },
  onShow() {
    this.onLoad();
  },
});
