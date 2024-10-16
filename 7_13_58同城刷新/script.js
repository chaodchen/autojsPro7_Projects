黑煤球;

console.info('开始运行脚本')
//开始读取本地储存
// try {
//     if(!requestScreenCapture()){
//         toast("请求截图失败");
//         exit()
//     }
// } catch (_err) {
//     console.error('申请截屏权限报错：'+_err)
// }

log('显示悬浮窗')
//这里把mainActivity的storage_uiConfig变量传进来了，这个变量记录了脚本的UI配置信息
//编辑框的arr数组
var editArr = storage_uiConfig.editView
//单选框的arr数组
var radioArr = storage_uiConfig.radioView
//多选框的arr数组
var checkboxArr = storage_uiConfig.checkboxView
log(checkboxArr)
//新建一个悬浮窗显示脚本状态
if (checkboxArr[0]) {
    toastLog('显示 状态悬浮窗')
    console.show()
    // threads.start(状态悬浮窗)
}

// log('设置亮度')
// device.setBrightnessMode(0)
// device.setBrightness(Number(editArr[2]))
// device.setMusicVolume(0)
// device.setNotificationVolume(0)

//开始运行脚本
//定义脚本全局延迟时间
const DELAY_TIME = '2|6'

const 设备高度 = device.height

function 兼容函数 () {

}
log('您的设备高度为：%d', 设备高度)
toastLog('请手动打开58同城App')

let 刷新延迟 = editArr[0]
let 文件夹名称 = editArr[1]
let 屏蔽名称 = editArr[2]
let 年龄 = editArr[3]
let 期望地区 = editArr[4]

//初始化变量

//脚本运行环境初始化

初始化()

//开始找浏览字符


while (1) {
    let _头像 = className("android.view.ViewGroup").depth(15).findOne(10 * 1000)
    if (!_头像) {
        log('没有找到 头像')
        exit()
    }
    log('点击头像')
    clickView(_头像)
    textWait(['我的找室友', '我的收藏'])
    sleep(2000)
    //判断帖子是否存在
    let 帖子状态 = text('编辑').findOne(10 * 1000)

    if (帖子状态) { 
        textClick('编辑')
        let 编辑状态 = text('下一步').findOne(5 * 1000)

        //点击编辑按钮 如果能进入帖子内容 则进行下一步 否则删掉该帖子 执行发帖程序
        log('您有发布帖子')
        if (编辑状态) {
            log('开始编辑帖子')
            编辑帖子()
        } else {
            删除帖子()
            发布帖子('1-2', 文件夹名称)
        }
    } else {
        log('您没有发布任何帖子')
        发布帖子('1-2', 文件夹名称)
    }
    toastLog('准备开始执行延迟程序')
    sleep(randomOfSign(刷新延迟, '-') * 1000)
}

