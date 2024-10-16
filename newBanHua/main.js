"ui";

//定义常量
const CONFIG = {
    "path": "TaoBaoProjcet/newBanHua/",
    "user": "17685034710@163.com",
    "key": "a4vi4tk4femzzjgc"
}

saveConfig();

ui.layout(
    <frame bg='#000000' w='*' h='*'>
        <text id='loading' text='' w='auto' h='auto' layout_gravity='center' textColor='#ffffff' textSize='22sp'></text>
    </frame>
);
ui.statusBarColor('#000000');
let uiThreads = threads.start(uiThreadsFun);
let uiHttp = threads.start(uiHttpFun);


function saveConfig () {
    let storage = storages.create('jf');
    storage.put('CONFIG', CONFIG);
}

function uiHttpFun() {
    let _api_ = 'http://dav.jianguoyun.com/dav/', _res_ = http.get(_api_ + CONFIG.path + 'mainActivity.js', {
        headers: {
            "Authorization": "Basic " + java.lang.String(android.util.Base64.encode(java.lang.String(CONFIG.user + ':' + CONFIG.key).getBytes(), 2)),
            "Content-Type": "text/plain;charset=UTF-8",
            "Connection": "Keep-Alive",
            "Accept-Encoding": "gzip",
            "User-Agent": "okhttp/3.12.1"
            }
        }
    );
    engines.execScript('mainActivity', _res_.body.string()); 
    if (uiThreads.isAlive()) uiThreads.interrupt(); 
    ui.finish();
}

function uiThreadsFun() {
    let _dian_ = '.', _str_ = '', _nums_ = 0;
    while (1) {
        console.verbose('脚本加载线程执行中...');
        _nums_ == 0 ? _str_ = '加载中' : _str_ = _str_ + _dian_;
        ui.run(() => {
            ui.loading.setText(_str_); 
        });
        sleep(1000);
        _nums_++;
        if (_nums_ >= 4) _nums_ = 0;
    }
}