_url = "http://127.0.0.1:1990/myLocation"
_path = '/sdcard/.934082222/经纬度.txt'
if (files.isFile(_path)) {
    
    经纬度数组 = files.read(_path).split('\n')
    本次经纬度 = 经纬度数组.shift()
    log('本次经纬度：'+本次经纬度)
    经度 = 本次经纬度.split('-')[0]
    纬度 = 本次经纬度.split('-')[1]
    log('经度：'+经度)
    log('纬度：'+纬度)
    _url = _url+'?lat='+经度+'&lon='+纬度
    log('_url:'+_url)


    保存文本 = 经纬度数组.toString().replace(/,/g, '\n')
    log('保存文本:'+保存文本)
    files.write(_path, 保存文本)
}


if (配置.微狗.定位 == '开') {
    toastLog('定位打开')
    console.info('url:'+_url)
    _返回json = {}
    while (1) {
        try  {
            _res = http.get(_url)
            if (_res.statusCode == 200) {
                _返回json = _res.body.json()
                if (_返回json.code == 0) {
                    log('定位成功')
                    break
                } else {
                    log('定位失败')
                    return false
                }
            } else {
                log('api接口请求失败')
                return false
            }
        } catch (_err) {
            log('定位报错')
            return false
        }
    }
} else {
    toastLog('定位关闭')
}

return true