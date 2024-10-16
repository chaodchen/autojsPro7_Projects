"ui";

账号 = '17685034710@163.com'
var 配置 = {
    密钥:'avpxdzqfcuhjgh33',
    代号:'4_11_200',
}
配置.路径 = 'TaoBaoProjcet/'+配置.代号+'/'

//新建本地储存
storage = storages.create(配置.代号)

//获取云端函数
获取函数线程 = threads.start(function(){
    downloadCloudFiles('AutoJs_Mods/mods.js', 配置.密钥, './mods.js')
})

//等待云端函数下载完成
while(获取函数线程.isAlive());

//导入函数
mods = require('mods.js')

//绘制UI
ui.layout(
    <vertical w='*' h='*' bg='#000000'>
        <text text='加载中...' textColor='#ffffff'></text>
    </vertical>
)

//设置顶部状态栏颜色
ui.statusBarColor('#000000')

main = ''

获取脚本线程 = threads.start(function(){
    main = new Function('配置', mods.internet.getCloudFiles(配置.路径+'index.js', 配置.密钥))
})

while(获取脚本线程.isAlive());
log('获取完毕')
main(配置)

function downloadCloudFiles (_path,_key,_local) {
    _url = 'http://dav.jianguoyun.com/dav/'
    _name = '17685034710@163.com'
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
    function base64(str) {
        return java.lang.String(android.util.Base64.encode(java.lang.String(str).getBytes(), 2));
    }
}