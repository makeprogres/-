// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()
const db=cloud.database()

// 云函数入口函数
exports.main = async (event, context) => {
  console.log(event);
  var num = event.num;
  // var fieldPath = event.fieldPath;
  return await db.collection("tasklist").orderBy('timeStamp', 'desc').limit(num).get()

}