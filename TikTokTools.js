//auto.waitFor() // 检查是否开启无障碍模式
//auto("fast") // 开启快速模式

// 获取时间格式
Date.prototype.Format = function (fmt) {
    var o = {
        "M+": this.getMonth() + 1, //月份 
        "d+": this.getDate(), //日 
        "H+": this.getHours(), //小时 
        "m+": this.getMinutes(), //分 
        "s+": this.getSeconds(), //秒 
        "q+": Math.floor((this.getMonth() + 3) / 3), //季度 
        "S": this.getMilliseconds() //毫秒 
    };
    if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
    for (var k in o)
    if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
    return fmt;
}

var getTime=function(){
    let day=(new Date).Format("yyyy-MM-dd")
    return day
}

var DownloadVideos=function(){
    const day=getTime()
    //http://tiktokbot.emarkdigital.tech/2023-01-05/us/today_hot_video_compress.mp4
    const videoUrl="http://tiktokbot.emarkdigital.tech/"+day+"/us/today_hot_video_compress.mp4"
    
}

var AppRunning=function(appName){
    var packageName=getPackageName(appName)
    app.launch(packageName)
    console.log("start up :",appName)

    while(!click('Profile'));
    while(!click('Upload'));

}

//var appRunning=new AppRunning("TikTok")
var downloadVideos=new DownloadVideos()