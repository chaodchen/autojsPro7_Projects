
log('打开无极：'+launch('org.wuji'))

while (1) {
    _v = text('更换IP').findOne(5000)
    if (_v) {
        log('找到了更换IP')
        if(_v.click()){
            log('点击更换IP成功')
            sleep(1000)
            while(text('正在更换IP…').exists());
            log('更换IP成功')
            sleep(3000)
            if (判断联网()) {
                break
            } else {
                log('联网失败延迟13秒')
                sleep(13 * 1000)
            }
        } else {
            log('点击更换IP失败')
        }
    } else {
        log('没有找到更换IP')
    }
}

function 判断联网 () {
    http.__okhttp__.setTimeout(8 * 1000);
    try {
        _r = http.get('https://www.baidu.com')
        log('_r'+_r)
        if (_r != '') {
    
            if (_r.statusCode == 200) {
                return true
            } else {
                return false
            }
        } else {
            return false
        }
    } catch (_err) {
        log('请求报错')
        return false
    }
}