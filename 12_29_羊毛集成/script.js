/**最后修订与2020年12月30日2点02分 */

//获取无障碍权限
auto.waitFor();
log('已获取无障碍辅助权限！！！');

//获取截图权限
if(!requestScreenCapture()){
    toast("请求截图失败");
    exit();
}

log('已获取截图权限！！！');

//已获取系统设置权限

//开始导入自定义函数
var strMods = importMods('mod/string.js');
log('自定义函数导入成功！！！');

//开始读取配置信息
var 微视 = storage.get('viewDataArr')['ws'];
var 刷宝短视频 = storage.get('viewDataArr')['sbdsp'];
var 快手极速版 = storage.get('viewDataArr')['ksjsb'];
var 抖音极速版 = storage.get('viewDataArr')['dyjsb'];

var 趣刷领红包 = storage.get('viewDataArr')['qslhb'];
var 趣铃声 = storage.get('viewDataArr')['qls'];
var 微视 = storage.get('viewDataArr')['dyjsb'];

if (抖音极速版) {
    抖音极速版函数();
}

if (微视) {
    微视函数();
}

if (刷宝短视频)
    刷宝短视频函数();

if (快手极速版) {
    快手极速版函数();
}

if (趣刷领红包) {
    log('未开发');
}

//自定义函数项目>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>


function 微视函数 () {
    function 计时函数 () {
        let _runTime = strMods.randomNumOfSing(runTime, '-');
        toastLog('本次需要运行'+_runTime+'分钟！');
        while (1) {
            sleep(1000);
            已运行时间++;
            if (已运行时间 > _runTime * 60) {
                toastLog('任务已经完成！停止主线程。。。');
                主线程.interrupt();
                break;
            }
            console.info('已运行%d秒', 已运行时间);
            if (已运行时间 % 60 == 0) {
                toastLog('已运行'+已运行时间 / 60+'分钟！！！');
            }
        }
    }
    console.info('开始-->>  微视函数！！！')

    //开始读取项目配置
    let runTime = storage.get('viewDataArr')['ws_runTime'];
    let launchTime = storage.get('viewDataArr')['ws_launchTime'];
    let swipeTime = storage.get('viewDataArr')['ws_swipeTime'];
    let downNum = storage.get('viewDataArr')['ws_downNum'];
    let upNum = storage.get('viewDataArr')['ws_upNum'];

    log('读取项目配置完成！！！');
    console.info('runTime:'+runTime);
    console.info('launchTime:'+launchTime);
    console.info('swipeTime:'+swipeTime);
    console.info('downNum:'+downNum);
    console.info('upNum:'+upNum);

    if (!runTime || !launchTime || !swipeTime || !downNum || !upNum) {
        toastLog('请您把该填的填满，请勿偷懒！！！');
        return;
    }

    //设置启动app等待时间函数
    launchTime = strMods.randomNumOfSing(launchTime, '-');
    //开始进行运行基础架构

    //开始进行运行基础架构

    let 已运行时间 = 0;

    //开始主线程
    let 主线程 = threads.start(主体函数);

    let 计时线程 = threads.start(计时函数);

    function 主体函数 () {
        let 下滑次数 = 0;
        let 上滑次数 = 0;

        //快手极速版
        sleep(random(800,1000));
        OpenApp('微视', launchTime);
        sleep(random(1000,2000));
        log('等待进入主页！');
        text('推荐').waitFor();
        log('进入主页成功');

        while (1) {
            var time = VideoRandomTime(swipeTime.split('-')[0], swipeTime.split('-')[1]);
            console.log("下一视频，请等待" + time/1000 +"秒");
            sleep(time);

            //开始判断屏幕出现的各种弹窗
            if (text('青少年保护功能提示').exists()) {
                log('设置青少年模式');
                sleep(random(1000,2000));
                text('我知道了').findOne().click();
                log('知道了');
                sleep(random(1000,2000));
            }

            //出现一键关注
            if (text('一键关注').exists()) {
                sleep(random(1000,2000));
                log('关闭一键关注界面');
                id("lrj").findOne().click();
                sleep(random(1000,2000));
            }

            //出现提现秒到账
            if (text('提现秒到账').exists()) {
                sleep(random(1000,2000));
                log('关闭提现秒到账界面！');
                id("nqg").findOne().click();
                sleep(random(1000,2000));
                
            }

            //开始滑动视频
            var x1 = random(device.width/4,(device.width/4)*3);
            var y1 = random((device.height/4)*3.5,(device.height/4)*3.75);
            var x2 = random(device.width/4,(device.width/4)*3);
            var y2 = random((device.height/4)*0.25,(device.height/4)*0.5);
            if (下滑次数 < strMods.randomNumOfSing(downNum, '-')) {
                下滑次数++;
                toastLog('已下滑'+下滑次数+'次！');
                RandomSwipe(x1, y1, x2, y2,random(500,1000));
            } else if (上滑次数 < strMods.randomNumOfSing(upNum, '-'))  {
                上滑次数++;
                toastLog('下滑次数满足，开始上滑第'+上滑次数+'次！');
                RandomSwipe(x2, y2, x1, y1,random(500,1000));
            } else {
                toastLog('重置上下滑动次数！！！');
                上滑次数 = 0;
                下滑次数 = 0;
                toastLog('默认下滑');
                下滑次数++;
                RandomSwipe(x1, y1, x2, y2,random(500,1000));
            }
        }
    }

    while (主线程.isAlive());

    console.info('结束-->>  微视函数！！！')
}

