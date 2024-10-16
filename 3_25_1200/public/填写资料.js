/*
 * @Author: your name
 * @Date: 2020-03-26 22:38:30
 * @LastEditTime: 2020-03-30 20:16:44
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /TaoBaoProjcet/3_25_1200/public/填写资料.js
 */
log('开始填写资料')
性别 = 配置.其他.注册性别


//设置年月日坐标

if (device.width == 720) {
    coordObj = {
        year:{
            x:190,
            y:500
        },
        month:{
            x:359,
            y:500
        },
        day:{
            x:524,
            y:500
        },
        diff:184,
        ok:{
            x:531,
            y:874
        },
    }
} else if (device.width == 1080) {
    coordObj = {

        year:{
            x:305,
            y:766
        },
        month:{
            x:552,
            y:752
        },
        day:{
            x:802,
            y:766
        },
        diff:300,
        ok:{
            x:835,
            y:1332
        },
    }
} else {
    
}

coordObj.nums = '3-5'

textContains('填写资料').waitFor()

log('选择生日')
text('选择生日').findOne().parent().click()

sleep(1000)

log('随机选择生日')
Tap = null
Tap = function (_x, _y, _r) {

    if (_r) {

        if (random(0,1)) {
            _x = _x + _r
        } else {
            _x = _x - _r
        }

    }

    if (device.sdkInt < 24) {
        log('小于安卓7.0')
        shell('input tap '+_x+' '+_y, true)
    } else {
        log('大于或等于安卓7.0')
        click(_x, _y)
    }

}

//设置年份
设置日期('year')
设置日期('month')
设置日期('day')
Tap(coordObj.ok.x, coordObj.ok.y, 5)
sleep(random(500, 1000))
log('日期设置完成')


log('选择性别')

text(性别).findOne().parent().click()

log('性别选择完成')

text('下一步').findOne().click()

sleep(5000)

// sleep(30 * 1000)

// if (text('下一步').exists()) {
//     log('还在下一步')
//     return false

// } else {
//     return true
// }

function 设置日期 (_str) {

    for (let i = 0; i < getRangeRandomNum(coordObj.nums, '-'); i++) {
        log(_str+'+')
        Tap(coordObj[_str].x, coordObj[_str].y, 5)
        sleep(random(500, 1000))
    }
}

function getRandomStr (_str, _sign) {

    _arr = _str.split(_sign)

    return _arr[random(0, _arr.length - 1)]
    
}
function getRangeRandomNum (_str, _sign) {
    log('_str-->>  '+_str)
    _arr = _str.split(_sign)
    return random(_arr[0], _arr[1])
}