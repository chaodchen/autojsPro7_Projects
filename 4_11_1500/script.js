//导入函数库
mods = require('mods.js')

var 图库 = '/.共享文件夹/Screenshots/'

// if(!requestScreenCapture(true)){
//     toast("请求截图失败");
//     exit();
// }

//读取本地储存
本地储存 = storages.create(配置.代号)

//初始化变量
//全局数组 = 本地储存.get('UI配置').index

sleep(2000)

//findOne_img_tap('kaishiyouxi.png', 2)

findOne_img_colors('#D7B581', [[984, 431, '#CDC5BA'], [998, 430, '#BFB7AD'], [1016, 430, '#BFB6AB']], 2)

console.show()
//创建角色()

//>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>函数库>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>

function 创建角色 () {

    sleep(2000)

    find_img_tap('nan.png', 10)

    find_img_tap('jinglingyouxia.png', 10)

    find_img_tap('shaizi.png', 2)

    find_img_tap('chuangjianjuese.png', 2)

    find_img_tap('tiaoguodonghua.png', 2)

    sleep(2000)

    toastLog('创建角色成功')

}

function find_img_tap (_imgName, _delay) {
    _v = images.findImage(captureScreen(), images.read(图库+_imgName))
    if (_v) {
        log('find_img_tap  -->>  true')
        Tap(_v.x, _v.y)
        sleep(_delay * 1000)
    } else {
        log('find_img_tap  -->>  false')
    }
}

function findOne_img_tap (_imgName, _delay) {
    while (1) {
        _v = images.findImage(captureScreen(), images.read(图库+_imgName))
        if (_v) {
            log('find_img_tap  -->>  true')
            Tap(_v.x, _v.y)
            sleep(_delay * 1000)
            break
        } else {
            log('find_img_tap  -->>  false')
        }
    }
}

function findOne_img_colors (_color, _px, _delay) {
    while (1) {
        _v = images.findMultiColors(captureScreen(), _color, _px)
        if (_v) {
            log('find_img_colors  -->>  true')
            Tap(_v.x, _v.y)
            sleep(_delay * 1000)
            break
        } else {
            log('find_img_colors  -->>  false')
        }
    }
}
//>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>函数库>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>