function 刷宝短视频函数 () {
    function 计时函数 () {
        let _runTime = strMods.randomNumOfSing(runTime, '-');
        toastLog('本次需要运行'+_runTime+'分钟！');
        while (1) {
            sleep(1000);
            已运行时间++;
            if (已运行时间 > _runTime * 60) {
                toastLog('任务已经完成！停止主线程。。。');
                主线程.interrupt();
                break;
            }
            console.info('已运行%d秒', 已运行时间);
            if (已运行时间 % 60 == 0) {
                toastLog('已运行'+已运行时间 / 60+'分钟！！！');
            }
        }
    }
    console.info('开始-->>  刷宝短视频函数！！！')
    //开始读取项目配置
    let runTime = storage.get('viewDataArr')['sbdsp_runTime'];
    let launchTime = storage.get('viewDataArr')['sbdsp_launchTime'];
    let swipeTime = storage.get('viewDataArr')['sbdsp_swipeTime'];
    let downNum = storage.get('viewDataArr')['sbdsp_downNum'];
    let upNum = storage.get('viewDataArr')['sbdsp_upNum'];

    log('读取项目配置完成！！！');
    console.info('runTime:'+runTime);
    console.info('launchTime:'+launchTime);
    console.info('swipeTime:'+swipeTime);
    console.info('downNum:'+downNum);
    console.info('upNum:'+upNum);

    if (!runTime || !launchTime || !swipeTime || !downNum || !upNum) {
        toastLog('请您把该填的填满，请勿偷懒！！！');
        return;
    }

    //设置启动app等待时间函数
    launchTime = strMods.randomNumOfSing(launchTime, '-');
    //开始进行运行基础架构

    //开始进行运行基础架构

    let 已运行时间 = 0;

    //开始主线程
    let 主线程 = threads.start(主体函数);

    let 计时线程 = threads.start(计时函数);


    function 主体函数 () {
        let 下滑次数 = 0;
        let 上滑次数 = 0;

        sleep(random(800,1000));
        OpenApp('刷宝短视频', launchTime);
        sleep(random(1000,2000));
        log('开始点击推荐！');
        text('推荐').findOne().parent().parent().click();
        log('点击推荐成功！');


        while (1) {
            var time = VideoRandomTime(swipeTime.split('-')[0], swipeTime.split('-')[1]);
            console.log("下一视频，请等待" + time/1000 +"秒");
            sleep(time);

            //开始判断屏幕出现的各种弹窗

            //开始滑动视频
            var x1 = random(device.width/4,(device.width/4)*3);
            var y1 = random((device.height/4)*3.5,(device.height/4)*3.75);
            var x2 = random(device.width/4,(device.width/4)*3);
            var y2 = random((device.height/4)*0.25,(device.height/4)*0.5);
            if (下滑次数 < strMods.randomNumOfSing(downNum, '-')) {
                下滑次数++;
                toastLog('已下滑'+下滑次数+'次！');
                RandomSwipe(x1, y1, x2, y2,random(500,1000));
            } else if (上滑次数 < strMods.randomNumOfSing(upNum, '-'))  {
                上滑次数++;
                toastLog('下滑次数满足，开始上滑第'+上滑次数+'次！');
                RandomSwipe(x2, y2, x1, y1,random(500,1000));
            } else {
                toastLog('重置上下滑动次数！！！');
                上滑次数 = 0;
                下滑次数 = 0;
                toastLog('默认下滑');
                下滑次数++;
                RandomSwipe(x1, y1, x2, y2,random(500,1000));
            }
        }


    }

    while (主线程.isAlive());
    console.info('结束-->>  刷宝短视频函数！！！');

}

