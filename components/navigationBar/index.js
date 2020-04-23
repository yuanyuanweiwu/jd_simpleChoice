// components/navigationBar/index.js
const app = getApp()
Component({
  properties: {
    navbarData: {   //navbarData   由父页面传递的数据，变量名字自命名
      type: Object,
      value: {},
    }
  },
  data: {
    height: '',
    //默认值  默认显示左上角
    navbarData: {
      showCapsule: 1,
    }
  },
  attached: function () {
    // 定义导航栏的高度   方便对齐
    this.setData({
      height: app.globalData.height,
      top:app.globalData.top
    })
  },
  methods: {
    // 返回上一页面
    _navback() {
      wx.navigateBack()
    },
    //返回到首页
    _backhome() {
      wx.switchTab({
        url: '/pages/index/index',
      })
    }
  }
}) 
