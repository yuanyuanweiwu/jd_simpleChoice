// miniprogram/pages/login/login.js
const loginCacheKey = "Login:Flag";
Page({
  data: {
    prev: "",
  },
  onLoad(options) {
    
    let pages = getCurrentPages(); // 当前界面
    let prevpage = pages[pages.length - 2]; // 跳转过来的界面
    this.setData({
      prev: options.prev,
    });
    wx.getSetting({
      success: (res) => {
        console.log(res,111)
        if (res.authSetting["scope.userInfo"]) {
          wx.getUserInfo({
            success: (result) => {
              wx.setStorage({
                key: "user",
                data: result.userInfo,
              });
            },
          });
        } else {
          wx.openSetting();
        }
      },
      fail: () => {},
      complete: () => {},
    });
  },

  bindGetUserInfo(e) {
    var that = this;
    wx.login({
      success: (res) => {
        wx.setStorage({
          key: loginCacheKey,
          data: 1,
        });
        wx.setStorage({
          key: "user",
          data: e.detail.userInfo,
        });
        if (that.data.prev === "user") {
          wx.switchTab({
            url: "../user/user",
          });
        } else if (that.data.prev === "cart") {
          wx.switchTab({
            url: "../shopCart/shopCart",
          });
        } else {
          wx.navigateTo({
            url: "../" + that.data.prev + "/" + that.data.prev,
          });
        }
      },
      fail: () => {},
      complete: () => {},
    });
  },
});