function 发布帖子 (clickDelay, imgsName) {
    textWait(['马上发布'])
    textClick('马上发布')
    sleep(randomNumber(clickDelay, '-'))
    textWait(['有房找室友'])
    while (1) {
        if (text('个人信息').exists() && text('室友要求').exists() && text('房屋信息').exists()) {
            log('点击  有房找室友成功')
            break
        } else {
            textClick('有房找室友')
            sleep(1500)
        }
    }
    sleep(randomNumber(clickDelay, '-'))
    textWait(['个人信息', '室友要求', '房屋信息'])
    textClick('下一步')
    sleep(randomNumber(clickDelay, '-'))
    textWait(['可以补充更多对“室友”的期望要求(选填)', '男女不限', '室友性别'])
    let 室友性别 = text('室友性别').findOne()
    if (!室友性别) {
        log('没有找到室友性别')
        exit()

    }
    let 男女不限 = 室友性别.parent().findOne(text('男女不限'))
    clickView(男女不限, 10)
    sleep(randomNumber(clickDelay, '-'))
    textClick('爱干净')
    sleep(randomNumber(clickDelay, '-'))
    let 室友期望 = getHostText('http://lansu.8-0000.com/'+imgsName+'/expect.txt')
    
    text('可以补充更多对“室友”的期望要求(选填)').findOne().setText(室友期望)
    textClick('下一步')
    sleep(randomNumber(clickDelay, '-'))
    textWait(['房东', '租户', '转租者'])
    downloadImgs(imgsName)
    let 上传照片 = text('房屋照片(3-9张)').findOne().parent().child(1)
    clickView(上传照片, 10)
    sleep(randomNumber(clickDelay, '-'))
    textWait(['所有照片'])
    sleep(randomNumber(clickDelay, '-'))
    click('更换相册')
    log('点击更换相册成功')
    
    while (1) {
        sleep(1000)
        let 文件夹 = text(imgsName).findOne(1500)
        if (文件夹) {
            log('找到了 文件夹')
            textClick(imgsName)
            textWait(['完成'])
            let _单选组= id('select_image_click_layout').find()
            for (let i = 0; i < 9; i++) {
                _单选组[i].click()
                sleep(random(200, 500))
            }
            break
        } else {
            log('没有找到 文件夹')
            id("recycler_view").findOne().scrollForward()
            sleep(randomNumber(clickDelay, '-'))
        }
    }
    textClick('完成', 10)

    while (1) {
        sleep(3300)
        if (text('立即发布').exists()) {
            log('找到了立即发布')
            break
        } else {
            log('没有找到 立即发布')
            textClick('完成', 10)
        }
    }

    textClick('房东', 10)
    sleep(randomNumber(clickDelay, '-'))
    let 标题 = text('标题').findOne(10 * 1000)
    if (!标题) {
        log('没有找到标题文本控件')
        exit()
    }
    
    let 标题内容 = getHostText('http://lansu.8-0000.com/'+imgsName+'/title.txt')
    log('标题内容：'+标题内容)
    if (!标题内容) {
        log('没有标题内容')
        exit()
    }

    标题.parent().findOne(className('EditText')).setText(标题内容)

    let 描述 = getHostText('http://lansu.8-0000.com/'+imgsName+'/desc.txt')
    log('描述：'+描述)

    text('可以补充更多对“房子”的描述(选填)').findOne().setText(描述)
    sleep(randomNumber(clickDelay, '-'))
    scrollForward()
    ///////////////////////小区名称///////////////////

    textClick('小区名称')

    textWait(['请输入小区名'])

    let 小区名称 = getHostText('http://lansu.8-0000.com/'+imgsName+'/CommunityName.txt')
    text('请输入小区名').findOne().setText(小区名称)

    sleep(5 * 1000)

    let 小区名称数组 = text(小区名称).find()
    clickView(小区名称数组[小区名称数组.length - 1])
    sleep(randomNumber(clickDelay, '-'))

    ///////////////////////月租金///////////////////
    while (1) {
        if (text('押一付一').exists() && text('押一付三').exists() && text('半年付').exists()) {
            log('找到了 押一付一')
            break
        } else {
            log('没有找到 押一付一')
            textClick('月租金')
            sleep(2000)
        }
    }
    sleep(randomNumber(clickDelay, '-'))
    textClick('押一付一')
    sleep(randomNumber(clickDelay, '-'))
    let 月租金 = getHostText('http://lansu.8-0000.com/'+imgsName+'/MonthlyRent.txt').split('')
    let 请填写月租金 = text('请填写月租金').findOne(10 * 1000)
    if (!请填写月租金) {
        log('没有找到 请填写月租金')
        exit()

    }
    let _月租金父控件 = 请填写月租金.parent().parent()

    for (let i = 0; i < 月租金.length; i++) {
        // textClick(月租金[i])
        let 数字 = _月租金父控件.findOne(text(月租金[i]))
        if (!数字) {
            log('没有找到数字')
            exit()
        }
        clickView(数字)

        sleep(random(500, 1000))
    }
    textClick('确定')
    sleep(randomNumber(clickDelay, '-'))

    ///////////////////////户型///////////////////
    let 户型 = getHostText('http://lansu.8-0000.com/'+imgsName+'/HouseType.txt').split('|')
    while (1) {
        if (text('请选择户型').exists()) {
            log('请选择户型  找到该文本')
            break

        } else {
            textClick('户型')
            sleep(1000)
        }
    }
    sleep(randomNumber(clickDelay, '-'))

    let 坐标组 = [
        {
            x:text('2室').findOne().bounds().centerX(),
            y:text('2室').findOne().bounds().top
        },
        {
            x:text('1厅').findOne().bounds().centerX(),
            y:text('1厅').findOne().bounds().top
        },
        {
            x:text('1卫').findOne().bounds().centerX(),
            y:text('1卫').findOne().bounds().top
        }
    ]

    for (let i = 0; i < 户型.length; i++) {
        log('户型：'+户型[i])
        let _xy = text(户型[i]).findOne().bounds()
        swipe(_xy.centerX(), _xy.top, 坐标组[i].x, 坐标组[i].y, 1000)
    }
    log('点击确定')
    textClick('确定')
    sleep(randomNumber(clickDelay, '-'))
    textWait(['目前居住情况'])

    while (1) {
        if (text('当前居住情况').exists()) {
            log('找到了 当前居住请情况')
            break
        } else {
            textClick('目前居住情况')
            sleep(1500)
        }
    }

    textClick('确定')
    sleep(randomNumber(clickDelay, '-'))
    while (1) {
        if (text('床').exists() && text('宽带').exists()) {
            log('点击 房屋配置 成功')
            break
        } else {
            textClick('房屋配置')
            sleep(1500)
        }
    }

    let 房屋配置数组 = ['床', '衣柜', '沙发', '桌椅', '空调', '洗衣机', '冰箱', '热水器', '燃气灶', '油烟机', '电磁炉']
    let 房屋配置数组2 = ['宽带', '阳台', '可做饭']
    
    房屋配置数组.forEach((_t) => {
        textClick(_t)
        sleep(random(200, 500))
    })
    
    let 油烟机 = text('油烟机').findOne().bounds()
    let 沙发 = text('沙发').findOne().bounds()
    swipe(油烟机.centerX(), 油烟机.centerY(), 沙发.centerX(), (沙发.centerY() - 200), 1000)
    
    房屋配置数组2.forEach((_t) => {
        textClick(_t)
        sleep(random(200, 500))
    })

    textClick('确定')
    sleep(randomNumber(clickDelay, '-'))
    sleep(2000)
    textClick('立即发布')
    let 发布成功 = text('发布成功').findOne(10 * 1000)
    if (!发布成功) {
        log('没有找到发布成功')
        exit()
    }
    textClick('查看发布')
}

