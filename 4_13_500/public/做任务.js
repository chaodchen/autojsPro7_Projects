//申请权限>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
// console.show()
//声明常量>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
log('开始执行做任务函数')
// const 关注次数 = 5
// const 点赞次数 = 5
// const 快转次数 = 5
// if (files.isFile('/sdcard/guanzhu.png') && files.isFile('/sdcard/yiguanzhu.png')) {
//     log('图片存在')
// } else {
//     log('图片不存在')
//     下载图片()
// }

log('开始加载网络图片')
// 关注图片 = images.load('http://f.8-0000.com/image/mi4_new_guanzhu.jpg')
// 已关注图片 = images.load('http://f.8-0000.com/image/mi4_new_yiguanzhu.jpg')

关注图片 = images.load('http://f.8-0000.com/image/mi4_guanzhu.png')
已关注图片 = images.load('http://f.8-0000.com/image/mi4_yiguanzhu.png')

log('网络图片加载完毕')
const 任务延迟 = 3000
const 刷新延迟 = 5000
const 刷关注微博次数 = 6

//声明变量>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>

var 已关注次数 = 0
var 已点赞次数 = 0
var 已刷关注微博次数 = 0
var 已快转次数 = 0
var 微博内容组 = []

//脚本初始化>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>

try {
    if (images.requestScreenCapture()) {
        log('申请截屏成功')
    }
} catch (err) {
    log('申请截屏报错')
}
toastLog('延迟个五秒钟！')
sleep(5000)
// 兼容线程 = threads.start(兼容)

//脚本开始>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
// id("titlebarTabView_hot").findOne().click()

// id("titlebarTabView_feed").findOne().click()
id("titlebarTabView_hot").findOne().click()

log('点击热门，浏览热门微博')
do {
    log('进入do_while循环')
    toastLog('当前是第'+(微博分身号-1)+'个微博分身！')
    sleep(3000)
    if (text('有内容发送失败，已存入草稿箱').exists()) {
        log('有草稿箱')
        草稿箱()
        sleep(1000)
    }

    if (已关注次数 < 关注次数) {
        log('开始关注任务')
        关注任务()
    }
    sleep(任务延迟)
    if (已点赞次数 < 点赞次数) {
        log('开始点赞任务')
        点赞任务()
    }
    sleep(任务延迟)
    热门刷新()
} while (已关注次数 < 关注次数 || 已点赞次数 < 点赞次数);
log('推荐任务已完成')

id("titlebarTabView_feed").findOne().click()

// id("titlebarTabView_hot").findOne().click()
log('点击关注，浏览关注微博')

刷关注微博任务()

log('做任务已结束')
// if (兼容线程.isAlive()) {
//     兼容线程.interrupt()
// }

//函数库>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>

function 刷关注微博任务 () {
    do {
        if (已快转次数 < 快转次数) {
            快转任务()
        }

        if (已刷关注微博次数 < 刷关注微博次数) {
            热门刷新()
            已刷关注微博次数++
        }
        
    } while(已刷关注微博次数 < 刷关注微博次数 || 已快转次数 < 快转次数);
}

function 关注任务 () {
    log('关注任务函数开始了')
    while (1) {
        log('开始截屏')
        let _截屏 = images.captureScreen()
        log('截屏成功')
        let _找图结果 = images.findImage(_截屏, 关注图片)
        log('找图成功')
        if (_找图结果) {
            log('找到了关注图片')
            log('x:%d, y:%d', _找图结果.x, _找图结果.y)
            tap点击(_找图结果.x, _找图结果.y)
            sleep(3000)
            _截屏 = images.captureScreen()
            log('截屏成功')
            _找图结果 = images.findImage(_截屏, 已关注图片)
            if (_找图结果) {
                log('找到了已关注图片')
                已关注次数++
                toastLog('已关注'+已关注次数+'次！')
                break
            } else {
                log('没有找到已关注图片')
            }
        } else {
            log('没有找到关注图片')

            兼容下滑()
            sleep(3000)
            // _热门列表 = id("lvUser").className("android.support.v7.widget.RecyclerView").scrollable(true).depth(16).findOne()
            // log('热门列表')
            // if (_热门列表.scrollForward()) {
            //     log('下滑成功')
            //     sleep(1000)
            // }
        }
    }
}

