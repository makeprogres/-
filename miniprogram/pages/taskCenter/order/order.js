import common from "../../../utils/public.js";
const db=wx.cloud.database()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    dataList:[]
  },
  //触底加载
  getNewData(){
    var page=this.data.dataList.length
    db.collection("tasklist").orderBy('timeStamp', 'desc').skip(page).limit(6).get().then(res=>{
      var oldData = this.data.dataList;
      var newData = oldData.concat(res.data)
      console.log(newData);
      //时间戳修改成具体时间
      res.data.forEach(item=>{
        item.timeStamp=common.getMyData(item.timeStamp,"Y-m-d H:i:s")
      })
      //截取文本
      res.data.forEach(item=>{
        item.title=common.getStrLen(item.title,16)
      })
      this.setData({
        dataList:newData
      })
      // console.log(datalist);
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getNewData()
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

    this.getNewData()
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})