const request=url=>{
  wx.showLoading({
    titlw:'加载中'
  })
  return new Promise((resolve,reject)=>{
    wx.request({
      url:url,
      success(res){
        wx.hideLoading()
        resolve(res)
      },
      fail(res){
        wx.hideLoading()
        reject(res)
      },
      complete(){
        wx.hideLoading()
      }
    })
  })
}
module.exports = {
  request
}