function 兼容下滑 () {
    if (device.sdkInt > 23) {
        swipe(555, 1344, 555, 550, 1000)
    } else {
        Swipe(555, 1344, 555, 550, 1000)
        sleep(3000)
    }
}

function 点赞任务 () {
    _热门列表 = id("lvUser").className("android.support.v7.widget.RecyclerView").scrollable(true).depth(16).findOne()
    log('找到了热门列表')
    _点赞按钮 = _热门列表.findOne(id('rightButton'))
    if (_点赞按钮) {
        log('找到了点赞按钮')
        if (_点赞按钮.click()) {
            log('点赞成功')
            已点赞次数++
            toastLog('已点赞'+已点赞次数+'次！')
        } else {
            log('点赞失败')
        }
    } else {
        log('没有找到点赞按钮')
    }
}

function 快转任务 () {
    _热门列表 = id("lvUser").findOne()
    log('找到了热门列表')
    _转发按钮 = _热门列表.findOne(id('leftButton'))
    if (_转发按钮) {
        log('找到了转发按钮')
        while(!_转发按钮.click());
        log('点击转发按钮成功')
        while (!text('快转').exists() && !text('转发').exists());
        while(!click('快转'));
        while(!desc('首页').exists() && !desc('消息').exists());
        已快转次数++
        toastLog('已快转'+已快转次数+'次！')
    } else {
        log('没有找到转发按钮')
    }
}

function 热门刷新 () {
    _首页按钮 = desc('首页').findOnce()
    if (_首页按钮) {
        log('找到了首页按钮')
        _首页按钮.click()
        sleep(刷新延迟)
    } else {
        log('没有找到首页按钮')
    }
}

function tap点击 (x, y) {
    log('tap点击')
    if (device.sdkInt > 23) {
        click(x, y)

    } else {
        Tap(x, y)
        sleep(3000)
    }
}

function sh点击 (x, y) {
    _sh_str = 'input tap 100 100'
    while (1) {
        _sh_r = shell(_sh_str, true)
        if (_sh_r.code == 0) {
            log('点击成功x:%d,y:%d', x, y)
            break
        } else {
            log('点击失败x:%d,y:%d', x, y)
            log(_sh_r)
        }
    }

}

function 草稿箱 () {
    _str = text('有内容发送失败，已存入草稿箱').findOne()
    log('有内容发送失败，已存入草稿箱')
    if (_str.parent().click()) {
        log('点击草稿箱成功')
        while(!text('草稿箱').exists());
        id('draftbox2_item').findOne().longClick()
        _str2 = text('清空草稿箱').findOne()
        log('找到了清空草稿箱')
        if (_str2.click()) {
            log('清空草稿箱成功')
            // sleep(1000)
            _str3 = text('是否要清空草稿箱？').findOne()
            log('是否要清空草稿箱？')
            while(!click('确定'));
            // sleep(2000)
            // back()
            while(!id("rltitleBack").findOne().click());
            log('点击返回成功')
        } else {
            log('清空草稿箱失败')
            exit()
        }
    } else {
        log('点击草稿箱失败')
        exit()
    }
}

function 下载图片 () {
    log('开始下载关注图片')
    _res = http.get('http://f.akvip.top/image/mi4_guanzhu.png')
    if (_res.statusCode != 200) {
        toastLog('请求失败')
        exit()
    }
    files.writeBytes('/sdcard/guanzhu.png', _res.body.bytes())

    log('开始下载已关注图片')
    _res1 = http.get('http://f.akvip.top/image/mi4_yiguanzhu.png')
    if (_res1.statusCode != 200) {
        toastLog('请求失败')
        exit()
    }
    files.writeBytes('/sdcard/yiguanzhu.png', _res1.body.bytes())
}