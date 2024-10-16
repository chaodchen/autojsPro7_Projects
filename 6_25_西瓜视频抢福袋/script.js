console.info('开始运行脚本')
//开始读取本地储存
try {
    if(!requestScreenCapture()){
        toast("请求截图失败");
        exit()
    }
} catch (_err) {
    console.error('申请截屏权限报错：'+_err)
}

log('显示悬浮窗')
console.show()
//这里把mainActivity的storage_uiConfig变量传进来了，这个变量记录了脚本的UI配置信息
//编辑框的arr数组
var editArr = storage_uiConfig.editView
//单选框的arr数组
var radioArr = storage_uiConfig.radioView
//多选框的arr数组
var checkboxArr = storage_uiConfig.checkboxView
log(checkboxArr)
//新建一个悬浮窗显示脚本状态
if (checkboxArr[0]) {
    toastLog('显示 状态悬浮窗')
    threads.start(状态悬浮窗)
}

log('设置亮度')
device.setBrightnessMode(0)
device.setBrightness(Number(editArr[2]))
device.setMusicVolume(0)
device.setNotificationVolume(0)
//定义图片资源与坐标组
var pictures={}, coordinateGroup={};

const picturesApi = 'http://f.akvip.top'
if (radioArr[0]) {
    log('该设备是华为P9')
    pictures.我知道了 = images.load(picturesApi + '/EVA-AL10/' + '我知道了.jpg')
    pictures.直播已结束 = images.load(picturesApi + '/EVA-AL10/' + '直播已结束.jpg')
    // pictures.抢 = images.load(picturesApi + '/EVA-AL10/' + '抢.jpg')
    // pictures.大家 = images.load(picturesApi + '/EVA-AL10/' + '大家.jpg')
    // pictures.玩家红包 = images.load(picturesApi + '/EVA-AL10/' + '玩家红包.jpg')
    pictures.直播福袋 = images.load(picturesApi + '/EVA-AL10/' + '直播福袋.jpg')
    pictures.福袋 = images.load(picturesApi + '/EVA-AL10/' + '福袋.jpg')
    pictures.参与 = images.load(picturesApi + '/EVA-AL10/' + '参与.jpg')
    pictures.发放记录 = images.load(picturesApi + '/EVA-AL10/' + '发放记录.jpg')
    // pictures.立即关注 = images.load(picturesApi + '/EVA-AL10/' + '立即关注.jpg')
    pictures.钻石 = images.load(picturesApi + '/EVA-AL10/' + '钻石.jpg')
    pictures.红直播 = images.load(picturesApi + '/EVA-AL10/' + '红直播.jpg')
    pictures.白直播 = images.load(picturesApi + '/EVA-AL10/' + '白直播.jpg')
    pictures.退出 = images.load(picturesApi + '/EVA-AL10/' + '退出.jpg')

    coordinateGroup.叉 = {x:1000, y:1712}
    coordinateGroup.推荐 = {x:79, y:271}
    coordinateGroup.游戏 = {x:232, y:267}
    coordinateGroup.乡野 = {x:382, y:268}
    coordinateGroup.生活 = {x:535, y:267}
    coordinateGroup.媒体 = {x:690, y:268}
    coordinateGroup.懂车帝 = {x:1013, y:267}

} else if (radioArr[1]) {
    log('该设备是小米4')
    pictures.我知道了 = images.load(picturesApi + '/MI4/' + '我知道了.jpg')
    pictures.直播已结束 = images.load(picturesApi + '/MI4/' + '直播已结束.jpg')
    pictures.抢 = images.load(picturesApi + '/MI4/' + '抢.jpg')
    pictures.大家 = images.load(picturesApi + '/MI4/' + '大家.jpg')
    pictures.玩家红包 = images.load(picturesApi + '/MI4/' + '玩家红包.jpg')
    pictures.直播福袋 = images.load(picturesApi + '/MI4/' + '直播福袋.jpg')
    pictures.福袋 = images.load(picturesApi + '/MI4/' + '福袋.jpg')
    pictures.参与 = images.load(picturesApi + '/MI4/' + '参与.jpg')
    pictures.发放记录 = images.load(picturesApi + '/MI4/' + '发放记录.jpg')
    // pictures.立即关注 = images.load(picturesApi + '/MI4/' + '立即关注.jpg')
    pictures.钻石 = images.load(picturesApi + '/MI4/' + '钻石.jpg')
    pictures.红直播 = images.load(picturesApi + '/MI4/' + '红直播.jpg')
    pictures.白直播 = images.load(picturesApi + '/MI4/' + '白直播.jpg')
    pictures.退出 = images.load(picturesApi + '/MI4/' + '退出.jpg')

    coordinateGroup.叉 = {x:1000, y:1712}
    coordinateGroup.推荐 = {x:100, y:250}
    coordinateGroup.游戏 = {x:240, y:280}
    coordinateGroup.乡野 = {x:378, y:273}
    coordinateGroup.生活 = {x:500, y:267}
    coordinateGroup.媒体 = {x:670, y:268}
    coordinateGroup.懂车帝 = {x:850, y:267}
} else {
    console.error('未知设备！')
}

