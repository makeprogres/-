import common from "../../utils/public.js"
const db = wx.cloud.database()
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  //获取爱心榜数据
  getUser(){
    db.collection("userInfo").orderBy('num', 'desc').limit(5).get().then(res=>{
      res.data.forEach(item=>{
        item.nickName=common.getStrLen(item.nickName,3)
        item.college=common.getStrLen(item.college,4)
      })
      this.setData({
        ListOfLove:res.data,
      })   
    })
  },

  //获取任务数据库数据
  getData(time){
    this.setData({
      data:{
        time
      }
    })
    var time = this.data.time
    time=common.getMyData(time,"Y-m-d H:i:s")
    db.collection("tasklist").orderBy('timeStamp', 'desc').limit(5).get().then(res=>{
      //时间戳修改成具体时间
      res.data.forEach(item=>{     
        item.timeStamp=common.getMyData(item.timeStamp,"Y-m-d H:i:s")
      })
      //截取文本内容
      res.data.forEach(item=>{
        item.title=common.getStrLen(item.title,15)
      })

      this.setData({
        dataList:res.data,
      })   
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var time = Date.now();
    this.getData(time),
    this.getUser()
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