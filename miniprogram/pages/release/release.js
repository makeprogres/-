const db = wx.cloud.database();
const app = getApp();
Page({
  /**
   * 页面的初始数据
   */
  data: {
    array: ['男生', '女生', '不限制'],
    index: 0,
    time: "现在出发",
    chooseImage: [],
    textVal: ""
  },
  chooseImage: [],
  //更改时间
  bindTimeChange: function (e) {
    this.setData({
      time: e.detail.value
    })
  },
  //选择图片
  handChooseImg() {
    wx.chooseImage({
      success: (res) => {
        this.setData({
          chooseImage: [...this.data.chooseImage, ...res.tempFilePaths]
        })
      }
    })
  },
  //删除图片
  handRemoveImg(e) {
    const {
      index
    } = e.currentTarget.dataset;
    var {
      chooseImage
    } = this.data;
    chooseImage.splice(index, 1);
    this.setData({
      chooseImage
    })
  },
  //选择性别
  bindPickerChange: function (e) {
    this.setData({
      index: e.detail.value
    })
  },
  //是否可拨打电话
  bindChooseChange(res) {
    this.setData({
      Boolean: res.detail.value
    })
  },
  //保存到数据库

  saveCloud(data,images,achievement) {
    db.collection("userInfo").doc(app.userInfo._id).update({
      data: {
        achievement : achievement
      }
    }).then(res=>{
      app.userInfo.achievement = achievement
    })
    data.images = images;
    data.timeStamp = Date.now();
    // data.Boolean = false;
    data.userId = app.userInfo._id;
    data.state = "";
    data.acceptID = "";
    db.collection('tasklist').add({
      data: data
    }).then(res => {
      db.collection("tasklist").doc(res._id).get().then(res=>{
        app.tasklist = Object.assign(app.tasklist, res.data[0])})

      wx.showToast({
        title: '发布成功',
      })
      wx.reLaunch({
        url: "/pages/order/order"
      })
    }).catch(err => {
      wx.showModal({
        title: '发布失败',
        showCancel: false,
      })
    })
  },
  //提交表单
  btnSub(res) { // response
    var formValues = res.detail.value;
    if(formValues.reward > app.userInfo.achievement){
      wx.showToast({
        title: "任务奖励超出自身拥有，请重新输入",
        icon: "none"
      })
      return;
    } else{
      var achievement = app.userInfo.achievement - formValues.reward
      const {
        chooseImage
      } = this.data;
      this.uploadImages(chooseImage, (res) => {
        var images = res
        this.setData({
          chooseImage: images
        })
        const data = formValues;
        const phone = data.phone
        let phoneReg = /^1(3|4|5|6|7|8|9)\d{9}$/;
        
        if (this.data.Boolean) {
          if (!phoneReg.test(phone)) {
            wx.showToast({
              title: "手机号格式错误，请重新输入",
              icon: "none"
            })
            return;
          } else{
            this.saveCloud(data,images,achievement)
          }
        } else {
          this.saveCloud(data,images,achievement)
        }
  
      }, err => {
        console.error(err)
      })
    }
  },


  //更改保存图片名称
  uploadImages(imagePaths, success, fail) {
    const images = [];
    imagePaths.forEach(imgPath => {
      const fileName = Date.now().toString() + Math.floor(Math.random() * 10000) + "_" + '.jpg';
      wx.cloud.uploadFile({
        filePath: imgPath,
        cloudPath: fileName,
        success: (res) => {
          images.push(res.fileID)
          if (images.length === imagePaths.length) {
            success(images)
          }
        },
        fail: err => {
          fail(err)
        }
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