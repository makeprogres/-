
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
      console.log(res);
      this.setData({
        listObj :res.data,
      })
      console.log(this.data);
    })
  },

  getComplete(){
    var achievement = app.userInfo.achievement*1 + this.data.listObj.reward*1
    console.log(this.data);
    db.collection("userInfo").doc(app.userInfo._id).update({
      data: {
        achievement : achievement
      }
    }).then(res=>{
      app.userInfo.achievement = achievement;
      this.setData({
        listObj:{
          Boolean:false,
          complete:true
        }   
      })
    })

    const _id = this.data.listObj._id;
    db.collection("tasklist").doc(_id).update({
      data: {
        Boolean:false,
        complete:"已完成"
      }
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