function 快手极速版函数 () {
    function 计时函数 () {
        let _runTime = strMods.randomNumOfSing(runTime, '-');
        toastLog('本次需要运行'+_runTime+'分钟！');
        while (1) {
            sleep(1000);
            已运行时间++;
            if (已运行时间 > _runTime * 60) {
                toastLog('任务已经完成！停止主线程。。。');
                主线程.interrupt();
                break;
            }
            console.info('已运行%d秒', 已运行时间);
            if (已运行时间 % 60 == 0) {
                toastLog('已运行'+已运行时间 / 60+'分钟！！！');
            }
        }
    }
    console.info('开始-->>  快手极速版函数！！！')

    //开始项目初始化，自检一些项目，比如有没有安装快手极速版

    //开始读取项目配置
    let runTime = storage.get('viewDataArr')['ksjsb_runTime'];
    let launchTime = storage.get('viewDataArr')['ksjsb_launchTime'];
    let swipeTime = storage.get('viewDataArr')['ksjsb_swipeTime'];
    let downNum = storage.get('viewDataArr')['ksjsb_downNum'];
    let upNum = storage.get('viewDataArr')['ksjsb_upNum'];

    log('读取项目配置完成！！！');
    console.info('runTime:'+runTime);
    console.info('launchTime:'+launchTime);
    console.info('swipeTime:'+swipeTime);
    console.info('downNum:'+downNum);
    console.info('upNum:'+upNum);

    if (!runTime || !launchTime || !swipeTime || !downNum || !upNum) {
        toastLog('请您把该填的填满，请勿偷懒！！！');
        return;
    }

    launchTime = strMods.randomNumOfSing(launchTime, '-');

    //开始进行运行基础架构

    let 已运行时间 = 0;

    //开始主线程
    let 主线程 = threads.start(主体函数);

    let 计时线程 = threads.start(计时函数);

    function 主体函数 () {

        let 下滑次数 = 0;
        let 上滑次数 = 0;

        //快手极速版
        sleep(random(800,1000));
        OpenApp('快手极速版', launchTime);
        sleep(random(1000,2000));
        while(true){
            var time = VideoRandomTime(swipeTime.split('-')[0], swipeTime.split('-')[1]);
            console.log("下一视频，请等待" + time/1000 +"秒");
            sleep(time);
            //检测青少年模式
            if(text("设置青少年模式").findOne(1000) != null){
                console.log("设置青少年模式");
                sleep(random(1000,2000));
                // text("我知道了").findOne().click();
                click('我知道了');
                console.log("点击我知道了");
                sleep(random(1000,2000));
            }
            //立即邀请
            if(text("立即邀请").findOne(1000) != null){
                console.log("立即邀请");
                sleep(random(1000,2000));
                back();
                console.log("关闭立即邀请");
                sleep(random(1000,2000));
            }
            //检测滑块
            if(text("拖动滑块").findOne(1000) != null){
                console.log("出现滑块验证");
                DragSlider();
                sleep(random(1000,2000));
            }
            //进入个人主页
            if(desc("返回").findOne(1000) != null){
                console.log("进入个人主页");
                sleep(random(1000,2000));
                desc("返回").findOne().click();
                sleep(random(1000,2000));
            }

            //个人信息保护指引
            if (textContains('个人信息保护指引').exists()) {
                toastLog('个人信息保护指引!');  
                click('同意');

            }

            //
            if (text('我知道了').exists()) {
                sleep(random(1000,2000));
                click('我知道了');
                sleep(random(1000,2000));
            }

            //开始滑动视频
            var x1 = random(device.width/4,(device.width/4)*3);
            var y1 = random((device.height/4)*3.5,(device.height/4)*3.75);
            var x2 = random(device.width/4,(device.width/4)*3);
            var y2 = random((device.height/4)*0.25,(device.height/4)*0.5);
            if (下滑次数 < strMods.randomNumOfSing(downNum, '-')) {
                下滑次数++;
                toastLog('已下滑'+下滑次数+'次！');
                RandomSwipe(x1, y1, x2, y2,random(500,1000));
            } else if (上滑次数 < strMods.randomNumOfSing(upNum, '-'))  {
                上滑次数++;
                toastLog('下滑次数满足，开始上滑第'+上滑次数+'次！');
                RandomSwipe(x2, y2, x1, y1,random(500,1000));
            } else {
                toastLog('重置上下滑动次数！！！');
                上滑次数 = 0;
                下滑次数 = 0;
                toastLog('默认下滑');
                下滑次数++;
                RandomSwipe(x1, y1, x2, y2,random(500,1000));
            }
        }
    }
    
    //拖动滑块
    function DragSlider() {
        for (var i = 0; i < 0; i++) { sleep(1000); log(i); }
        while (true) {
            img = images.captureScreen();
            if (img) {
                console.log("截图成功。进行识别滑块！");
                break;
            } else {
                console.log('截图失败,重新截图');
            }
        }
        var zx = discernSlidingblock(img, device.width) + 65
        console.info("识别结果滑块X坐标：" + zx);
        if (zx > -1) {
            //计算拖到滑块坐标
            var 向右拖动滑块填充拼图 = text("向右拖动滑块填充拼图").findOne();
            var qx = 向右拖动滑块填充拼图.bounds().left + (向右拖动滑块填充拼图.bounds().width() * 0.15) / 2;
            var qy = 向右拖动滑块填充拼图.bounds().centerY();
            var zy = qy;
            console.log(qx);
            console.log(qy);
            DragSliderSwipe(qx, qy, zx, zy)
            return true;
        } else {
            console.log("识别有误，请确认是否在滑块界面");
            return false;
        }
    }


    /**
     * 计算滑块位置
     * @param {图片} img 
     * @param {分辨率} ratio 
     */
    function discernSlidingblock(img, ratio) {
        //创建识别变量
        var temp, temp2, x, y, num, color, p, temp3, arr1;
        //分析设备分辨率
        if (ratio == 720) {
            var tb = [348, 253, 691, 638, 81]
            log("您的设备分辨率为：720p");
        } else if (ratio == 1080) {
            var tb = [463, 387, 912, 831, 125]
            log("您的设备分辨率为：1080p");
        } else {
            log("当前设备分辨率不符合规范")
            return -2
        }
        num = Math.ceil(tb[4] / 3.3 - 4);
    
        //计算滑块位置
        for (var k = 29; k <= 40; k++) {
            temp2 = "";
            color = "#" + k + "" + k + "" + k + "";
            for (var i = 1; i <= num; i++) {
                temp2 = temp2 + "0|" + i + "|" + color + ",";
                temp2 = temp2 + i + "|0|" + color + ",";
                temp2 = temp2 + "1|" + i + "|" + color + ",";
                temp2 = temp2 + i + "|1|" + color + ",";
                temp2 = temp2 + "2|" + i + "|" + color + ",";
                temp2 = temp2 + i + "|2|" + color + ",";
            }
            x = 0;
            while (x > -2) {
                y = 0;
                while (y > -2) {
                    temp = "";
                    for (var i = 1; i <= num; i += 2) {
                        temp = temp + "0|" + (tb[4] + y - i - 1) + "|" + color + ",";
                        temp = temp + (tb[4] + x) + "|" + i + "|" + color + ",";
                        temp = temp + (tb[4] + x) + "|" + (tb[4] + y - i - 1) + "|" + color + ",";
                        temp = temp + (tb[4] + x - i - 1) + "|0|" + color + ",";
                        temp = temp + i + "|" + (tb[4] + y) + "|" + color + ",";
                        temp = temp + (tb[4] + x - i - 1) + "|" + (tb[4] + y) + "|" + color + ",";
                        temp = temp + "1|" + (tb[4] + y - i - 1) + "|" + color + ",";
                        temp = temp + (tb[4] + x - 1) + "|" + i + "|" + color + ",";
                        temp = temp + (tb[4] + x - 1) + "|" + (tb[4] + y - i - 1) + "|" + color + ",";
                        temp = temp + (tb[4] + x - i - 1) + "|1|" + color + ",";
                        temp = temp + i + "|" + (tb[4] + y - 1) + "|" + color + ",";
                        temp = temp + (tb[4] + x - i - 1) + "|" + (tb[4] + y - 1) + "|" + color + ",";
                    }
                    temp = temp + temp2 + "0|0|" + color;
                    arr1 = temp.split(",");
                    var arr2 = new Array();
                    for (var i = 0; i < arr1.length - 1; i++) {
                        arr2[i] = new Array();
                        temp3 = arr1[i].split("|");
                        arr2[i] = [Number(temp3[0]), Number(temp3[1]), temp3[2]];
                    }
                    try {
                        p = images.findMultiColors(img, color, arr2, {
                            region: [tb[0], tb[1], tb[2] - tb[0], tb[3] - tb[1]],
                            threshold: (Math.floor(k / 10) * 16 + k % 10)
                        });
                        if (p) {
                            img.recycle();
                            return p.x
                        }
                    } catch (error) {
                        //出错
                        console.log("识别失败，错误原因：" + error);
                        return -1;
                    }
                    y = --y;
                }
                x = --x;
            }
        }
        try {
            img.recycle();
        } catch (error) {
            console.log("识别失败，错误原因：" + error);
        }
        return -1;
    }

    /**
     * 真人模拟滑动函数 （滑块滑动）
     * @param {起点x} sx 
     * @param {起点y} sy 
     * @param {终点x} ex 
     * @param {终点y} ey 
     */
    function DragSliderSwipe(sx, sy, ex, ey) {
        //设置随机滑动时长范围
        var timeMin = 1000
        var timeMax = 3000
        //设置控制点极限距离
        var leaveHeightLength = 500

        //根据偏差距离，应用不同的随机方式
        if (Math.abs(ex - sx) > Math.abs(ey - sy)) {
            var my = (sy + ey) / 2
            var y2 = my + random(0, leaveHeightLength)
            var y3 = my - random(0, leaveHeightLength)

            var lx = (sx - ex) / 3
            if (lx < 0) { lx = -lx }
            var x2 = sx + lx / 2 + random(0, lx)
            var x3 = sx + lx + lx / 2 + random(0, lx)
        } else {
            var mx = (sx + ex) / 2
            var y2 = mx + random(0, leaveHeightLength)
            var y3 = mx - random(0, leaveHeightLength)

            var ly = (sy - ey) / 3
            if (ly < 0) { ly = -ly }
            var y2 = sy + ly / 2 + random(0, ly)
            var y3 = sy + ly + ly / 2 + random(0, ly)
        }   
        //获取运行轨迹，及参数
        var time = [0, random(timeMin, timeMax)]
        var track = bezierCreate(sx, sy, x2, y2, x3, y3, ex, ey)
        // log("随机控制点A坐标：" + x2 + "," + y2)
        // log("随机控制点B坐标：" + x3 + "," + y3)
        // log("随机滑动时长：" + time[1])
        //滑动
        gestures(time.concat(track))
    }

    //计算滑块轨迹
    function bezierCreate(x1, y1, x2, y2, x3, y3, x4, y4) {
        //构建参数
        var h = 100;
        var cp = [{ x: x1, y: y1 + h }, { x: x2, y: y2 + h }, { x: x3, y: y3 + h }, { x: x4, y: y4 + h }];
        var numberOfPoints = 100;
        var curve = [];
        var dt = 1.0 / (numberOfPoints - 1);
        //计算轨迹
        for (var i = 0; i < numberOfPoints; i++) {
            var ax, bx, cx;
            var ay, by, cy;
            var tSquared, tCubed;
            var result_x, result_y;
    
            cx = 3.0 * (cp[1].x - cp[0].x);
            bx = 3.0 * (cp[2].x - cp[1].x) - cx;
            ax = cp[3].x - cp[0].x - cx - bx;
            cy = 3.0 * (cp[1].y - cp[0].y);
            by = 3.0 * (cp[2].y - cp[1].y) - cy;
            ay = cp[3].y - cp[0].y - cy - by;
    
            var t = dt * i
            tSquared = t * t;
            tCubed = tSquared * t;
            result_x = (ax * tCubed) + (bx * tSquared) + (cx * t) + cp[0].x;
            result_y = (ay * tCubed) + (by * tSquared) + (cy * t) + cp[0].y;
            curve[i] = {
                x: result_x,
                y: result_y
            };
        }
        //轨迹转路数组
        var array = [];
        for (var i = 0; i < curve.length; i++) {
            try {
                var j = (i < 100) ? i : (199 - i);
                xx = parseInt(curve[j].x)
                yy = parseInt(Math.abs(100 - curve[j].y))
            } catch (e) {
                break
            }
            array.push([xx, yy])
        }
        return array
    }

    while (主线程.isAlive());

    console.info('结束-->>  快手极速版函数！！！')

}


