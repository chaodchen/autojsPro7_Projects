"ui";

var 配置 = {
    密钥:'ap2pr9ymp3dxtahm',
    代号:'4_4_800',
    getCloudFiles:function (_path,_key) {
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
                    _res = _res.body.string()
                    return _res
                }
                
            } catch (_err) {
    
            }
        }
        function base64(str) {
            return java.lang.String(android.util.Base64.encode(java.lang.String(str).getBytes(), 2));
        }
    }
}

配置.路径 = 'TaoBaoProjcet/'+配置.代号+'/'

ui.layout(
    <vertical w='*' h='*' bg='#000000'>
        <text text='加载中...' textColor='#ffffff'></text>
    </vertical>
)

//设置顶部状态栏颜色
ui.statusBarColor('#000000')

//新建线程
线程 = threads.start(function(){
    toastLog('加载中...')
    main = new Function('配置', 配置.getCloudFiles(配置.路径+'index.js', 配置.密钥))
})

while(1){
    if(!线程.isAlive()){
        main(配置)
        break
    }
}
