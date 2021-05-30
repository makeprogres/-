
const db = wx.cloud.database();
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  btnSub(res){
    var formValues = res.detail.value;
    formValues.time = Date.now();
    formValues.nickName = app.userInfo.nickName;
    db.collection('Thank_you_note').add({
      data: formValues
    }).then(res=>{
      db.collection("Thank_you_note").doc(res._id).get().then(res=>{
        app.Thank_you_note = Object.assign(app.Thank_you_note, res.data)})
      console.log(app.Thank_you_note);
      wx.showToast({
        title: '发布成功',
      })
      wx.reLaunch({
        url: "/pages/note/note"
      })
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

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