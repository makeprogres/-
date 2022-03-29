
const db=wx.cloud.database();
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    listObj:{},
  },
  getData(_id){
    db.collection("tasklist").doc(_id).get().then(res=>{
      this.setData({
        listObj :res.data,
      })
      
    })
  },
  takeAccept(){
    var _id=this.data.listObj._id;
    console.log(_id);
    
    db.collection("tasklist").doc(_id).update({
      data:{
        Boolean:true,
        state:"已接受",
        acceptID : app.userInfo._id,
        complete:''
      }
    }).then(res=>{
      this.setData({
        listObj:{
          Boolean:false,
          complete:true
        }   
      })
      wx.showToast({
        title: '已领取',
        icon:"success",
        duration:3000,
        mask:true
      })
      wx.reLaunch({
        url: "/pages/order/order"
      })
    })  
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
  const {_id} = options
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