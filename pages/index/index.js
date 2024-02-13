// index.js

Page({
  data: {
    employee: '',
    token: ''
  },
  onLoad(){
    // 页面加载时，自动获取微信Id，若已完成绑定，页面自动跳转
    this.wx_login();
  },
  wx_login(){
    // 获取微信Id
    wx.login({
      success: (result) => {
        this.data.token = result.code
      },
      fail: (err) => {
        console.log(err.errMsg)
      },
      complete: (res) => {},
    })
  },
  login(e){
    // 第一次将工号与微信进行绑定
    if (this.data.token == '')
      this.wx_login();
    console.log(this.data.employee + ' ' + this.data.token)
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
