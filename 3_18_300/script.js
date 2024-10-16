//导入函数库
mods = require('mods.js')

//读取本地储存
本地储存 = storages.create(配置.代号)

//初始化变量
全局数组 = 本地储存.get('UI配置').index

log('全局数组：'+全局数组)

const IMGS_PATH = 'http://f.8-0000.com/image/'

if(!requestScreenCapture(true)){
    toast("请求截图失败");
    exit();
}

setScreenMetrics(720, 1280)

//Tap = null

// Tap = function (x, y, z) {
//     if (z) {
//         if (random(0,1) == 0) {
//             x = x-z
//         } else {
//             x = x+z
//         }

//         if (random(0,1) == 0) {
//             y = y-z
//         } else {
//             y = y+z
//         }
//     }
//     shell("input tap "+x+' '+y, true)
// }

//延迟函数

random_delay = function (max, min) {
    try {
        _d = random(min, max)
        sleep(_d * 1000)
    } catch (err) {
        log('延迟函数报错-->>  '+err)
        _d = 3 * 1000
    }
    sleep(_d)
}

console.show()
console.setPosition(400, 50)
console.setSize(344, 217)

//全体循环变量
_loop = 1

//杀死指定怪物的数量
_num = 0

//杀死指定数量的怪物就打开背包吃药
_num_a = 全局数组[0]

_num_c = 40

log('杀死:'+_num_a+'次怪就吃'+_num_c+'次药！')

//杀死指定怪物的数量就自动寻路到目标点
_num_b = 11

//指定初始坐标点
_coor = {
    x:222,
    y:173
}

//全图的坐标点
log('初始化中...'+IMGS_PATH)
_COORDATA = {
    挂机:images.findImage(captureScreen(), images.load(IMGS_PATH+'300_guaji.png'),{
        threshold : 0.8
    }),
    抓取:images.findImage(captureScreen(), images.load(IMGS_PATH+'300_zhuaqv.png'),{
        threshold : 0.8
    }),
    普攻:images.findImage(captureScreen(), images.load(IMGS_PATH+'300_pugong.png'),{
        threshold : 0.8
    }),
    背包:images.findImage(captureScreen(), images.load(IMGS_PATH+'300_beibao.png'),{
        threshold : 0.8
    }),
    瞬药:images.findImage(captureScreen(), images.load(IMGS_PATH+'300_shunyao.png'),{
        threshold : 0.8
    }),    
    蓝药:images.findImage(captureScreen(), images.load(IMGS_PATH+'300_lanyao.png'),{
        threshold : 0.8
    }),
    红药:images.findImage(captureScreen(), images.load(IMGS_PATH+'300_hongyao.png'),{
        threshold : 0.8
    }),
    目标:images.findImage(captureScreen(), images.load(IMGS_PATH+'300_mubiao2.png'),{
        threshold : 0.8
    })
}

for (key in _COORDATA) {
    if (_COORDATA[key] == null) {
        toastLog('初始化失败'+key)
        exit()
    } else {
        log('key-->>  '+key)
    }
}


toastLog('初始化完成')

/*
判断线程 = threads.start(function(){
    log(storage)
    while (1) {
        _坐标图片 = images.clip(captureScreen(), 11, 677, 55, 15)
        log(_坐标图片)
        sleep(storage.input_[2] * 1000)
        _坐标图片2 = images.clip(captureScreen(), 11, 677, 55, 15)
        log(_坐标图片2)
        if (_坐标图片 == _坐标图片2) {
            log('已超时，重新挂机')
            Tap(_COORDATA.挂机.x, _COORDATA.挂机.y)

        }
    }
})
*/
/**
 *  快捷:images.findImage(captureScreen(), images.load(IMGS_PATH+'300_kuaijie.png')),
    背包:images.findImage(captureScreen(), images.load(IMGS_PATH+'300_beibao.png')),
    关闭:images.findImage(captureScreen(), images.load(IMGS_PATH+'300_guanbi.png')),
*/


