// pages/login_success/login_success.js
Page({
  data: {
    
  },
  onLoad(options) {
    console.log(options)
    this.get_unverficated_ware_list()
    // console.log(wx.getStorageSync('in_stock_list'))
    console.log(this.data)
  },
  onPullDownRefresh() {
    this.get_unverficated_ware_list()
    console.log(wx.getStorageSync('in_stock_list'))
  },
  get_unverficated_ware_list(){
    var that = this
    wx.request({
      url: 'https://www.sandian.xyz/stock/instock/query',
      method: 'GET',
      success (res){
        that.setData({
          'in_stock_list': res.data
        })
      }
    })
  }
})