_url = "127.0.0.1:1990/getDeviceInfoFromServer?"
_data = "destPackageInfos="+"com.immomo.momo"+"&packageName="+配置.微狗.包名+"&chanel="+配置.微狗.渠道号+"&survival=false&device="+配置.微狗.机型+"&sdk="+配置.微狗.sdk
log("改机data-->>  "+_data)
while (1) {
    try {
        _res = http.get(_url+_data)
        if (_res.statusCode == 200) {
            _返回json = _res.body.json()
            _imei = _返回json.data.imei
            _型号 = _返回json.data.model
            _品牌 = _返回json.data.manufacture
            log('imei：'+_imei+'\n品牌：'+_品牌+'\n型号：'+_型号)
            log('开始写入设备信息')
            files.append(配置.路径.账号数据+'.m.txt', _imei+'---')
            files.append(配置.路径.账号数据+'.m.txt', _品牌+'---')
            files.append(配置.路径.账号数据+'.m.txt', _型号+'---')
            break
        } else {
            log('改机失败！'+_res.statusCode)
        }
    } catch (_err) {
        log('改鸡报错')
        
    }
}