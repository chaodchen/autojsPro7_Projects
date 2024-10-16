//脚本初始化
device.setBrightnessMode(0)
device.setMusicVolume(0)
// device.setBrightness(40)
const 全局数组 = 本地储存.get('UI配置').input

try {
    if (images.requestScreenCapture()) {
        log('申请截屏成功')
    }
} catch (err) {
    log('申请截屏报错')
}

const 本次任务 = 全局数组[0]
const 下滑次数 = 全局数组[1] || 0
const 屏幕亮度 = 全局数组[2] || 100

log("这个手机的机型："+device.model)
var 中奖次数 = 0
var 参与次数 = 0
var 图库, 坐标库;
device.setBrightness(屏幕亮度)

if (device.model == 'SM-G935F') {
    log('这台手机是三星s7')
    图库 = {
        我知道了 : images.load('http://f.8-0000.com./s7/wozhidaole.jpg'),
        直播已结束 : images.load('http://f.8-0000.com./s7/zhibojieshu.jpg'),
        抢 : images.load('http://f.8-0000.com./s7/qiang.jpg'),
        大家 : images.load('http://f.8-0000.com./s7/dajia.jpg'),
        玩家红包 : images.load('http://f.8-0000.com./s7/wanjiahongbao.jpg'),
        直播福袋 : images.load('http://f.8-0000.com./s7/zb_fudai.jpg'),
        福袋 : images.load('http://f.8-0000.com./s7/fudai.jpg'),
        参与 : images.load('http://f.8-0000.com./s7/canyu.jpg'),
        发放记录 : images.load('http://f.8-0000.com./s7/fafangjilu.jpg'),
        立即关注 : images.load('http://f.8-0000.com./s7/lijiguanzhu.jpg'),
        钻石 : images.load('http://f.8-0000.com./s7/zuanshi.jpg'),
        红直播 : images.load('http://f.8-0000.com./s7/hongzhibo.jpg'),
        白直播 : images.load('http://f.8-0000.com./s7/baizhibo.jpg'),
        退出 : images.load('http://f.8-0000.com./s7/tuichu.jpg')
    }
    坐标库 = {
        叉:{
            x:536,
            y:1473
        },
        推荐:{
            x:229,
            y:255
        },
        音乐:{
            x:366,
            y:267
        },
        乡野:{
            x:513,
            y:268
        },
        生活:{
            x:651,
            y:267
        },
        媒体:{
            x:798,
            y:268
        },
        懂车帝:{
            x:972,
            y:267
        }
    }
}


if (device.model == 'EVA-AL10') {
    log('这台手机是华为p9')
    图库 = {
        直播福袋 : images.load('http://f.8-0000.com./image/zb_fudai.jpg'),
        福袋 : images.load('http://f.8-0000.com./image/fudai.jpg'),
        参与 : images.load('http://f.8-0000.com./image/canyu.jpg'),
        发放记录 : images.load('http://f.8-0000.com./image/fafangjilu.jpg'),
        立即关注 : images.load('http://f.8-0000.com./image/lijiguanzhu.jpg'),
        钻石 : images.load('http://f.8-0000.com./image/zuanshi.jpg'),
        红直播 : images.load('http://f.8-0000.com./image/hongzhibo.jpg'),
        白直播 : images.load('http://f.8-0000.com./image/baizhibo.jpg'),
        退出 : images.load('http://f.8-0000.com./image/tuichu.jpg')
    }
    坐标库 = {
        推荐:{
            x:88,
            y:267
        },
        推荐:{
            x:247,
            y:268
        },
        音乐:{
            x:389,
            y:267
        },
        乡野:{
            x:552,
            y:268
        },
        生活:{
            x:699,
            y:267
        },
        媒体:{
            x:829,
            y:268
        },
        懂车帝:{
            x:1013,
            y:267
        }
    }
}
log('启动西瓜视频')
app.launch('com.ss.android.article.video')
toastLog('延迟十秒钟')
let 我知道了坐标 = images.findImage(captureScreen(), 图库.我知道了, {
    threshold : 0.8
})

if (我知道了坐标) {
    log('找到了我知道了坐标')
    点击(我知道了坐标.x, 我知道了坐标.y)
}

log('准备开始下滑')
for (let i = 0; i < 下滑次数; i++) {
    toastLog('第'+i+'次下滑')
    滑动(888, 1127, 788, 329, 1000)
}

toastLog('开始找白直播')

while (1) {
    let 白直播图标 = images.findImage(captureScreen(), 图库.白直播, {
        threshold : 0.8
    })
    if (白直播图标) {
        log('找到了白直播图标,开始点击')
        点击(白直播图标.x, 白直播图标.y)
        sleep(5000)
        break
    } else {
        log('没有找到白直播图标')
    }
}

while (1) {
    var 红直播图标 = images.findImage(captureScreen(), 图库.红直播, {
        threshold : 0.8
    })

    if (红直播图标) {
        log('找到了红直播图标')
        break
    } else {
        log('没有找到红直播图标')
    }
}

