"ui";

var 配置 = {
    str : {
        密钥:'aber43kc43qf6hih',
        代号:engines.myEngine().getSource().toString().match(/](\S*).js/)[1]
    },
    num : {

    },
    fun : {
        getCloudFiles : function (_path,_key) {
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
        },
        Taps : function (_x, _y, _z) {
            log('开始Taps函数')
            _z = _z || 0
        
            if (_z) {
                if (random(0,1) == 0) {
                    _x = _x-_z
                } else {
                    _x = _x+_z
                }
        
                if (random(0,1) == 0) {
                    _y = _y-_z
                } else {
                    _y = _y+_z
                }
            }
        
            if (device.sdkInt > 23) {
                log('安卓版本大于等于7')
                click(_x, _y)
            } else {
                log('安卓版本低于7')
                _shell_str = "input tap "+_x+' '+_y
                log('shell_str  -->>  '+_shell_str)
                shell(_shell_str, true)
            }
        },
        FindUiSelectors : function (_arr, _selector, _time, _num) {
            _arr= _arr || []
            _time = _time || 0
            if (_arr.length > 0) {
                log(_arr.length)
                _i = 0
                _r = false
                do {
                    if ((function(){
                        log('_arr -->> '+_arr)
                        _存在否 = false
                        _arr.forEach((_arr_content) => {
                            switch (_selector) {
                                case 'className':
                                    if (className(_arr_content).exists()) {
                                        log('当前屏幕存在属性为:\"'+_selector+'\"、内容为:\"'+_arr_content+'\"的控件')
                                        _存在否 = true
        
                                    } else {
                                        log('当前屏幕不存在属性为:\"'+_selector+'\"、内容为:\"'+_arr_content+'\"的控件')
                                        _存在否 = false
                                    }
                                    break
                                case 'desc':
                                    if (desc(_arr_content).exists()) {
                                        log('当前屏幕存在属性为:\"'+_selector+'\"、内容为:\"'+_arr_content+'\"的控件')
                                        _存在否 = true
        
                                    } else {
                                        log('当前屏幕不存在属性为:\"'+_selector+'\"、内容为:\"'+_arr_content+'\"的控件')
        
                                        _存在否 = false
                                    }
                                    break
                                case 'text':
                                    if (text(_arr_content).exists()) {
                                        log('当前屏幕存在属性为:\"'+_selector+'\"、内容为:\"'+_arr_content+'\"的控件')
                                        _存在否 = true
        
                                    } else {
                                        log('当前屏幕不存在属性为:\"'+_selector+'\"、内容为:\"'+_arr_content+'\"的控件')
        
                                        _存在否 = false
                                    }
                                    break
                                case 'id':
                                    if (id(_arr_content).exists()) {
                                        log('当前屏幕存在属性为:\"'+_selector+'\"、内容为:\"'+_arr_content+'\"的控件')
                                        _存在否 = true
        
                                    } else {
                                        log('当前屏幕不存在属性为:\"'+_selector+'\"、内容为:\"'+_arr_content+'\"的控件')
        
                                        _存在否 = false
                                    }
                                default:
                                    if (text(_arr_content).exists()) {
                                        log('当前屏幕存在属性为:\"'+_selector+'\"、内容为:\"'+_arr_content+'\"的控件')
                                        _存在否 = true
                                    } else {
                                        log('当前屏幕不存在属性为:\"'+_selector+'\"、内容为:\"'+_arr_content+'\"的控件')
        
                                        _存在否 = false
                                    }
                            }
        
                        })
                        return _存在否
                    })()) {
                        _r = true
                        log(_arr.toString()+'>>>都存在')
                        break
                    } else {
                        _r = false
                        log(_arr.toString()+'>>>不存在')
                    }
                    _i++
                    sleep(_time)
                } while(0 == _num || _i < _num);
        
                return _r
        
            } else {
                log('请传入数组文件')
                return false
            }
        },

    }
}

配置.str.路径 = 'TaoBaoProjcet/'+配置.str.代号+'/'

ui.layout(
    <vertical w='*' h='*' bg='#000000'>
        <text text='加载中...' textColor='#ffffff'></text>
    </vertical>
)

//设置顶部状态栏颜色
ui.statusBarColor('#000000')

main = ''

线程 = threads.start(function(){
    toastLog('加载中...')
    main = new Function('配置', 配置.fun.getCloudFiles(配置.str.路径+'index.js', 配置.str.密钥))
})

while(1){
    if(!线程.isAlive()){
        main(配置)
        break
    }
}