function 趣刷领红包 () {
    function 计时函数 () {
        let _runTime = strMods.randomNumOfSing(runTime, '-');
        toastLog('本次需要运行'+_runTime+'分钟！');
        while (1) {
            sleep(1000);
            已运行时间++;
            if (已运行时间 > _runTime * 60) {
                toastLog('任务已经完成！停止主线程。。。');
                主线程.interrupt();
                break;
            }
            console.info('已运行%d秒', 已运行时间);
            if (已运行时间 % 60 == 0) {
                toastLog('已运行'+已运行时间 / 60+'分钟！！！');
            }
        }
    }
    console.info('开始-->>  趣刷领红包函数！！！')

    //开始读取项目配置
    let runTime = storage.get('viewDataArr')['qslhb_runTime'];
    let launchTime = storage.get('viewDataArr')['qslhb_launchTime'];
    let swipeTime = storage.get('viewDataArr')['qslhb_swipeTime'];
    let downNum = storage.get('viewDataArr')['qslhb_downNum'];
    let upNum = storage.get('viewDataArr')['qslhb_upNum'];

    log('读取项目配置完成！！！');
    console.info('runTime:'+runTime);
    console.info('launchTime:'+launchTime);
    console.info('swipeTime:'+swipeTime);
    console.info('downNum:'+downNum);
    console.info('upNum:'+upNum);

    if (!runTime || !launchTime || !swipeTime || !downNum || !upNum) {
        toastLog('请您把该填的填满，请勿偷懒！！！');
        return;
    }

    //设置启动app等待时间函数
    launchTime = strMods.randomNumOfSing(launchTime, '-');
    //开始进行运行基础架构

    //开始进行运行基础架构

    let 已运行时间 = 0;

    //开始主线程
    let 主线程 = threads.start(主体函数);

    let 计时线程 = threads.start(计时函数);

    function 主体函数 () {
        let 下滑次数 = 0;
        let 上滑次数 = 0;

        //快手极速版
        sleep(random(800,1000));
        OpenApp('趣刷领红包', launchTime);
        sleep(random(1000,2000));
        // log('开始点击推荐！');
        // text('推荐').findOne().parent().parent().click();
        // log('点击推荐成功！');

        while (1) {

            var time = VideoRandomTime(swipeTime.split('-')[0], swipeTime.split('-')[1]);
            console.log("下一视频，请等待" + time/1000 +"秒");
            sleep(time);

            //出现了未知弹窗
            if (id('txt_coin_close').exists()) {
                sleep(random(1000,2000));
                log('出现了关闭按钮');
                id('txt_coin_close').findOne().click();
                log('点击关闭按钮！');
                sleep(random(1000,2000));
            }

            //开始滑动视频
            var x1 = random(device.width/4,(device.width/4)*3);
            var y1 = random((device.height/4)*3.5,(device.height/4)*3.75);
            var x2 = random(device.width/4,(device.width/4)*3);
            var y2 = random((device.height/4)*0.25,(device.height/4)*0.5);
            if (下滑次数 < strMods.randomNumOfSing(downNum, '-')) {
                下滑次数++;
                toastLog('已下滑'+下滑次数+'次！');
                RandomSwipe(x1, y1, x2, y2,random(500,1000));
            } else if (上滑次数 < strMods.randomNumOfSing(upNum, '-'))  {
                上滑次数++;
                toastLog('下滑次数满足，开始上滑第'+上滑次数+'次！');
                RandomSwipe(x2, y2, x1, y1,random(500,1000));
            } else {
                toastLog('重置上下滑动次数！！！');
                上滑次数 = 0;
                下滑次数 = 0;
                toastLog('默认下滑');
                下滑次数++;
                RandomSwipe(x1, y1, x2, y2,random(500,1000));
            }
        }
    }
    while (主线程.isAlive());
    console.info('结束-->>  趣刷领红包函数！！！')

}

