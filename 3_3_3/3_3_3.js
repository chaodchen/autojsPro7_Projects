"ui";

//>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>定义变量1111111>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>

var 配置 = {
    密钥:'a8tnvj2qscr5c6h6',
    代号:'3_3_3',
    账号:'17685034710@163.com'
}

配置.路径 = 'TaoBaoProjcet/'+配置.代号+'/'
配置.日志 = '/sdcard/'+配置.代号+'_log.txt'


//新建本地储存
本地储存 = storages.create(配置.代号)

//>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>脚本初始化>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>

// if (配置.函数库路径 != null || 配置.函数库路径 != '') {

//     //获取云端函数
//     获取函数线程 = threads.start(function(){
//         downloadCloudFiles(配置.函数库路径, 配置.密钥, './mods.js')
//     })

//     //等待云端函数下载完成
//     while(获取函数线程.isAlive());

//     //导入函数
//     mods = require('mods.js')
// }

//绘制UI
ui.layout(
    <vertical w='*' h='*' bg='#000000'>
        <text text='加载中...' textColor='#ffffff'></text>
    </vertical>
)

//设置顶部状态栏颜色
ui.statusBarColor('#000000')

//main函数初始化
var main = ''

获取脚本线程 = threads.start(function(){
    main = new Function('', getCloudFiles(配置.路径+'index.js', 配置.密钥, 配置.账号))
})

while(获取脚本线程.isAlive());
log('获取完毕')

//>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>运行脚本>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>

main()

//>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>本地函数库>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>

function downloadCloudFiles (_path,_key, _name, _local) {
    _url = 'http://dav.jianguoyun.com/dav/'
    _code = base64(_name + ":" + _key)
    _local = './'+_local
    while (1) {
        try {
            _res = http.get(_url+_path ,{
                headers : {
                    "Authorization": "Basic " + _code,
                    "Content-Type": "text/plain;charset=UTF-8",
                    "Connection": "Keep-Alive",
                    "Accept-Encoding": "gzip",
                    "User-Agent": "okhttp/3.12.1"
                }
            })
            if (_res != null) {
                _res = _res.body.bytes()
                files.writeBytes(_local, _res)
                return true
            } else {
                log('返为空')
                return false
            }
            
        } catch (_err) {
            log('报错'+_err)
            return false
        }
    }
}

function getCloudFiles (_path, _key, _name) {
    _url = 'http://dav.jianguoyun.com/dav/'
    _code = base64(_name + ":" + _key)
    
    while (1) {
        try {
            _res = http.get(_url+_path ,{
                headers : {
                    "Authorization": "Basic " + _code,
                    "Content-Type": "text/plain;charset=UTF-8",
                    "Connection": "Keep-Alive",
                    "Accept-Encoding": "gzip",
                    "User-Agent": "okhttp/3.12.1"
                }
            })
        
            if (_res != null) {
                _res = _res.body.string()
                return _res
            } else {
                return null
            }
            
        } catch (_err) {
            return null
        }
    }
}

function 注册(_user, _pass, _did) {
    _url = 'http://user.8-0000.com/api.php?act=reg'
    _data = {
        username : _user,
        password : _pass,
        did : _did
    }
    return waitHttpPost(_url, _data)
}

function 登录 (_user, _pass, _did) {
    _url = 'http://user.8-0000.com/api.php?act=login'
    _data = {
        username : _user,
        password : _pass,
        did : _did
    }
    return waitHttpPost(_url, _data)
}

function 充值 (_user, _pass, _did, _kami) {
    _url = 'http://user.8-0000.com/api.php?act=kami'
    _data = {
        username : _user,
        password : _pass,
        did : _did,
        kami : _kami
    }
    return waitHttpPost(_url, _data)
}


function base64(str) {
    return java.lang.String(android.util.Base64.encode(java.lang.String(str).getBytes(), 2));
}


function waitHttpPost (_url, _data) {
    while (1) {
        try {
            _res = http.post(_url, _data)
            if (_res.statusCode == 200) {
                return _res.body.json()
            }
        } catch (_err) {
            log('waitHttpPost-->>  '+_err)
        }
    }
}

function md5 (string) {
    return java.math.BigInteger(1,java.security.MessageDigest.getInstance("MD5")
    .digest(java.lang.String(string).getBytes())).toString(16);
}

function bjTime (_time) {
    //新建一个date对象
    date = new Date()
    _time = _time.split(' ')
    年 = _time[0].split('-')[0]
    月 = _time[0].split('-')[1]
    日 = _time[0].split('-')[2]
    时 = _time[1].split(':')[0]
    分 = _time[1].split(':')[1]
    秒 = _time[1].split(':')[2]
    if (date.getFullYear() >= Number(年)) {
        if (date.getMonth()+1 >= Number(月)) {
            if (date.getDate() >= Number(日)) {
                if (date.getHours() >= Number(时)) {
                    if (date.getMinutes() >= Number(分)) {
                        if (date.getSeconds() >= Number(秒)) {
                            return false
                        }
                    }
                }
            }
        }
    }
    return true
}