downloads('http://f.8-0000.com/music/end.mp3', '/sdcard/end.mp3')
mods = require('mods.js')
log(mods)

控件组 = {
    商品:id('layer_container'),
    返回:desc('返回'),
    确定:id('confirm_text').text('确定')
}

taps = function (x,y,z) {
    //兼容安卓版本同步点击
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
    if (device.sdkInt > 23) {
        click(x, y)
    } else {
        shell("input tap "+x+' '+y, true)
    }
}

//console.show()
getInput = 本地储存.get('UI配置').input
getCheckbox = 本地储存.get('UI配置').checkbox
getRadio = 本地储存.get('UI配置').radio

商品名称0 = ''
商品控件y = 0
商品数量 = 1
屏幕高度 = device.height
商品名称数组 = []
脚本任务 = getRadio[0]

log(脚本任务)

mods.view.waitViews(['综合', '销量', '新品'], 'desc', 1000, 0)
log('进入商品列表界面')

while (1) {
    if (商品数量 > Number(getInput[0])) {
        toastLog('购买完成！！！')
        media.playMusic('/sdcard/end.mp3')
        sleep(media.getMusicDuration())
        break
    }
    log('进入循环')
    商品列表 = 控件组.商品.find()
    if (商品列表) {
        log('找到了商品列表')
        //点击商品
        商品列表.forEach((商品view) => {
            log('开始便利')
            mods.view.waitViews(['综合', '销量', '新品'], 'desc', 1000, 5)

            if (商品view != null && 商品view.className() == 'android.widget.RelativeLayout') {
                log('商品类名正确,')
                商品名称 = 商品view.findOne(id('title')).text()
                log('商品名称-->>  '+商品名称)
                if (商品名称数组.toString().indexOf(商品名称) == -1) {
                    log('不重复')
                    商品控件y = 商品view.bounds().centerY()
                    log('商品控件y坐标为：'+商品控件y)
                    log('屏幕高度为：'+屏幕高度)
                    if (商品控件y < 屏幕高度 * 0.75 && 商品控件y > 屏幕高度 * 0.25) {
                        log('控件坐标正常')
                        商品名称数组.push(商品名称)
                        log('添加商品名称进数组')
                        click(商品view.bounds().centerX(), 商品view.bounds().centerY())
                        if (mods.view.waitViews(['店铺', '客服'], 'text',1000, 5)) {
                            toastLog('进入商品界面成功')
                            if (!脚本任务) {
                                toastLog('浏览')
                                new Function('配置', mods.internet.getCloudFiles(配置.路径+'public/2_浏览商品.js', 配置.密钥))(配置)
                            } else {
                                toastLog('加入购物车')
                                new Function('配置', mods.internet.getCloudFiles(配置.路径+'public/2_加入购物车.js', 配置.密钥))(配置)
                                商品数量++
                            }
                            返回view =desc('返回').findOne(5000)
                            log('找到了返回控件')
                            if (返回view.click()) {
                                log('返回成功')
                            } else {
                                log('返回失败')
                            }
                        } else {
                            log('没有进入商品主页')
                        }
                    } else {
                        log('坐标不正常')
                    }
                } else {
                    log('商品名称重复')
                }
            } else {
                log('商品错误')
            }
        })
        log('遍历完成')
        sleep(random(500, 1500))
        swipe(500, 1000, 400, 300, 1000)
        log('下滑成功')
        sleep(random(500, 1500))
    } else {
        log('没有找到商品列表')
        break
    }
}

toastLog('打开购物车')
desc('打开我的购物车').findOne().click()
text('购物车').waitFor()
sleep(1000)
desc('全选').findOne().parent().click()

function tapIfView(_view, _arr, _uiselect, _time, _num) {
    log('要点击的控件bounds为：'+_view.bounds())
    taps(_view.bounds().centerX(), _view.bounds().centerY(), 10)
    log('模拟点击该控件')
    return mods.view.waitViews(_arr, _uiselect, _time, _num)
}

function downloads (_url, _path) {
    _res = http.get(_url)
    if (_res.statusCode != 200) {
        toastLog('下载失败！')
        return false
    } else {
        files.writeBytes(_path, _res.body.bytes())
        toastLog('下载成功')
    }
}