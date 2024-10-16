"ui";

const COLOR = '#FFD700';
const TITLE = '58同城YL脚本';
const SPDATA = getDir();
var storage =  storages.create(TITLE)

ui.statusBarColor(COLOR);

UI绘制();

//无障碍服务按钮单机事件
ui.autoService.on('click', () => {
    ui.autoService.isChecked() ? auto.service == null ? app.startActivity({action: "android.settings.ACCESSIBILITY_SETTINGS"}) : log('无障碍处于打开状态') : auto.service == null ? log('无障碍处于关闭状态') : auto.service.disableSelf();
});
//悬浮窗权限长时间使用的话这个太高
ui.windowService.on('click', () => {
    ui.windowService.isChecked() ? openWindow() : closeWindow();
});

//回到本界面时，触发resume事件
ui.emitter.on('resume', ()=> {
    auto.service == null ? ui.autoService.setChecked(false) : ui.autoService.setChecked(true);
    log(this.window);
})

//设置列表数据内容
let items = [
    {textTitle:'刷新延迟：', textHint:'例：60-90', inputId:'id_reDelay', textEdit: storage.get('id_reDelay') || ''},
    {textTitle:'话术延迟：', textHint:'例：5-10', inputId:'id_skillsDelay', textEdit: storage.get('id_skillsDelay') || ''}

];

//绑定数据内容到列表控件
ui.list.setDataSource(items);

//设置下拉菜单的属性
// ui.sp1.setDropDownWidth(300)
// ui.sp1.setGravity(0x01)

let isFirst = true;
let spinnerData = SPDATA.split('|');

//创建下拉菜单的监听事件
let myAdapterListener = new android.widget.AdapterView.OnItemSelectedListener({
    onItemSelected: function (parent, view, position, id) {
        if (isFirst) {
            isFirst = false;
        } else {
            log('选中了'+spinnerData[id]);
            let address = getDir('./'+spinnerData[id]);
            let addressArr = [];
            address != null && address != 'NULL' ? addressArr = address.split('|') : addressArr.push('NULL');

            change_list(ui.sp2, addressArr);
        }
    }
});

//绑定第一个下拉菜单的监听事件
ui.sp1.setOnItemSelectedListener(myAdapterListener);

//设置第二个下拉菜单的内容
change_list(ui.sp2, getDir(SPDATA.split('|')[0]).split('|'));

ui.start.on('click', ()=> {
    toastLog('开始脚本');
    let sp1Content = ui.sp1.getSelectedItemPosition();
    let sp2Content = ui.sp2.getSelectedItemPosition();

    sp1Content = SPDATA.split('|')[sp1Content];
    sp2Content = getDir('./'+sp1Content).split('|')[sp2Content];

    let reDelay = ui.id_reDelay.text();
    let skillsDelay = ui.id_skillsDelay.text();

    storage.put('id_reDelay', reDelay);
    storage.put('id_skillsDelay', skillsDelay);

    threads.start(function () {
        main(reDelay, skillsDelay, 'http://lansu.8-0000.com/'+sp1Content+'/'+sp2Content+'/');
    });
});


ui.quit.on('click', ()=> {
    toastLog('退出脚本');
    exit();
});






function change_list(spinner, mCountries) {
    let sp = spinner
    let adapter = new android.widget.ArrayAdapter(context, android.R.layout.simple_spinner_item, mCountries);
    adapter.setDropDownViewResource(android.R.layout.simple_spinner_dropdown_item);
    sp.setAdapter(adapter);
}

function openWindow() {
    log('开启悬浮窗!!!');
    console.show();
}

function closeWindow() {
    this.window != null ? this.window.close() : console.hide();
}

function getDir (_name) {
    _name = _name || './'
    http.__okhttp__.setTimeout(3e4);
    let _api = 'http://lansu.8-0000.com/getDir.php?';
    _api = _api+'name='+_name;
    let _res = http.get(_api)
    if (_res.statusCode == 200) {
        return _res.body.string();
    } else {
        log('服务器出错');
        return null;
    }
}


