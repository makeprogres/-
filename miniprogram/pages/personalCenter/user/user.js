const db=wx.cloud.database();
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  //选择图片
  handChooseImg(){
    wx.chooseImage({
      success:(res)=>{
        console.log(res);
        this.setData({
          // avatarUrl:[...this.data.chooseImage,...res.tempFilePaths]
          avatarUrl:res.tempFilePaths[0]
        })
        console.log(this.data);
        db.collection("userInfo").doc(app.userInfo._id).update({
          data: {
            avatarUrl:res.tempFilePaths[0]
          }
        })
      }
    })
  },

  //获取用户信息
  getData(){
    this.setData({
      userObj: app.userInfo,
      avatarUrl: app.userInfo.avatarUrl
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getData()
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    wx.cloud.callFunction({
      name:"login",
      data:{}
    }).then((res)=>{
      db.collection("userInfo").where({
        _openid : res.result.event.userInfo.openId
      }).get().then((res)=>{  
        app.userInfo = Object.assign(app.userInfo, res.data[0])
              this.setData({
                userObj: app.userInfo,
                // avatarUrl: app.userInfo.avatarUrl
              })
      })
    })
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})