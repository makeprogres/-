import common from "../../utils/public.js"
const db = wx.cloud.database();
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  getData() {
    wx.cloud.callFunction({
      name:"login",
      data:{}
    }).then((res)=>{
      db.collection("tasklist").where({
        useId : app.userInfo.openId
      }).orderBy('timeStamp', 'desc').get().then((res)=>{  
        res.data.forEach(item=>{     
          item.timeStamp=common.getMyData(item.timeStamp,"Y-m-d H:i:s")
        })
        this.setData({
          listObj: res.data,
        })
      })
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // const {_id} = options;
    // console.log(_id);
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