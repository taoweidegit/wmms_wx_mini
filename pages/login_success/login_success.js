// pages/login_success/login_success.js
Page({
  data: {
    
  },
  onLoad(options) {
    this.custom_login(options.eid)
    let access_token = wx.getStorageSync('access_token')
    this.get_rank(access_token)
    let rank = wx.getStorageSync('rank')
    console.log(rank)
  },
  get_rank(access_token){
    if (access_token != '')
    {
      // 获取user.rank
      wx.request({
        url: 'https://www.sandian.xyz/wx/rank',
        header: {
          'Authorization': 'Bearer ' + access_token // 默认值
        },
        method: 'POST',
        success(res) {
          if (res.data.code == 200)
            wx.setStorageSync('rank', res.data.rank)
        }
      })
    }
  },
  custom_login(eid) {
    wx.request({
      method: 'POST',
      url: 'https://www.sandian.xyz/user/get_access_token',
      data:{
        eid: eid,
        device: 1
      },
      header: {
        'content-type': 'application/json' // 默认值
      },
      success (res){
        if (res.data.code == 200)
          wx.setStorageSync('access_token', res.data.access_token)
      },
      fail (res){
        wx.showToast({
          title: '网络差',
        })
      }
    })
  }
})