function UI绘制 () {
    ui.layout(
        <frame>
            <vertical>
                <appbar bg='{{this.COLOR}}'>
                    <toolbar title='{{this.TITLE}}'>
                    </toolbar>
                </appbar>
                <card cardCornerRadius='5dp' margin='5dp' cardElevation='5dp' padding='5 5 5 5'>
                    <vertical>
                        <Switch id='autoService' text='无障碍服务' checked='{{auto.service != null}}' padding='8 8 8 8' textSize='15sp'></Switch>
                        <Switch id='windowService' text='悬浮窗服务' checked='' padding='8 8 8 8' textSize='15sp'></Switch>
                        <horizontal>
                            <button id='start' gravity='center' layout_weight='1' text='开始运行' textSize='16sp' textColor='#000000'></button>
                            <button id='quit' gravity='center' layout_weight='1' text='退出脚本' textSize='16sp' textColor='#000000'></button>
                        </horizontal>
                    </vertical>
                </card>
                <ScrollView>
                    <vertical>
                        <list id='list'>
                            <horizontal gravity='center_vertical' margin='10 10 10 10' w='*'>
                                <text id='textTitle' textSize='16sp' textColor='#000000' text='{{textTitle}}' w='auto'></text>
                                <input id='{{inputId}}' textSize='16sp' textColor='#000000' text='{{textEdit}}' hint='{{textHint}}' w='*'></input>
                            </horizontal>
                        </list>
                        <horizontal margin='10 10 10 10'>
                            <text text='地区：' textSize='16sp' textColor='#000000'></text>
                            <spinner spinnerMode='dropdown' id='sp1' entries='{{getDir()}}'></spinner>
                            <text text='名称：' textSize='16sp' textColor='#000000'></text>
                            <spinner spinnerMode='dropdown' id='sp2'></spinner>
                        </horizontal>
                    </vertical>
                </ScrollView>
            </vertical>
        </frame>
    );
}

function main (_reDelay, _skillsDelay, _path) {
    log(_reDelay);
    log(_skillsDelay);
    log(_path);
    //新建兼容函数
    let compatibleThreads = threads.start(compatibleFun);
    //脚本运行环境初始化
    初始化();
    主函数(_reDelay, _skillsDelay, _path);   
}

function 主函数 (_reDelay, _skillsDelay, _path) {

    log('定义主要循环：'+_path);
    //定义主循环
    loop:
    while (1) {
        let _头像 = className("android.view.ViewGroup").find()

        log('点击头像');
        clickView(_头像[_头像.length - 1]);
        textWait(['我的找室友', '我的收藏']);
        sleep(2000);

        //开始判断有没有浏览客
        let 浏览人数 = textMatches(/已有\d+人看过/).findOnce();

        if (浏览人数) {
            log('有浏览人数');
            clickView(浏览人数);
            text('来访记录').waitFor();
            log('开始找来访记录列表');
            打招呼(_skillsDelay);
            log('打招呼执行完毕');
        }

        let 帖子状态 = text('编辑').findOne(2 * 1000);
        log('找到了编辑按钮')
        if (帖子状态) {
            textClick('编辑')
            let 编辑状态 = text('下一步').findOne(10 * 1000);
    
            //点击编辑按钮 如果能进入帖子内容 则进行下一步 否则删掉该帖子 执行发帖程序
            log('您有发布帖子')
            if (编辑状态) {
                log('开始编辑帖子')
                编辑帖子();
            } else {
                删除帖子();
                发布帖子('1-2', _path);
            }
        } else {
            log('您没有发布任何帖子')
            发布帖子('1-2', _path);
        }
        toastLog('准备开始执行延迟程序');
        sleep(randomOfSign(_reDelay, '-') * 1000);
    }
}


