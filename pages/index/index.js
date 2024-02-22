// index.js

Page({
  data: {
    employee: '',
    is_success_wx_login: false
  },
  onLoad(){
    // 页面加载时，自动获取微信Id，若已完成绑定，页面自动跳转
    this.wx_login();
  },
  wx_login(){
    // 获取微信Id
    wx.login({
      success: (result) => {
        wx.request({
          method: 'GET',
          url: 'https://116.198.36.208:5000/wx/login',
          data: {
            'code': result.code,
            'employee': this.data.employee
          },
          success: (result) => {
            console.log(result.code)
            if (result.code == 200)
            {
              wx.showToast({
                title: '绑定成功',
              })
              this.data.is_success_wx_login = true
              let app = getApp()
              app.globalData.user_rank = result.rank
            }
            else if (result.code == 404)
              wx.showToast({
                title: '工号请求错误',
              })
            else if (result.code == 500)
              wx.showToast({
                title: '请求错误',
              })
          }
        });
      },
      fail: (err) => {
        console.log(err.errMsg)
      },
      complete: (res) => {
        if (this.data.is_success_wx_login)
        {
          // 跳转登录成功页面
          wx.redirectTo({
            url: 'url',
          })
        }
      },
    })
  },
  login(e){
    // 第一次将工号与微信进行绑定
    this.wx_login();
  },
  bindKeyInput(e){
    this.setData({
      employee: e.detail.value
    })
  }
})
