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
    db.collection("userInfo").get().then(res=>{
      this.setData({
        ListOfLove:res.data,
      })   
    })
  },

  //获取任务数据库数据
  getData(nowTime){
  
    // this.setData({
    //   data:{
    //     nowTime
    //   }
    // })
    var time = this.data.time
    // console.log(this.data);
    nowTime=common.getMyData(time,"Y-m-d")
    // console.log(nowTime,"time");
    // this.setData({
    //   nowTime
    // })

    wx.cloud.callFunction({
      name:"getTaskList",
      data:{
        num:5,
        // fieldPath:timeStamp
      }
    }).then(res=>{
      //截取文本内容
      res.result.data.forEach(item=>{
        item.title=common.getStrLen(item.title,15)
      })
      this.setData({
        dataList:res.result.data 
      }) 
      //时间戳修改成具体时间

      res.result.data.forEach(item=>{    
        var oldTime = item.timeStamp 
        console.log(oldTime);
        item.timeStamp=common.getMyData(item.timeStamp,"Y-m-d",nowTime)

        if(nowTime == item.timeStamp){
          // db.collection("userInfo").get().then(res=>{
          //   console.log(res);
          // })
          item.timeStampp=common.getMyData(oldTime,"H:i:s")
          console.log(item.timeStamp);
          var timex = item.timeStamp
          this.setData({
            timex
          })
        }else{
          item.timeStamp=common.getMyData(oldTime,"Y-m-d H:i:s")
          console.log(item.timeStamp);
          var timex = item.timeStamp
          this.setData({
            timex
          })
        }
        console.log(this.data);
      })  
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var nowTime = Date.now();
    this.getData(nowTime),
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