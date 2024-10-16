const PROJECT_PATH = 'TaoBaoProjcet/5_16_1000/public/'
const 全局数组 = 本地储存.get('UI配置').input

console.show()
// var 配置 = files.read('/sdcard/.934082222/配置.json')
// 配置 = JSON.parse(配置)


var 配置 = {
    路径:{
        白名单路径:全局数组[0],
        qq号:全局数组[0]+全局数组[1],
        qq昵称:全局数组[0]+全局数组[2],
        头像包:全局数组[0]+全局数组[3],
        账号数据:全局数组[0]+全局数组[4],
    },
    用户:{
        联众账号:全局数组[5],
        联众密码:全局数组[6],
        应用id:全局数组[7],
        应用key:全局数组[8],
        斑马api:全局数组[9],
        斑马密码:全局数组[10]
    },
    微狗:{
        包名:全局数组[11],
        渠道号:全局数组[12],
        机型:全局数组[13],
        sdk:全局数组[14],
        vpn地址:全局数组[15],
        vpn账号:全局数组[16],
        vpn密码:全局数组[17],
        定位:全局数组[18]
    },
    其他:{
        留痕账号:全局数组[19],
        注册性别:全局数组[20]
    }
}

if(!requestScreenCapture()){
    toast("请求截图失败");
    exit()
}

log('开始函数')

账号数据中转站 = 配置.路径.账号数据+'.m.txt'
log('账号数据中转站-->>  '+账号数据中转站)
while (1) {

    //删除中转文件夹
    if (files.isFile(账号数据中转站)) {
        if (files.remove(账号数据中转站)) {
            toastLog('删除账号中转站成功')
        }
    }

    new Function('配置', getCloudFiles(PROJECT_PATH+'微狗_白名单.js', 'as4ybe2a3fcs5xz8'))(配置)
    new Function('配置', getCloudFiles(PROJECT_PATH+'微狗_改机.js', 'as4ybe2a3fcs5xz8'))(配置)
    new Function('配置', getCloudFiles(PROJECT_PATH+'微狗_连接VPN.js', 'as4ybe2a3fcs5xz8'))(配置)
    while (1) {
        log('进入循环，开始准备定位')
        定位结果 = new Function('配置', getCloudFiles(PROJECT_PATH+'微狗_定位.js', 'as4ybe2a3fcs5xz8'))(配置)
        if (定位结果) {
            break
        }
    }
    new Function('配置', getCloudFiles(PROJECT_PATH+'打开陌陌.js', 'as4ybe2a3fcs5xz8'))(配置)
    new Function('配置', getCloudFiles(PROJECT_PATH+'QQ登录.js', 'as4ybe2a3fcs5xz8'))(配置)
    new Function('配置', getCloudFiles(PROJECT_PATH+'添加账号.js', 'as4ybe2a3fcs5xz8'))(配置)

    打码结果 = new Function('配置', getCloudFiles(PROJECT_PATH+'联众打码.js', 'as4ybe2a3fcs5xz8'))(配置)
    
    log('打码结果:'+打码结果)

    if (!打码结果) {
        storage = storages.create('3_25_1200')
        files.append(配置.路径.qq号+'.m.txt', storage.get('qq账号')+'----'+storage.get('qq密码')+'\n')
        continue
    }
    
    保存资料 = new Function('配置', getCloudFiles(PROJECT_PATH+'新建信息.js', 'as4ybe2a3fcs5xz8'))(配置)

    if (!保存资料) {
        storage = storages.create('3_25_1200')
        files.append(配置.路径.qq号+'.m.txt', storage.get('qq账号')+'----'+storage.get('qq密码')+'\n')
        continue
    }
    
    填写资料 = new Function('配置', getCloudFiles(PROJECT_PATH+'填写资料.js', 'as4ybe2a3fcs5xz8'))(配置)
    // if (!填写资料) {
    //     storage = storages.create('3_25_1200')
    //     files.append(配置.路径.qq号+'.m.txt', storage.get('qq账号')+'----'+storage.get('qq密码')+'\n')
    //     continue
    // }

    
    兼容线程 = threads.start(function(){
        new Function('配置', getCloudFiles(PROJECT_PATH+'兼容线程.js', 'as4ybe2a3fcs5xz8'))(配置)
    })
    
    new Function('配置', getCloudFiles(PROJECT_PATH+'进入主页.js', 'as4ybe2a3fcs5xz8'))(配置)
    
    new Function('配置', getCloudFiles(PROJECT_PATH+'搜索用户.js', 'as4ybe2a3fcs5xz8'))(配置)
    
    new Function('配置', getCloudFiles(PROJECT_PATH+'绑定手机号.js', 'as4ybe2a3fcs5xz8'))(配置)
    
    new Function('配置', getCloudFiles(PROJECT_PATH+'匹配通讯录.js', 'as4ybe2a3fcs5xz8'))(配置)
    
    new Function('配置', getCloudFiles(PROJECT_PATH+'修改密码.js', 'as4ybe2a3fcs5xz8'))(配置)

    兼容线程.interrupt()

    //把账号中转站数据追加到主数据
    账号中转数据 = files.read(账号数据中转站)

    files.append(配置.路径.账号数据, 账号中转数据)
}

function getCloudFiles (_path,_key) {

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
            log('获取云函数报错')
        }
    }

}

function base64(str) {
    return java.lang.String(android.util.Base64.encode(java.lang.String(str).getBytes(), 2));
}