//脚本开始
log('开始点击任务')
switch (本次任务) {
    case "推荐":
        log('推荐')
        break
    case "游戏":
        log('游戏')
        点击(坐标库.游戏.x, 坐标库.游戏.y)
        break
    case "音乐":
        log('音乐')
        点击(坐标库.音乐.x, 坐标库.音乐.y)
        break
    case "乡野":
        log('乡野')
        点击(坐标库.乡野.x, 坐标库.乡野.y)
        break
    case "生活":
        log('生活')
        点击(坐标库.生活.x, 坐标库.生活.y)
        break
    case "媒体":
        log('媒体')
        点击(坐标库.媒体.x, 坐标库.媒体.y)
        break
    case "懂车帝":
        log('懂车帝')
        点击(坐标库.懂车帝.x, 坐标库.懂车帝.y)
        break
}

sleep(5000)
loop:
while (1) {
    let 直播福袋坐标 = images.findImage(captureScreen(), 图库.直播福袋, {
        threshold : 0.8
    })

    if (直播福袋坐标) {
        log('找到了直播福袋坐标')
        点击(直播福袋坐标.x, 直播福袋坐标.y)
        sleep(5000)
        let 福袋坐标 = null
        let 红包坐标 = null
        
        for (let i = 0; i < 5; i++) {
            福袋坐标 = images.findImage(captureScreen(), 图库.福袋, {
                threshold : 0.8
            })

            if (福袋坐标) {
                log('找到了福袋坐标,开始点击福袋坐标')
                点击(福袋坐标.x , (福袋坐标.y + 30))
                break
            } else {
                log('没有找到福袋坐标')
                sleep(1000)
            }
        }

        红包坐标 = images.findImage(captureScreen(), 图库.玩家红包, {
            threshold : 0.8
        })

        if (福袋坐标 || 红包坐标) { 
            log('开始找一键参与')
            let 参与坐标 = null
            if (福袋坐标) {
                for (let i = 0;i < 5; i++) {
                    参与坐标 = images.findImage(captureScreen(), 图库.参与, {
                        threshold : 0.6
                    })
    
                    if (参与坐标) {
                        log('找到了参与坐标,点击参与坐标')
                        点击(参与坐标.x, 参与坐标.y)
                        sleep(2000)
                        break
                    } else {
                        log('没有找到参与坐标')
                    }
                }
            }


            if (红包坐标) {
                log('找到了红包坐标,点击红包坐标')
                点击(红包坐标.x, 红包坐标.y)

            }

            if (参与坐标 || 红包坐标) {
                log('开始找发放记录和抢红包')
                let 发放记录坐标 = null
                let 抢坐标 = null
                let 发放记录状态 = false
                let 抢状态 = false

                for (let i = 0 ; i < 300; i++) {
                    _截屏 = captureScreen()
                    发放记录坐标 = images.findImage(_截屏, 图库.发放记录, {
                        threshold : 0.8
                    })
                    抢坐标 = images.findImage(_截屏, 图库.抢, {
                        threshold : 0.8
                    })

                    直播结束 = images.findImage(_截屏, 图库.直播已结束, {
                        threshold : 0.8
                    })

                    if (直播结束) {
                        toastLog('直播已结束')
                        break
                    }

                    if (参与坐标 && 发放记录坐标) {
                        log('找到了参与、发放记录,随便点击一个地方')
                        发放记录状态 = true
                        点击(300, 300)
                        参与次数++
                        toastLog('已经参与'+参与次数+'次抽奖')
                        sleep(1000)
                        if (!红包坐标) {
                            log('已经抢到福袋且红包图标不存在')
                            break
                        }
                    } else if (红包坐标 && 抢坐标) {
                        log('找到了红包、抢坐标')
                        抢状态 = true
                        点击(抢坐标.x, 抢坐标.y)
                        while (1) {
                            if (images.findImage(captureScreen(), 图库.大家,{
                                threshold : 0.8

                            })) {
                                log('找到了大家')
                                break
                            } else {
                                log('没有找到大家')
                                sleep(1000)
                            }
                        }
                        log('点击x给他x掉')
                        点击(坐标库.叉.x, 坐标库.叉.y)
                        参与次数++
                        toastLog('已经参与'+参与次数+'次抽奖')
                        sleep(1000)
                        if (!参与坐标) {
                            log('已经抢到红包且参与坐标不存在')
                            break
                        }
                    } else {
                        log('没有找到发放记录坐标和抢坐标')
                    }

                    if (发放记录状态 && 抢状态) {
                        log('发放记录状态和抢状态都为真')
                        break
                    }

                }
            }
        } else {
            log('真的没有找到福袋坐标')
        }
        log('准备返回')
        do {
            红直播图标 = images.findImage(captureScreen(), 图库.红直播, {
                threshold : 0.8
            })
            if (红直播图标) {
                log('找到了红直播图标')
                break
            } else {
                log('没有找到红直播图标')
                back()
                sleep(3000)
                let 退出 = images.findImage(captureScreen(), 图库.退出, {
                    threshold : 0.8
                })
                if (退出) {
                    log('找到了退出')
                    点击(退出.x, 退出.y)
                    sleep(3000)
                }
            }
        } while(1);
        log('返回主页成功,开始刷新')
        点击(红直播图标.x, 红直播图标.y)
        log('点击红直播成功')
        sleep(3000)
        log('开始下拉')
        滑动(888, 1127, 788, 329, 1000)
        log('延迟五秒钟')
        sleep(5000)
        log('刷新成功')
    } else {
        log('没有找到直播福袋坐标,开始下滑')
        滑动(888, 1127, 788, 329, 1000)
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

function 点击 (x, y) {
    if (device.sdkInt > 23) {
        click(x, y)
    } else {
        Tap(x, y)
        sleep(1000 * 3)
    }
}