function 趣铃声函数 () {
    console.info('开始-->>  趣铃声函数！！！')

    console.info('结束-->>  趣铃声函数！！！')

}



function 抖音极速版函数 () {
    function 计时函数 () {
        let _runTime = strMods.randomNumOfSing(runTime, '-');
        toastLog('本次需要运行'+_runTime+'分钟！');
        while (1) {
            sleep(1000);
            已运行时间++;
            if (已运行时间 > _runTime * 60) {
                toastLog('任务已经完成！停止主线程。。。');
                主线程.interrupt();
                break;
            }
            console.info('已运行%d秒', 已运行时间);
            if (已运行时间 % 60 == 0) {
                toastLog('已运行'+已运行时间 / 60+'分钟！！！');
            }
        }
    }
    console.info('开始-->>  抖音极速版函数！！！')

    //开始读取项目配置
    let runTime = storage.get('viewDataArr')['dyjsb_runTime'];
    let launchTime = storage.get('viewDataArr')['dyjsb_launchTime'];
    let swipeTime = storage.get('viewDataArr')['dyjsb_swipeTime'];
    let downNum = storage.get('viewDataArr')['dyjsb_downNum'];
    let upNum = storage.get('viewDataArr')['dyjsb_upNum'];

    log('读取项目配置完成！！！');
    console.info('runTime:'+runTime);
    console.info('launchTime:'+launchTime);
    console.info('swipeTime:'+swipeTime);
    console.info('downNum:'+downNum);
    console.info('upNum:'+upNum);

    if (!runTime || !launchTime || !swipeTime || !downNum || !upNum) {
        toastLog('请您把该填的填满，请勿偷懒！！！');
        return;
    }

    //设置启动app等待时间函数
    launchTime = strMods.randomNumOfSing(launchTime, '-');
    //开始进行运行基础架构

    //开始进行运行基础架构

    let 已运行时间 = 0;

    //开始主线程
    let 主线程 = threads.start(主体函数);

    let 计时线程 = threads.start(计时函数);

    function 主体函数 () {
        let 下滑次数 = 0;
        let 上滑次数 = 0;

        sleep(random(800,1000));
        OpenApp('抖音极速版', launchTime);
        sleep(random(1000,2000));
        log('等待进入主页！');
        text('推荐').waitFor();
        log('进入主页成功');

        while (1) {
            var time = VideoRandomTime(swipeTime.split('-')[0], swipeTime.split('-')[1]);
            console.log("下一视频，请等待" + time/1000 +"秒");
            sleep(time);

            if (id("a1t").exists()) {
                log('抖音极速版 弹窗')
                sleep(random(1000,2000));
                id("a1t").findOne().click();
                log('关闭抖音极速版弹窗')
                sleep(random(1000,2000));
            }

            if (text('我知道了').exists()) {
                sleep(random(1000,2000));
                click('我知道了');
                sleep(random(1000,2000));
            }

            if (id("bb9").exists()) {
                log('抖音极速版 弹窗')
                sleep(random(1000,2000));
                id("bb9dd").findOne().click();
                log('关闭抖音极速版弹窗')
                sleep(random(1000,2000));
            }

            //开始滑动视频
            var x1 = random(device.width/4,(device.width/4)*3);
            var y1 = random((device.height/4)*3.5,(device.height/4)*3.75);
            var x2 = random(device.width/4,(device.width/4)*3);
            var y2 = random((device.height/4)*0.25,(device.height/4)*0.5);
            if (下滑次数 < strMods.randomNumOfSing(downNum, '-')) {
                下滑次数++;
                toastLog('已下滑'+下滑次数+'次！');
                RandomSwipe(x1, y1, x2, y2,random(500,1000));
            } else if (上滑次数 < strMods.randomNumOfSing(upNum, '-'))  {
                上滑次数++;
                toastLog('下滑次数满足，开始上滑第'+上滑次数+'次！');
                RandomSwipe(x2, y2, x1, y1,random(500,1000));
            } else {
                toastLog('重置上下滑动次数！！！');
                上滑次数 = 0;
                下滑次数 = 0;
                toastLog('默认下滑');
                下滑次数++;
                RandomSwipe(x1, y1, x2, y2,random(500,1000));
            }
        }
    }

    while (主线程.isAlive());

    console.info('结束-->>  抖音极速版函数！！！')
}


































