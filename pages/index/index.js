// index.js

Page({
  data: {
    employee: '',
    is_bind: false
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
          url: 'http://116.198.36.208:5000/wx/login',
          data: {
            'code': result.code,
            'employee': this.data.employee
          },
          success: (result) => {
            console.log(result.code)
            if (result.code == 200)
              this.data.is_bind=true;
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
      complete: (res) => {},
    })
  },
  login(e){
    // 第一次将工号与微信进行绑定
    this.wx_login();
    if (this.data.is_bind)
      wx.showToast({
        title: '绑定成功',
      })
  },
  bindKeyInput(e){
    this.setData({
      employee: e.detail.value
    })
  }
})
