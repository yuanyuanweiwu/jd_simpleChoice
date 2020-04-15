import util from "../../utils/util";
import servicePath from "./../../utils/config";
//获取应用实例
const app = getApp();

Page({
  data: {
    goods: [],
  },
  onLoad: function () {
    util.request(servicePath.goodsPage).then((res) => {
      console.log(res);
      this.setData({
        goods: res.data.goods,
      });
    });
  },
  onPullDownRefresh() {
    wx.showToast({
      title: "刷新完成",
      icon: "success",
      duration: 1500,
    });
  },
  onReachBottom() {
    wx.showToast({
      title: "人家可是有底线的",
      icon: "none",
      duration: 1000,
    });
  },
  onShareAppMessage() {
    return {
      title: "什么值得买京东优选",
      path: "pages/index/index",
      success: function () {
        console.log("success");
      },
    };
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
