if(!requestScreenCapture(true)){
    toast("请求截图失败");
    exit();
}
const IMGS_PATH = 'http://files.ajvip.pro/res/'

Tap = null

Tap = function (x, y, z) {
    if (z) {
        if (random(0,1) == 0) {
            x = x-z
        } else {
            x = x+z
        }

        if (random(0,1) == 0) {
            y = y-z
        } else {
            y = y+z
        }
    }
    shell("input tap "+x+' '+y, true)
}

Swipe = null

Swipe = function (x, y, xx, yy, z) {
    shell("input swipe "+x+' '+y+' '+xx+' '+yy+' '+z, true)
}

loop = true
toastLog('异世界Ol')
while (loop) {

    sleep(1000)
    toastLog('开始滑动')
    Swipe(670, 247, 670, 247, 2000)

    toastLog('开始点击')
    while (1) {
        if (images.findImage(captureScreen(), images.load(IMGS_PATH+'100_xitong.png'), {
            threshold : 0.8
        })) {
            toastLog('没有进入战斗界面')
            Tap(670, 400)

        } else {
            toastLog('进入战斗界面成功')
            break
        }
        sleep(1000)
    }


    toastLog('等待战斗结束')
    while (1) {

        if (images.findImage(captureScreen(), images.load(IMGS_PATH+'100_zhandou.png'), {
            threshold : 0.8
        })) {
            toastLog('战斗结束')
            Tap(1160, 484)
            break
        } else {
            log('战斗中')
        }

    }

    toastLog('等待5秒')
    sleep(5 * 1000)


}