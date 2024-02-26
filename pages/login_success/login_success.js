// pages/login_success/login_success.js
Page({
  data: {
  },
  onLoad(options) {
    this.get_rank(options.eid)
  },
  get_rank(eid) {
    wx.request({
      method: 'POST',
      url: 'https://www.sandian.xyz/user/get_access_token',
      data:{
        eid: eid,
        device: 1
      },
      success: (res) => {
        if (res.data.code == 200)
        {
          wx.setStorage({
            key: 'access_token',
            data: res.data.access_token,
          })
          wx.request({
            url: 'https://www.sandian.xyz/wx/rank',
            header: {
              'Authorization': 'Bearer ' + res.data.access_token // 默认值
            },
            method: 'POST',
            success:(res) => {
              if (res.data.code == 200)
                this.setData({
                  'rank': res.data.rank
                })
            }
          });
        }
      },
      fail (res){
        wx.showToast({
          title: '网络差',
        })
      }
    });
  },
  instock(){
    wx.getStorage({
      key: 'access_token',
      success (res) {
        wx.navigateTo({
          url: '../verification/verification?access_token=' + res.data,
        });
      }
    });
  }
})