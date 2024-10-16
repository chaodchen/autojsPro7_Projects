
function 判断有无浏览 () {
    let 浏览 = textMatches(/.+·\d+浏览/).findOne()
    let 浏览量 = 浏览.text().split('·')[1].replace(/\D+/, '')
    log(浏览量)
    return Number(浏览量)
}

function 打招呼初始化() { 
    sleep(2000)
    swipe(300, 900, 300, 300, random(500, 1000))
    sleep(1000)
    textClick('相关推荐')
    sleep(2000)
    swipe(300, 100, 300, 900, random(500, 1000))
    sleep(2000)
    textClick('查看全部')
    text('来访记录').waitFor()
}

// 打招呼初始化()


// swipe(300, 100, 300, 900, random(500, 1000))



function 兼容线程 () {
    while (1) {
        if (textContains('阅读安全手册').exists()) {
            let v_1 = textContains('阅读安全手册').findOne()
            let v_2 = v_1.parent().parent().parent().child(1)
            click(v_2.bounds().centerX(), v_2.bounds().centerY())
        }
    }
}


function textClick (txt, r) {
    if (!r) r = 0
    r = Number(r)
    log('txt:'+txt)
    let txtView = text(txt).findOne(10 * 1000)
    if (!txtView) {
        console.error('没有找到：'+txt)
        exit()
    }

    let _x = txtView.bounds().centerX()
    if (random(0, 1) == 0) {
        _x = _x - random(0, r)
    } else {
        _x = _x + random(0, r)
    }

    if (random(0, 1) == 0) {
        _y = _y - random(0, r)
    } else {
        _y = _y + random(0, r)
    }

    let _y = txtView.bounds().centerY()
    log('x and y:'+_x+'  and  '+_y)
    if (device.sdkInt > 23) {
        log('安卓7或以上')
        click(_x, _y)
    } else {
        log('安卓7以下')
        Tap(_x, _y)
        sleep(1000 * 3)
    }
    return 1   
}


function clickView (_view, r) {
    if (!_view) {
        log('没有 _view 停止程序')
        exit()
    }

    if (!r) {
        r = 0
    }

    let _x = _view.bounds().centerX()
    let _y = _view.bounds().centerY()

    if (random(0, 1) == 0) {
        _x = _x - random(0, r)
    } else {
        _x = _x + random(0, r)
    }

    if (random(0, 1) == 0) {
        _y = _y - random(0, r)
    } else {
        _y = _y + random(0, r)
    }

    log('x and y:'+_x+'  and  '+_y)
    if (device.sdkInt > 23) {
        log('安卓7或以上')
        click(_x, _y)
    } else {
        log('安卓7以下')
        Tap(_x, _y)
        sleep(1000 * 3)
    }
    return 1
}