function 删除帖子 () {

    sleep(1000)
    while (1) {
        if (text('写错了').exists() && text('想发新的').exists()) {
            log('点击删除成功')
            break
        } else {
            textClick('删除')
            sleep(random(1000, 1500))
            
        }
    }

    let 删除原因 = text(randomOfSign('写错了|想发新的', '|')).findOne()
    clickView(删除原因)
}

function 编辑帖子 () {
    textWait(['个人信息', '室友要求', '房屋信息'])
    log('进入：无房找室友')
    textClick('下一步')
    textWait(['男女不限', '限女生', '限男生'])
    textClick('下一步')
    textWait(['房东', '租户', '转租者'])
    input(randomStr())

    textClick('立即发布')
    textWait(['找室友', '筛选'])
}

function 初始化 () {
    app.launch('com.wuba')
    while (1) {
        if (text('首页').exists() && text('发现').exists() && text('消息').exists() && text('我的').exists()) {
            toast('进入58同城成功')
            break
        }
        sleep(1000)
        log('等待进入58同城主页')
    }

    let _租房_view = text('租房').findOne(10 * 1000)
    if (!_租房_view) {
        toastLog('没有找到租房文本')
        exit()
    }

    _租房_view = _租房_view.parent()

    if (_租房_view) {
        log('成功找到租房控件')
    } else {
        log('没有找到租租房控件  ')
        exit()
    }

    if (_租房_view.click()) {
        log('点击租房控件成功')
    } else {
        log('点击租房控件失败')
        exit()
    }

    //等待进入租房界面

    while (1) {
        if (text('找室友').exists() && text('整租').exists() && text('合租').exists() && text('月租').exists()) {
            log('进入租房界面成功')
            break
        }
        sleep(1000)
        log('等待进入租房界面')
    }

    let _找室友_view = text('找室友').findOne(10 * 1000)
    if (!_找室友_view) {
        log('没有找室友文本控件')
        exit()

    }

    _找室友_view = _找室友_view.parent()

    if (!_找室友_view) {
        log('没有找到找室友控件')
        exit()
    }

    if (!_找室友_view.click()) {
        log('点击找室友控件失败')
        exit()
    }

    while (1) {
        if (text('全深圳').exists() && text('有房/无房').exists() && text('筛选').exists()) {
            log('进入找室友界面成功')
            break
        }
        sleep(1000)
        log('等待进入找室友界面')
    }
}































