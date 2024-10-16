_url = '127.0.0.1:1990/setWhiteList?'
_str = 配置.路径.白名单路径.replace(/\//g, '%2f')
_data = 'path='+_str

_res = http.get(_url+_data)
if (_res.statusCode == 200) {
    log('添加白名单路径成功')
    log(_res.body.json())
}