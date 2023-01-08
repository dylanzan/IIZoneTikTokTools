
// 格式化时间
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

// 获取随机数
var getRandomNum = function (min, max) {
    switch (arguments.length) {
        case 1:
            return parseInt(Math.random() * min + 1, 10);
            break;
        case 2:
            return parseInt(Math.random() * (max - min + 1) + min, 10);
            break;
        default:
            return 0;
            break;
    }
}


// 获取当天日期
var getToday = function () {
    let day=(new Date).Format("yyyy-MM-dd")
    return day
}

// 下载视频到相册
var DownloadVideos=function(){
    this.download=function(){
        const day = getToday();
        const videoUrl = "http://tiktokbot.emarkdigital.tech/" + day + "/sg/today_hot_video_compress.mp4" // 拼接视频url
        const targetFilePath = "/storage/emulated/0/Pictures/Gallery/owner/tkvideos/" + day + ".mp4" // 目标地址
        if (files.exists(targetFilePath)){ //检测文件是否存在，存在则返回
            return targetFilePath
        }
        var r = http.get(videoUrl, {
            headers: {
                'Accept': '*/*',
                'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_13_2) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/73.0.3683.84 Safari/537.36',
            },
        }); //请求
        var fileBodyBytes = r.body.bytes()
        files.writeBytes(targetFilePath, fileBodyBytes) //写入指定路径
        console.log("-----downloading.....")
        media.scanFile(targetFilePath) // 扫描文件，并加入相册
        console.log("-----file scaning.....")
        return targetFilePath
    }
    
}

// 运行脚本
var TikTokRunning=function(videoFilePath){
    var packageName=getPackageName("TikTok")
    app.launch(packageName)
    sleep(30*10*10)
    console.log("-----开屏幕加载完毕.....")

    //while(!click('Profile'));
    // upload上传button区间 x[487,594] y[2151,2226]
    var x = getRandomNum(500, 520);
    var y = getRandomNum(2180, 2190);
    console.log("upload: x: "+x+" y: "+y )
    click(x,y); // 点击上传按钮
    while(!click('Upload')); // 点击相册
    sleep(30*10*10)
    console.log("-----相机加载完毕.....")
    click(186,550); // 选择视频
    while(!click('Next')); //执行下一步
    sleep(30*10*10)
    console.log("-----缓冲视频完毕.....")
    click(761,2178); // 点击post

    sleep(60*10*10*10) //无法监测上传状态，睡眠等待

    //上传完成后，删除文件
    if(files.exists(videoFilePath)){
        files.remove(videoFilePath)
        media.scanFile(videoFilePath)
        console.log('-----removed.....')
    }
}

function taskNameFormat(taskName){
    var str='+++++'+taskName+'+++++'
    return str
}

console.log(taskNameFormat("DownloadVideos start up."))
var downloadVideos = new DownloadVideos()
var filepath=downloadVideos.download()
console.log(taskNameFormat("DownloadVideos done."))

console.log(taskNameFormat("TikTokRunning start up."))
var appRunning=new TikTokRunning(filepath)
console.log(taskNameFormat("TikTokRunning done."))