log('启动西瓜视频')
app.launch('com.ss.android.article.video')
log('延迟十秒钟')
sleep(10 * 1000)
let coor_1;
if (coor_1 = images.findImage(captureScreen(), pictures.我知道了)) {
    log('找到并点击 我知道了')
    点击(coor_1.x, coor_1.y)
} else {
    log('没有找到我知道了')
}

sleep(1000 * 3)
log('开始寻找白直播')

if (coor_1 = images.findImage(captureScreen(), pictures.白直播)) {
    log('找到并点击 白直播')
    点击(coor_1.x, coor_1.y)
} else {
    console.error('没有找到 白直播')
    if (coor_1 = images.findImage(captureScreen(), pictures.红直播)) {
        log('找到了 红直播')
    } else {
        console.error('没有找到白直播并且没有找到红直播')
        exit()
    }
}
sleep(3 * 1000)
log('开始选择栏目')
switch (editArr[0]) {
    case '推荐':
        toastLog('推荐')
        点击(coordinateGroup.推荐.x, coordinateGroup.推荐.y)
        break;
    case '游戏':
        toastLog('游戏')
        点击(coordinateGroup.游戏.x, coordinateGroup.游戏.y)
        break;
    case '音乐':
        toastLog('音乐')
        点击(coordinateGroup.音乐.x, coordinateGroup.音乐.y)
        break;
    case '乡野':
        toastLog('乡野')
        点击(coordinateGroup.乡野.x, coordinateGroup.乡野.y)
        break;
    case '生活':
        toastLog('生活')
        点击(coordinateGroup.生活.x, coordinateGroup.生活.y)
        break;
    case '媒体':
        toastLog('媒体')
        点击(coordinateGroup.媒体.x, coordinateGroup.媒体.y)
        break;
    case '懂车帝':
        toastLog('懂车帝')
        点击(coordinateGroup.懂车帝.x, coordinateGroup.懂车帝.y)
        break;
    default:
        console.error('请选择正确的栏目!')
        exit()
}
log('延迟五秒钟')
sleep(5 * 1000)
for (let i = 0; i < Number(editArr[1]); i++) {
    toastLog('第'+i+'次下滑')
    滑动(756, 1646, 1000, 359, random(800, 1300))
    sleep(random(1000, 2000))
}

log('下滑函数执行完毕')

