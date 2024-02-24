// index.js

Page({
  data: {
    employee: '',
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
          url: 'https://www.sandian.xyz/wx/login',
          data: {
            'code': result.code,
            'employee': this.data.employee
          },
          success: (result) => {
            console.log(result.data)
            if (result.data.code == 404 && this.data.employee == '')
            {
              console.log('未绑定')
            }
            else if (result.data.code == 200)
            {
              wx.showToast({
                title: '绑定成功',
              })
              setTimeout(function(){ 
                wx.redirectTo({
                  url: '../login_success/login_success?eid=' + result.data.eid,
                })
              }, 1500); 
            }
            else if (result.data.code == 404)
              wx.showToast({
                title: '工号请求错误',
              })
            else if (result.data.code == 500)
            {
              wx.showToast({
                title: '请求错误',
              })
            }
          }
        });
      },
      fail: (err) => {
        console.log(err.errMsg)
      },
      complete: (res) => {
      },
    })
  },
  login(e){
    // 第一次将工号与微信进行绑定
    this.wx_login();
  },
  bindEidInput(e){
    this.setData({
      employee: e.detail.value
    })
  }
})
