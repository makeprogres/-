var common={
  //截取文本长度
  getStrLen:function(str,len){
    if(str.length>len){
      return str.substr(0,len)+"..."
    } else{
      return str
    }
  },
  //时间戳换成时间
  getMyData:function (timestamp, formats,nowTime) {
    // formats格式包括
    // 1. Y-m-d
    // 2. Y-m-d H:i:s
    // 3. Y年m月d日
    // 4. Y年m月d日 H时i分
    // formats = formats || 'Y-m-d';

    var zero = function (value) {
        if (value < 10) {
            return '0' + value;
        }
        return value;
    };

    // timestamp = timestamp*1000
    var myDate = timestamp? new Date(timestamp): new Date();
    var year = myDate.getFullYear();
    var month = zero(myDate.getMonth() + 1);
    var day = zero(myDate.getDate());
    var hour = zero(myDate.getHours());
    var minite = zero(myDate.getMinutes());
    var second = zero(myDate.getSeconds());

    var newData = nowTime? new Date(nowTime): new Date()
    var newyear = newData.getFullYear();
    var newmonth = zero(newData.getMonth() + 1);
    var newday = zero(newData.getDate());
    if(year==newyear||month==newmonth||day==newday){
      return formats.replace(/H|i|s/ig, function (matches) {
        return ({
            H: hour,
            i: minite,
            s: second
        })[matches];
    });
    }else{
      return formats.replace(/Y|m|d|H|i|s/ig, function (matches) {
        return ({
            Y: year,
            m: month,
            d: day,
            H: hour,
            i: minite,
            s: second
        })[matches];
    });
    }

}
}
module.exports=common