log('截图坐标图片成功')


var 时间线程 = null
while (_loop) {
    log('进入_loop循环中')

    //判断正在攻击的是不qi怪
    _d = captureScreen()
    if (images.findImage(_d, images.load(IMGS_PATH+'300_qi.png'), {
        region : [0, 320, 130, 30],
        threshold : 0.7
    }) && images.findImage(_d, images.load(IMGS_PATH+'300_mubiao.png'), {
        region : [0, 320, 120, 110],
        threshold : 0.8
    }) || images.findImage(_d, images.load(IMGS_PATH+'300_zhizhu.png'), {
        region : [0, 320, 130, 30],
        threshold : 0.7
    }) && images.findImage(_d, images.load(IMGS_PATH+'300_mubiao.png'), {
        region : [0, 320, 120, 110],
        threshold : 0.8
    })) {
        log('正在攻击qi怪,')
        Tap(_COORDATA.挂机.x, _COORDATA.挂机.y)
        sleep(3000)
        log('停止挂机成功')

        目标判断 = false

        for (let i = 0;i < 5; i++) {

            log('第'+(i+1)+"次搜索目标")
            Tap(_COORDATA.目标.x, _COORDATA.目标.y)
            sleep(3000)

            sleep(200)
            if (images.findImage(_d, images.load(IMGS_PATH+'300_qi.png'), {
                region : [0, 320, 130, 30],
                threshold : 0.8
            }) || images.findImage(_d, images.load(IMGS_PATH+'300_zhizhu.png'), {
                region : [0, 320, 130, 30],
                threshold : 0.7
            })) {
                log('本次目标正确')
                目标判断 = true
                break

            } else {
                log('本次目标错误')
                目标判断 = false
            }

        }

        if (目标判断) {
            log('目标结果正确')
            Tap(_COORDATA.普攻.x, _COORDATA.普攻.y)
            sleep(3000)

            log('开始普攻')

            判断 = true

            while (1) {
    
                _jp = captureScreen()
    
                if(images.findImage(_jp, images.load(IMGS_PATH+'300_zhi.png'), {
                    region : [0, 0, 250, 100],
                    threshold : 0.8
                })) {
                    log('找到了zhi,')
    
                    判断 = true
                    break
                } else {
                    log('正在战斗')
                }
                
                if(images.findImage(_jp, images.load(IMGS_PATH+'300_qi.png'), {
                    region : [0, 320, 130, 30],
                    threshold : 0.6
                }) || images.findImage(_jp, images.load(IMGS_PATH+'300_zhizhu.png'), {
                    region : [0, 320, 130, 30],
                    threshold : 0.7
                })) {
                    log('攻击目标正确')
                    判断 = true
                } else {
                    log('攻击目标不正确')
                    判断 = false
                    break
                }

                //判断当前坐标位置

            }

            if (判断) {
                _num++
                log('第'+_num+'次击败怪物,开始抓取')
                Tap(_COORDATA.抓取.x, _COORDATA.抓取.y)
                sleep(3000)

                random_delay(5, 8)
                log('停止抓取')
                Tap(_COORDATA.抓取.x, _COORDATA.抓取.y)
                sleep(3000)
                
                //判断击败怪物多少次
                if (_num % _num_a == 0) {
                    log('已击败'+_num_a+'次怪物,开始嗑药')
    
                    for (let i = 0; i < _num_c; i++) {
                        Tap(_COORDATA.瞬药.x, _COORDATA.瞬药.y)
                        sleep(3000)

                        Tap(_COORDATA.蓝药.x, _COORDATA.蓝药.y)
                        sleep(3000)

                        Tap(_COORDATA.红药.x, _COORDATA.红药.y)
                        sleep(3000)

                    }
    
                    log('嗑药完成!')
    
                }

            }

        } else {
            log('目标结果错误')
        }

        log('继续挂机')
        Tap(_COORDATA.挂机.x, _COORDATA.挂机.y)
        sleep(3000)


    }
}
