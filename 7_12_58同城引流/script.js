console.info('开始运行脚本')
//开始读取本地储存
// try {
//     if(!requestScreenCapture()){
//         toast("请求截图失败");
//         exit()
//     }
// } catch (_err) {
//     console.error('申请截屏权限报错：'+_err)
// }



log('显示悬浮窗')
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
    console.show()
    // threads.start(状态悬浮窗)
}

// log('设置亮度')
// device.setBrightnessMode(0)
// device.setBrightness(Number(editArr[2]))
// device.setMusicVolume(0)
// device.setNotificationVolume(0)

//开始运行脚本
//定义脚本全局延迟时间
const DELAY_TIME = '2|6'

const 设备高度 = device.height

function 兼容函数 () {

}
log('您的设备高度为：%d', 设备高度)
toastLog('请手动打开58同城App')
app.launchApp('58同城')
while (1) {
    if (text('首页').exists() && text('发现').exists() && text('消息').exists() && text('我的').exists()) {
        toast('进入58同城成功')
        break
    }
    sleep(1000)
    log('等待进入58同城主页')
}

let _租房_view = text('租房').findOne(10 * 1000)
if (!_租房_view) {
    toastLog('没有找到租房文本')
    exit()
}

_租房_view = _租房_view.parent()

if (_租房_view) {
    log('成功找到租房控件')
} else {
    log('没有找到租租房控件  ')
    exit()
}

if (_租房_view.click()) {
    log('点击租房控件成功')
} else {
    log('点击租房控件失败')
    exit()
}

//等待进入租房界面

while (1) {
    if (text('找室友').exists() && text('整租').exists() && text('合租').exists() && text('月租').exists()) {
        log('进入租房界面成功')
        break
    }
    sleep(1000)
    log('等待进入租房界面')

}

let _找室友_view = text('找室友').findOne(10 * 1000)
if (!_找室友_view) {
    log('没有找室友文本控件')
    exit()

}

_找室友_view = _找室友_view.parent()

if (!_找室友_view) {
    log('没有找到找室友控件')
    exit()
}

if (!_找室友_view.click()) {
    log('点击找室友控件失败')
    exit()
}

while (1) {
    if (text('全深圳').exists() && text('有房/无房').exists() && text('筛选').exists()) {
        log('进入找室友界面成功')
        break
    }
    sleep(1000)
    log('等待进入找室友界面')
}

let _有房无房_view = text('有房/无房').findOne(10 * 1000)
if (!_有房无房_view) {
    log('没有找到有房无房控件')
    exit()
}

log('点击有房无房')
click(_有房无房_view.bounds().centerX(), _有房无房_view.bounds().centerY())

sleep(2000)

let _有房找室友_view = text('有房找室友').findOne(10 * 1000)
if (!_有房找室友_view) {
    log('没有找到 有房找室友')
}

sleep(2000)

click(_有房找室友_view.bounds().centerX(), _有房找室友_view.bounds().centerY())
toastLog('等待十秒钟')
sleep(10 * 1000)

//循环前的变量准备

_有房找室友_view = text('有房找室友').findOne(10 * 1000)
if (!_有房找室友_view) {
    log('没有找到 有房找室友 ')
    exit()
}

_有房找室友_view = _有房找室友_view.parent()
if (!_有房找室友_view) {
    log('没有找到 有房找室友的父控件')
}

let 操作范围 = {
    h:_有房找室友_view.bounds().bottom + 50
}

log('操作范围为：%d', 操作范围.h)

loop:
while (1) {
    let _分钟发布浏览_view = textMatches(/\d+分钟前发布·\d+浏览/).findOne(10 * 1000)
    if (!_分钟发布浏览_view) {
        log('没有找到浏览，下滑')
        sleep(1000)
        className("android.widget.ScrollView").findOne().scrollForward()
        sleep(1000)
    } else {
        log('找到了分钟发布浏览')
        if (_分钟发布浏览_view.bounds().bottom < 操作范围.h) {
            log('屏幕上找不到该位置')
        } else {
            log('屏幕上能找到该位置')
            click(_分钟发布浏览_view.bounds().centerX(), _分钟发布浏览_view.bounds().centerY())
            while (1) {
                if (text('TA希望你').exists()) {
                    log('进入帖子主页成功')
                    break
                }
                sleep(1000)
                log('等待进入帖子主页')
            }


            
        }
    }
}