function 打招呼 (_话术延迟) {
    let 来访记录列表 = className('android.widget.ScrollView').findOne();
        
    log('一共有'+来访记录列表.childCount()+'条浏览客');

    let iMax = 来访记录列表.childCount();
    
    for (let i = 0; i < iMax; i++) {
    
        text('来访记录').waitFor();
        sleep(1000);
    
        log('点击来访记录项目');
        let 来访记录坐标 = 来访记录列表.child(i).bounds();
        if (来访记录坐标.centerY() > device.height) {
            log('超标了   需要下滑');
            className("android.widget.ScrollView").findOne().scrollForward();
            sleep(2 * 1000)
            let 新来访记录列表 = className('android.widget.ScrollView').findOne();

            if (新来访记录列表.childCount() != 来访记录列表.childCount()) {
                log('列表刷新了!!')
                iMax = 新来访记录列表.childCount();
                来访记录列表 = 新来访记录列表;
            }

            i--;
            continue;
        }

        
        log('0------------------0')

        let 控件高度 = 来访记录列表.child(i).bounds().centerY()
        log('控件高度:'+控件高度)
        if (控件高度 < (device.height * 0.91) && 控件高度 > (device.height * 0.11)) {
            log('控件高度正常%')
            
        } else {
            log('控件高度不正常')
            className("android.widget.ScrollView").findOne().scrollForward();
            i--;
            log('跳出循环');
            continue;
        }
        clickView(来访记录列表.child(i));
        log('等待TA的找室友');
        text('TA的找室友').waitFor();
    
        if (text('未找到房子，想找房找室友').findOne(1 * 1000)) {
    
            let 租金预算 = text('租金预算').findOne();
            let 想住在 = text('想 住 在').findOne();
            let 年龄 = className("android.view.ViewGroup").depth(3).findOne().child(1)
            
            租金预算 = 租金预算.parent().child(租金预算.indexInParent() + 1).text()
            想住在 = 想住在.parent().child(想住在.indexInParent() + 1).text()
            年龄 = 年龄.text().split('·')[1];
            
            log(租金预算);
            log(想住在);
            log(年龄)
            log('点击在线聊')
            clickView(text('在线聊').findOne());
            text('想对他说点什么呢？').waitFor();
            sleep(1000);
            log('点击更多')
            id("im_chat_base_title_right_more").findOne().click();
            text('免打扰').waitFor()
            log('免打扰')
            text('备注名称').waitFor()
            log('备注名称')
            click('备注名称')
    
            let 备注名称 = 年龄 + '|' + 租金预算 + '|' + 想住在;
            text('请输入备注名称').findOne().setText(备注名称);
            sleep(1000);
            click('修 改');
            log('开始执行话术延迟')
            sleep(randomOfSign(_话术延迟, '-') * 1000);
            log('点击返回按钮')
            id('im_chat_base_title_left_btn').findOne().click()
            sleep(2000)
            back()
        } else {
            log('返回')
            while (1) {
                if (!text('来访记录').exists()) {
                    back();
                } else {
                    break;
                }
                sleep(2 * 1000)
            }
            sleep(1000);
        }
    }
    log('for循环结束')

    log('返回到其他界面')
    while (1) {
        if (!text('我的找室友').exists()) {
            back();
        } else {
            break;
        }
        sleep(5 * 1000)
    }
    log('成功进入我的找室友')
}

