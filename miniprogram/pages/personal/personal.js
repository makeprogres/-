import common from "../../utils/public.js"
let startY = 0;
let moveY = 0;
let moveDistance = 0;
const db = wx.cloud.database();
const app = getApp();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    coverTransform: "translateY(0)",
    coveTransition: "",
    userInfo: {},
    hasUserInfo: false,
    canIUseGetUserProfile: false,
    avatarUrl: "https://636c-cloud1-8g83xef220a33951-1305847147.tcb.qcloud.la/indexImg/missing-face.png?sign=ae580ad4639f2248b0fa6af0fcce63f6&t=1621826824",
    disable: true,
    declarationArr : [],
    declarations : '',
    i : 0
  },
  getData() {
    wx.cloud.callFunction({
      name:"login",
      data:{}
    }).then((res)=>{
      db.collection("tasklist").where({
        acceptID: app.userInfo._id,
        state:'已接受',
        complete:''
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
  onLoad() {
    this.getData();
    if (wx.getUserProfile) {
      this.setData({
        canIUseGetUserProfile: true
      })
    };
  },
  getUserProfile(e) {
    wx.getUserProfile({
      desc: '用于完善会员资料',
      success: (res) => {
        var userInfo = res.userInfo
        if(!this.data.hasUserInfo && userInfo){
          userInfo.school="";
          userInfo.college="";
          userInfo.declaration="";
          userInfo.achievement=50;
          db.collection("userInfo").add({
            data: userInfo
          }).then(res => {
            db.collection("userInfo").doc(res._id).get().then(res=>{
              app.userInfo = Object.assign(app.userInfo, res.data)
              this.setData({
                achievement:app.userInfo.achievement,
                avatarUrl: app.userInfo.avatarUrl,
                nickName:app.userInfo.nickName, 
                declaration:app.userInfo.declaration,
                _id:app.userInfo._id,
                hasUserInfo: true,
              })
            })
          })
        }
      },
    })
  },
  getUserInfo(e) {
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  },


  //下拉动画
  bindtouchstart(event) {
    this.setData({
      coveTransition: ""
    })
    startY = event.touches[0].clientY;
  },
  bindtouchmove(event) {
    moveY = event.touches[0].clientY;
    moveDistance = moveY - startY;
    if (moveDistance < 0) {
      return;
    }
    if (moveDistance >= 56) {
      return moveDistance = 56;
    }
    this.setData({
      coverTransform: `translateY(${moveDistance}rpx)`
    })
  },
  
  bindtouchend() {
    this.setData({
      coverTransform: `translateY(${0}rpx)`,
      coveTransition: "transform 1s linear"
    })
    var page = this.data.declarationArr.length
    db.collection("userInfo").skip(page).get().then(res=>{
      res.data.forEach(item=>{
        var oldDeclaration = this.data.declarationArr;
        var newDeclaration = oldDeclaration.concat(item.declaration)
        this.setData({
          declarationArr : newDeclaration
        })
      })
      var i = this.data.i
      this.setData({
        declarations : this.data.declarationArr[i],
        i : i + 1
      })
      if(i == this.data.declarationArr.length-1){
        this.setData({
          i : 0
        })
      } 
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    
    wx.cloud.callFunction({
      name:"login",
      data:{}
    }).then((res)=>{
      db.collection("userInfo").where({
        _openid : res.result.event.userInfo.openId
      }).get().then((res)=>{  
        if(res.data.length){
          app.userInfo = Object.assign(app.userInfo, res.data[0])
              this.setData({
                nickName:app.userInfo.nickName,
                avatarUrl: app.userInfo.avatarUrl,
                declaration:app.userInfo.declaration,
                _id:app.userInfo._id,
                achievement:app.userInfo.achievement,
                hasUserInfo: true,
              })
        }else{
          this.setData({
            disable: false
          })
        }
        
      })
    })

    
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    this.setData({
      nickName:app.userInfo.nickName,
      userInfo: app.userInfo,
      avatarUrl: app.userInfo.avatarUrl,
      _id:app.userInfo._id,
      declaration:app.userInfo.declaration,
      achievement:app.userInfo.achievement,
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