//打开app函数
function OpenApp(appName, delay){
    if(app.getPackageName(appName) != null){
        sleep(random(800,1000));
        app.launchApp(appName);
        toastLog('等待'+delay+'秒钟！')
        sleep(delay * 1000);
    }else{
        alert("温馨提示", "请下载安装"+appName);
        console.log("请下载安装"+appName);
        console.hide();
        console.log("关闭控制台");
        console.log("停止脚本");
        exit();
    }
}


//随机停留时间
function VideoRandomTime(timeMin, timeMax){
    //设置随机停留时长范围
    timeMin = Number(timeMin) * 1000;
    timeMax = Number(timeMax) * 1000;

    return random(timeMin,timeMax);
}

/**
 * 仿真随机带曲线滑动（视频/小说）
 * @param {起点x} qx 
 * @param {起点y} qy 
 * @param {终点x} zx 
 * @param {终点y} zy 
 * @param {过程耗时单位毫秒} time 
 */
function RandomSwipe(qx, qy, zx, zy, time) {
    var xxy = [time];
    var point = [];
    var dx0 = {
        "x": qx,
        "y": qy
    };
    var dx1 = {
        "x": random(qx - (device.width/4)*0.25, qx + (device.width/4)*0.25),
        "y": random(qy , qy + 50)
    };
    var dx2 = {
        "x": random(zx - (device.width/4)*0.25, zx + (device.width/4)*0.25),
        "y": random(zy , zy + 50)
    };
    var dx3 = {
        "x": zx,
        "y": zy
    };
    for (var i = 0; i < 4; i++) {
        eval("point.push(dx" + i + ")");
    };
    for (let i = 0; i < 1; i += 0.08) {
        xxyy = [parseInt(bezier_curves(point, i).x), parseInt(bezier_curves(point, i).y)]
        xxy.push(xxyy);
    }
    gesture.apply(null, xxy);
}
function bezier_curves(cp, t) {
    cx = 3.0 * (cp[1].x - cp[0].x); 
    bx = 3.0 * (cp[2].x - cp[1].x) - cx; 
    ax = cp[3].x - cp[0].x - cx - bx; 
    cy = 3.0 * (cp[1].y - cp[0].y); 
    by = 3.0 * (cp[2].y - cp[1].y) - cy; 
    ay = cp[3].y - cp[0].y - cy - by; 
    
    tSquared = t * t; 
    tCubed = tSquared * t; 
    result = {
        "x": 0,
        "y": 0
    };
    result.x = (ax * tCubed) + (bx * tSquared) + (cx * t) + cp[0].x; 
    result.y = (ay * tCubed) + (by * tSquared) + (cy * t) + cp[0].y; 
    return result; 
}




