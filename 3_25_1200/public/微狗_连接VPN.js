/*
 * @Author: your name
 * @Date: 2020-03-28 14:03:02
 * @LastEditTime: 2020-03-30 21:06:24
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /TaoBaoProjcet/3_25_1200/public/微狗_连接VPN.js
 */
_url = "127.0.0.1:1990/vpnCtrl?"
_data = "isConn=1&ip="+配置.微狗.vpn地址+"&name="+配置.微狗.vpn账号+"&password="+配置.微狗.vpn密码+"&mppe=true"
log('_data  -->>  '+_data)

_返回json = {}
while (1) {
    try {
        _res = http.get(_url+_data)
        if (_res.statusCode == 200) {
            _返回json = _res.body.json()
            if (_返回json.code == 0) {
                log('连接vpn成功')
                if (配置.微狗.VPN判断 == '开') {
                    console.info('开始判断网速')
                    try {
                        _baidu_res = http.get('http://baidu.com')   
                        if (_baidu_res.statusCode == 200) {
                            log('该vpn网络连接正常')
                            break
                        } else {
                            log('该vpn网络连接异常，重新连接')
                        }
                    } catch (_err) {
                        log('该vpn有问题，连接下一个')
                    }
                } else {
                    console.info('不用判断网速')
                    break
                }
            } else {
                log('连接vpn失败')
            }
        } else {
            log('api接口请求失败')
        }
    } catch (_err) {
        log('连接vpn报错')
    }
}