function textClick (txt, r) {
    if (!r) r = 0
    r = Number(r)
    log('txt:'+txt)
    let txtView = text(txt).findOne(10 * 1000)
    if (!txtView) {
        console.error('没有找到：'+txt)
        exit()
    }

    let _x = txtView.bounds().centerX()
    if (random(0, 1) == 0) {
        _x = _x - random(0, r)
    } else {
        _x = _x + random(0, r)
    }

    if (random(0, 1) == 0) {
        _y = _y - random(0, r)
    } else {
        _y = _y + random(0, r)
    }

    let _y = txtView.bounds().centerY()
    log('x and y:'+_x+'  and  '+_y)
    if (device.sdkInt > 23) {
        log('安卓7或以上')
        click(_x, _y)
    } else {
        log('安卓7以下')
        Tap(_x, _y)
        sleep(1000 * 3)
    }
    return 1   
}

function textWait (_arr) {

    for (let i = 0; i < _arr.length; i++) {
        log('正在寻找:'+_arr[i])
        text(_arr[i]).waitFor()
        log('找到了：'+_arr[i])
    }
}


function randomNumber (str_0, str_1) {
    //以str_1分割，取一个随机数
    switch (typeof(str_0)) {
        case 'number':
            //是数字
            return str_0
        case 'string':
            //是字符串
            if (str_0.indexOf(str_1) > -1) {
                num_min = str_0.split(str_1)[0]
                num_max = str_0.split(str_1)[1]
                return random(Number(num_min), Number(num_max))
            } else {
                return Number(str_0)
            }
        default:

            return 0;
    }
}

function clickView (_view, r) {
    if (!_view) {
        log('没有 _view 停止程序')
        exit()
    }

    if (!r) {
        r = 0
    }

    let _x = _view.bounds().centerX()
    let _y = _view.bounds().centerY()

    if (random(0, 1) == 0) {
        _x = _x - random(0, r)
    } else {
        _x = _x + random(0, r)
    }

    if (random(0, 1) == 0) {
        _y = _y - random(0, r)
    } else {
        _y = _y + random(0, r)
    }

    log('x and y:'+_x+'  and  '+_y)
    if (device.sdkInt > 23) {
        log('安卓7或以上')
        click(_x, _y)
    } else {
        log('安卓7以下')
        Tap(_x, _y)
        sleep(1000 * 3)
    }
    return 1
}

function getHostText (api) {
    try {
        _res = http.get(api)
        if (_res.statusCode != 200) {
            log('请求服务器api失败')
            exit()
        } else {
            let content = _res.body.string()
            log('content:'+content)
            return content
        }
    } catch (_err) {
        log('getHostText 报错：'+_err)
        exit()
    }
}

function downloadImgs (fName) {

    let deviceDirName = '/sdcard/'+fName+'/'
    let hostDirName = 'http://lansu.8-0000.com/'+fName+'/'
    //新建本地文件夹
    if (!files.isDir(deviceDirName)) {
        if (files.create(deviceDirName)) {
            log('创建本地文件夹成功')
        }
    }
    //下载服务器图片
    
    for (let i = 1; i < 10; i++) {
        let imgLink = hostDirName+i+'.JPG'
        let imgPath = deviceDirName+i+'.jpg'
        if (files.isFile(imgPath)) {
            log('已存在第%d张图片', i)
            continue
        }
        log(imgLink)
        try{
            let _res = http.get(imgLink)
            if (_res.statusCode != 200) {
                log('请求接口失败！')
                exit()
            }
            files.writeBytes(imgPath, _res.body.bytes())
            log('下载成功')
            media.scanFile(imgPath)
        } catch (_err) {
            log('下载服务器图片报错:'+_err)
            
        }

    }

}

function randomStr() {
    let strs = 'qwertyuiopasdfghjklzcbnm1234567890_-'
    let str = strs.split('')
    return str[random(0, str.length - 1)]
}

function randomOfSign (_str, _r) {

    let strArr = _str.split(_r)

    return strArr[random(0, strArr.length - 1)]
    
    
}