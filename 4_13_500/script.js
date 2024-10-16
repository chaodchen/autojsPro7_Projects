//>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>权限申请>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
//auto.waitFor()


//>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>定义常量>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
const 全局数组 = 本地储存.get('UI配置').input
// const 关注图片 = images.load('http://f.akvip.top/image/mi4_guanzhu.png')
// const 已关注图片 = images.load('http://f.akvip.top/image/mi4_yiguanzhu.png')
//>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>定义变量>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>

log(全局数组)
点赞次数 = 全局数组[0]
关注次数 = 全局数组[1]
快转次数 = 全局数组[2]
微博分身号 = 全局数组[3]


全局延迟 = 全局数组[4]

toast('微博分身号-->>  '+微博分身号)

console.show()
var 兼容线程 = threads.start(兼容)

while (1) {
    new Function('', getCloudFiles(配置.路径+'public/切换IP.js', 配置.密钥, 配置.账号))()
    // new Function('', getCloudFiles(配置.路径+'public/清理内存.js', 配置.密钥, 配置.账号))()
    new Function('', getCloudFiles(配置.路径+'public/双开助手.js', 配置.密钥, 配置.账号))()
    new Function('', getCloudFiles(配置.路径+'public/做任务.js', 配置.密钥, 配置.账号))()
    log('准备开始领红包')
    
    new Function('', getCloudFiles(配置.路径+'public/领红包.js', 配置.密钥, 配置.账号))()
}
if (兼容线程.isAlive()) {
    log('停止兼容线程')
    兼容线程.interrupt()
}


//>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>函数库>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>


function 兼容 () {
    while (1) {
        sleep(1000)
        if (text('给我们评分').exists()) {
            click('不了，谢谢')
        } else if (text('帐号异常').exists()) {
            click('取消')
        } else if (id('iv_close').exists()) {
            id('iv_close').findOne().click()
        } else if (text('选择分组').exists()) {
            click('暂不分组')
        } else if (text('跳过').exists()) {
            click('跳过')
        } else if (text('用户协议和隐私条款').exists()) {
            click('我知道了')
        } else if (id('iv_close').exists()) {
            toast('关闭弹窗')
            id('iv_close').findOne().click()
        } else if (text('微博正文').exists()) {
            sleep(2000)
            back()
        } else if (textContains('版本更新啦').exists()) {
            log('版本更新')
            sleep(1000)
            click('以后再说')
        }
    }
}