function 发布帖子 (clickDelay, imgsName) {
    log('开始发布帖子函数')
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
    let 室友期望 = getHostText(imgsName+'expect.txt')
    
    text('可以补充更多对“室友”的期望要求(选填)').findOne().setText(室友期望)
    log('填写室友期待完成');

    while (1) {
        sleep(3 * 1000);
        if (text('房东').exists() && text('租户').exists()) {
            log('找到了 房东 租户');
            break;
        } else {
            log('没有找到 房东 租户');
            textClick('下一步');
        }

    }
    downloadImgs(imgsName);
    let 上传照片 = text('房屋照片(3-9张)').findOne().parent().child(1)
    while (1) {
        if (text('所有照片').exists()) {
           break;
        } else {
            clickView(上传照片, 10);
            sleep(5 * 1000);
        }
    }
    sleep(randomNumber(clickDelay, '-'));
    click('更换相册');
    log('点击更换相册成功');
    
    while (1) {
        sleep(1000);
        let 文件夹名称 = getDirName(imgsName);
        log('文件夹名称:'+文件夹名称);
        let 文件夹 = text(文件夹名称).findOne(1500);
        if (文件夹) {
            log('找到了 文件夹');
            textClick(文件夹名称);
            textWait(['完成']);
            let _单选组= id('select_image_click_layout').find();
            for (let i = 1; i < 10; i++) {
                try {
                    _单选组[_单选组.length - i].click();
                } catch (_err) {
                    log('选择报错:'+_err);

                }
                sleep(random(200, 500));
            }
            break;
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
    
    let 标题内容 = getHostText(imgsName+'title.txt')
    log('标题内容：'+标题内容)
    if (!标题内容) {
        log('没有标题内容')
        exit()
    }

    标题.parent().findOne(className('EditText')).setText(标题内容)

    let 描述 = getHostText(imgsName+'desc.txt')
    log('描述：'+描述)

    text('可以补充更多对“房子”的描述(选填)').findOne().setText(描述)
    sleep(randomNumber(clickDelay, '-'))
    scrollForward()
    ///////////////////////小区名称///////////////////

    textClick('小区名称')

    textWait(['请输入小区名'])

    let 小区名称 = getHostText(imgsName+'CommunityName.txt')
    text('请输入小区名').findOne().setText(小区名称)

    sleep(5 * 1000);

    let 小区名称数组 = text(小区名称).find();
    clickView(小区名称数组[小区名称数组.length - 1]);
    sleep(randomNumber(clickDelay, '-'));

    ///////////////////////月租金///////////////////
    while (1) {
        if (text('押一付一').exists() && text('押一付三').exists() && text('半年付').exists()) {
            log('找到了 押一付一');
            break;
        } else {
            log('没有找到 押一付一');
            textClick('月租金');
            sleep(2000);
        }
    }
    sleep(randomNumber(clickDelay, '-'))
    textClick('押一付一')
    sleep(randomNumber(clickDelay, '-'))
    let 月租金 = getHostText(imgsName+'MonthlyRent.txt').split('')
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
    let 户型 = getHostText(imgsName+'HouseType.txt').split('|')
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

    textClick('确定');
    while (1) {
        sleep(5 * 1000)
        if (text('查看发布').exists()) {
            textClick('查看发布')
        } else if (text('找室友').exists()) {
            log('找室友')
            break;

        } else {
            log('没有找到 查看发布');
            textClick('立即发布')
        }
    }
}

function 删除帖子 () {

    log('开始 删除帖子函数');
    sleep(2000);
    while (1) {
        if (text('我的找室友').exists()) {
            break;

        } else if (text('无房找室友').exists()) {
            back();
        } else {
            log('没有找到 我的找室友 无房找室友');
        }

    }

    while (1) {
        if (text('写错了').exists() && text('想发新的').exists()) {
            log('点击删除成功');
            break;
        } else {
            textClick('删除');
            sleep(random(2000, 3000));
            
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

    while(!_找室友_view.click());


    while (1) {
        if (text('全深圳').exists() && text('有房/无房').exists() && text('筛选').exists()) {
            log('进入找室友界面成功')
            break
        }
        sleep(1000)
        log('等待进入找室友界面')
    }
}

function compatibleFun () {
    log('启动兼容函数');

    while (1) {

        if (textContains('服务器君累').exists()) {
            console.error('服务器君累趴下了！！！');
        } else if (textContains('服务器崩溃了').exists()) {
            console.error('服务器崩溃了!!');
        }

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
    http.__okhttp__.setTimeout(3e4);
    log('getHostText:'+api)
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

function getDirName (_link) {
    log('getDirName:'+_link)

    let _path = _link.replace(/http:\/\/lansu.8-0000.com\//g, '');

    _path = _path.replace(/\//g, '');

    log('_getDirName_path:'+_path);
    return _path;

}

function downloadImgs (fName) {
    log('downloadImgs:'+fName);
    let deviceDirName = '/sdcard/'+getDirName(fName)+'/'
    let hostDirName = fName

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