loop:
while (1) {
    if (直播福袋 = images.findImage(captureScreen(), pictures.直播福袋,{threshold:0.8})) {
        log('找到了 直播福袋坐标')
        点击(直播福袋.x, 直播福袋.y)
        sleep(5 * 1000)
        let 福袋坐标 = null, 红包坐标 = null, 参与坐标 = null, 参与状态 = false, 抢 = null, 大家 = null, 钻石 = null, 发放记录 = null, 直播结束 = null;
        for (let i = 0; i < 6; i++) {
            if (福袋坐标 = images.findImage(captureScreen(), pictures.福袋,{threshold:0.8})) {
                if (!参与状态) {
                    log('找到了 福袋坐标 并且参与状态为 false')
                    点击(福袋坐标.x, 福袋坐标.y)
                    for (i = 0; i < 30; i++) {
                        log('第%d次寻找参与坐标', i)
                        sleep(1000)
                        if (参与坐标 = images.findImage(captureScreen(), pictures.参与,{threshold:0.8})) {
                            log('找到了 参与坐标')
                            点击(参与坐标.x, 参与坐标.y)
                            log('点击 参与坐标 延迟两秒')
                            sleep(2000)
                            参与状态 = true
                            break
                        } else {
                            log('没有找到 参与坐标')
                        }
                    }
                } else {
                    log('找到了 福袋坐标 并且参与状态为 true')
                }
            } else if (直播结束 = images.findImage(captureScreen(), pictures.直播已结束, {threshold:0.7})) {
                log('直播已结束！！！')
                break
            } else {
                log('没有找到福袋坐标')
            }
            sleep(5000)
        }

        //如果参与状态为 真 则开始无限循环找福袋发放记录

        if (参与状态) {
            log(参与状态)
            for (i = 0; i < 600; i++) {
                log('第%d次寻找发放记录或钻石', i)
                if (发放记录 = images.findImage(captureScreen(), pictures.发放记录, {threshold:0.8})) {
                    log('找到了 发放记录')
                    break
                } else if (钻石 = images.findImage(captureScreen(), pictures.钻石, {threshold:0.8})) {
                    log('找到了钻石')
                    break
                } else if (直播结束 = images.findImage(captureScreen(), pictures.直播已结束, {threshold:0.7})) {
                    log('直播已结束！！！')
                    break
                } else {
                    log('没有找到发放记录')
                }
                sleep(1000)
            }
        } else {
            log('参与状态为 false')
        }

        log('准备返回')
        点击(coordinateGroup.叉.x, coordinateGroup.叉.y)
        sleep(3 * 1000)
        do {
            if (红直播图标 = images.findImage(captureScreen(), pictures.红直播, {threshold:0.8})) {
                log('找到了 红直播图标')
                点击(红直播图标.x, 红直播图标.y)
                log('点击红直播图标 延迟五秒钟')
                sleep(5 * 1000)
                for (let i = 0; i < Number(editArr[1]); i++) {
                    toastLog('第'+i+'次下滑')
                    滑动(756, 1646, 1000, 359, random(800, 1300))
                    sleep(random(1000, 2000))
                }
                log('下滑完成')
                break
            } else if (退出 = images.findImage(captureScreen(), pictures.退出, {threshold:0.8})) {
                log('找到了 退出')
                点击(退出.x, 退出.y)
            } else {
                log('没有找到 红直播图标 没有找到退出')
                back()
            }
            sleep(3000)
        } while (1);

        log('返回到直播主页成功')

    } else {
        log('没有找到 直播福袋坐标')
        滑动(756, 1646, 1000, 359, random(800, 1300))
        sleep(2000)
    }
}

function 点击 (x, y) {
    if (device.sdkInt > 23) {
        click(x, y)
    } else {
        Tap(x, y)
        sleep(1000 * 3)
    }
}

function 滑动 (x, y, x1, y1, d) {
    if (device.sdkInt > 23) {
        swipe(x, y, x1, y1, d)
    } else {
        Swipe(x, y, x1, y1, d)
        sleep(d * 3)
    }
}

































function 状态悬浮窗 () {
    let window = floaty.window(
        <frame gravity='center'>
            <text id='txt' textSize='16sp' textColor='#f44336'></text>
        </frame>
    )

    window.exitOnClose()

    window.txt.click(() => {
        window.setAdjustEnabled(!window.isAdjustEnabled())
    })

    setInterval(() => {
        ui.run(function(){
            window.txt.setText(getState())
        })
    }, 1000)

    function getState () {
        let str = util.format('内存使用量：%d%', getMemoryUsage())
        return str
    }

    function getMemoryUsage () {
        let usage = (100 * device.getAvailMem() / device.getTotalMem());
        return Math.round(usage * 10) / 10
    }
}

