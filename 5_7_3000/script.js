//定义常量
const 穿越时空包名 = 'com.location.jiaotv'
const MX播放器包名 = 'com.mxtech.videoplayer.ad'
console.show()
//打开穿越时空
app.launch(穿越时空包名)
text('虚拟保护').waitFor()
log('进入穿越时空成功')
//进入快手直播伴侣
let 蓝色加号 = id('appmainadd').findOne(2000)
if (!蓝色加号) {
    log('没有找到蓝色加号')
    exit()
} else {
    log('点击蓝色加号')
    蓝色加号.click()
}

text('保护从这里启动').waitFor()
log('保护从这里启动')
log('延迟一秒')
sleep(1000)
let 快手直播伴侣str = text('快手直播伴侣').findOne(2000)
if (!快手直播伴侣str) {
    log('没有找到快手直播伴侣str')
    exit()
}

log('准备点击快手直播伴侣的父父控件')
快手直播伴侣str.parent().parent().click()
log('点击成功')

loop:
while (1) {
    log('开始loop循环')
    let 我要直播 = text('我要直播').findOne()

    log('找到了  我要直播  点击我要直播')
    我要直播.click()
    //开始找定位
    text('开始直播').waitFor()
    log('延迟五秒钟')
    sleep(5000)
    log('找到了开始直播')
    while (1) {
        if (text('添加地理位置').exists()) {
            log('添加地理位置')
            id('location_switch').findOne().click()
            log('点击开关成功,延迟五秒钟')
            sleep(5000)
        } else if (text('位置信息获取中...').exists()) {
            log('位置信息获取中')
            id('location_switch').findOne().click()
            log('点击开关成功, 延迟五秒钟')
            sleep(5000)
        } else {
            toastLog('出现了地址位置')
            break
        }
    }
    let 开始直播 = text('开始直播').findOne()
    log('开始直播, 点击开始直播')
    开始直播.click()
    sleep(2000)
    log('竖屏玩游戏')
    click('竖屏玩游戏')
    log('竖屏玩游戏点击成功')
    sleep(2000)
    click('立即开始')
    sleep(2000)
    log('结束loop循环')
    let 提示 = text('你已切换到手机 3G/4G 网络，请注意流量使用。').findOne(10 * 1000)
    if (提示) {
        log('点击确定')
        click('确定')
        log('确定成功')
    }
    log('打开MX播放器')
    app.launch(MX播放器包名)
    id('play_last').waitFor()
    log('进入MX播放器成功')
    视频 = id('list_item').findOne(10 * 1000)
    if (!视频) {
        log('没有找到播放视频')
        exit()
    }
    log('找到了播放视频')
    log('点击视频')
    视频.click()
    log('等待一个小时')
    sleep(100 * (60 * 1000))
    log('调出多任务界面')
    recents()
    toastLog('手动点击一下')
}