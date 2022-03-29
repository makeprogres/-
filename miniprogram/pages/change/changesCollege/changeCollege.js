const db = wx.cloud.database();
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },
  //获取个人信息
  getData(_id) {
    db.collection("userInfo").doc(_id).get().then(res => {
      this.setData({
        userObj: res.data,
        _id
      })
    })
  },
  saveValue(res) {
    var resValue = res.detail.value;
    this.setData({
      college: resValue
    })
    var _id = this.data._id
    db.collection("userInfo").doc(_id).update({
      data: {
        college: resValue.college
      }
    })
    wx.navigateBack({
      delta : 1
    })


  },


  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    const {
      _id
    } = options;
    this.getData(_id)
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