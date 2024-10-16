滑动次数 = random(5, 10)

for(let i = 0; i < 滑动次数; i++){
    随机兼容坐标滑动()
    sleep(random(500, 1500))
}

function 随机兼容坐标滑动 () {
    _宽度 = device.width
    _高度 = device.height
    log('\n设备宽度为：'+_宽度+'\n设备高度为：'+_高度)
    _x = _宽度/2 + random(0, _宽度/10)
    log('x:'+_x)
    _y = _高度/1.7 + random(0, _高度/10)
    log('y:'+_y)

    if (device.sdkInt > 23) {
        swipe(_x, _y, (_x - random(0, _宽度/10)), (_x - random(0, _高度/10)), random(500, 1500))
 
    } else {
        _shellStr = 'input swipe '+_x+' '+_y+' '+(_x - random(0, _宽度/10))+' '+(_x - random(0, _高度/10))+' '+random(500, 1500)
        log(_shellStr)
        shell(_shellStr, true)
    }   


}

