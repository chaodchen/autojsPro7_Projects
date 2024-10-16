"ui";
importClass(android.graphics.Color)
importClass(android.text.InputType)
//脚本UI初始化
log('创建本地储存')
let storage = storages.create(config.projectName)
log(storage.get('storage_uiConfig'))
let storage_uiConfig = storage.get('storage_uiConfig') || {
    editView:[],
    radioView:[],
    checkboxView:[]
}

//读取UI配置
//绘制UI框架
ui.layout(
    <drawer id='drawer'>
        <vertical>
            <appbar bg='{{config.themeColor}}'>
                <toolbar id='toolbar' title='{{config.projectName + config.version}}'></toolbar>
                <tabs id='tabs'></tabs>
            </appbar>
            <viewpager id='viewpager'>
                <frame id='frame_1'></frame>
                <frame id='frame_2'></frame>
                <frame id='frame_3'></frame>
            </viewpager>
        </vertical>
        <frame id='frame_4'></frame>
    </drawer>
)

//设置状态栏颜色
ui.statusBarColor(config.themeColor)
// 让工具栏左上角可以打开侧拉菜单
ui.viewpager.setTitles(["首页", "配置", "我的"]);
// 让滑动页面和标签栏联动
ui.tabs.setupWithViewPager(ui.viewpager);
log('开始绘制UI内容')

//创建选项菜单(右上角)
ui.emitter.on("create_options_menu", menu=>{
    menu.add("开始");
    menu.add("退出");
});

//监听选项菜单点击
ui.emitter.on("options_item_selected", (e, item)=>{
    switch(item.getTitle()){
        case "开始":
            开始线程 = threads.start(function(){
                保存UI配置()
                scriptFun(storage_uiConfig)
            })
            break;
        case "退出":
            exit()
            break;
    }
    e.consumed = true;
});
activity.setSupportActionBar(ui.toolbar);

ui.inflate(
    <vertical>
        <card cardCornerRadius='5dp' margin='5dp' cardElevation='5dp' >
            <vertical>
                <vertical w='*'>
                    <text textStyle='bold' text='《软件服务》' w='*' gravity='center' textColor='#000000' textSize='18sp'></text>
                    <text bg='{{config.themeColor}}' w='*' h='5dp' margin='45 5 45 5'></text>
                </vertical>
                <horizontal bg='#ffffff' margin='5dp' weightSum="2">
                    <button layout_weight='1' text='悬浮窗' id='window'></button>
                    <button layout_weight='1' text='无障碍' id='auto'></button>
                    <button layout_weight='1' text='Root' id='root'></button>
                    <button layout_weight='1' text='系统' id='system'></button>

                </horizontal>
            </vertical>
        </card>

        <card cardCornerRadius='5dp' margin='5dp' cardElevation='5dp' >
            <vertical>
                <vertical w='*'>
                    <text textStyle='bold' text='《软件公告》' w='*' gravity='center' textColor='#000000' textSize='18sp'></text>
                    <text bg='{{config.themeColor}}' w='*' h='5dp' margin='65 5 65 5'></text>
                </vertical>
                <vertical>
                    <text text='{{config.notice}}' textSize='16sp' padding='5dp'></text>
                </vertical>
            </vertical>
        </card>

        <card cardCornerRadius='5dp' margin='5dp' cardElevation='5dp'>
            <vertical>
                <vertical w='*'>
                    <text textStyle='bold' text='《其他功能》' w='*' gravity='center' textColor='#000000' textSize='18sp'></text>
                    <text bg='{{config.themeColor}}' w='*' h='5dp' margin='85 5 85 5'></text>
                </vertical>
                <horizontal w='*'>
                    <button layout_weight='1' gravity='center' text='加入官群'></button>
                    <button layout_weight='1' gravity='center' text='联系作者'></button>
                    <button layout_weight='1' gravity='center' text='复制日志'></button>
                </horizontal>
            </vertical>
        </card>

        <card cardCornerRadius='5dp' margin='5dp' cardElevation='5dp'>
            <vertical>
                <vertical w='*'>
                    <text textStyle='bold' text='《测试功能》' w='*' gravity='center' textColor='#000000' textSize='18sp'></text>
                    <text bg='{{config.themeColor}}' w='*' h='5dp' margin='105 5 105 5'></text>
                </vertical>
                <horizontal w='*'>
                    <button layout_weight='1' gravity='center' text='退出软件'></button>
                </horizontal>
            </vertical>
        </card>
    </vertical>, ui.frame_1, true
)

ui.auto.click(() => {
    try {
        let intent = new Intent()
        intent.setAction('android.settings.ACCESSIBILITY_SETTINGS')
        app.startActivity(intent)
    } catch (_e) {
        toastLog('错误')
    }
})

ui.window.click(() => {
    try {
        let intent = new Intent()
        intent.setAction('android.settings.action.MANAGE_OVERLAY_PERMISSION')
        app.startActivity(intent)
    } catch (_e) {
        toastLog('错误')
    }
})

ui.root.click(() => {
    try {
        // let intent = new Intent()
        // intent.setAction('android.settings.action.MANAGE_OVERLAY_PERMISSION')
        // app.startActivity(intent)
        let sh = new Shell(true)
        Tap(100, 100)
    } catch (_e) {
        toastLog('错误')
    }
})

ui.system.click(() => {
    try {
        device.setBrightnessMode(0)
    } catch (_e) {
        toastLog('报错：'+_e)
    }
})

//添加配置界面父控件
ui.inflate(
    <vertical id='vertical_1' padding='5dp'>
        <ScrollView>
            <vertical>
                <text w='*' gravity='center' text='编辑框区域' layout_gravity='center' margin='5dp'></text>
                <vertical id='editParent'>

                </vertical>
                <text w='*' gravity='center' text='单选框区域' layout_gravity='center' margin='5dp'></text>
                <radiogroup id='radioParent' orientation='vertical'>

                </radiogroup>
                <text w='*' gravity='center' text='多选框区域' layout_gravity='center' margin='5dp'></text>
                <vertical id='checkboxParent'>

                </vertical>
            </vertical>
        </ScrollView>
    </vertical>, ui.frame_2, true
)

//渲染编辑框
config.uiConfig.editView.map((_view, _index) => {
    // log(_view)
    log('第%d次渲染编辑框', _index)
    if (_view) {
        log('_view不为空')
        _view.id = 'editView'+_index
        this._view = _view
        ui.inflate(
            <input id='{{_view.id}}' w='*'></input>
            ,ui.editParent, true
        )
        if (_view.hint) ui[_view.id].setHint(_view.hint);

        if (_view.textColor) ui[_view.id].setTextColor(Color.parseColor(_view.textColor));

        if (_view.textSize) ui[_view.id].setTextSize(_view.textSize)

        if (_view.inputType) ui[_view.id].setInputType(InputType[_view.inputType])
        
        if (storage_uiConfig.editView[_index]) ui[_view.id].setText(storage_uiConfig.editView[_index])
    } else {
        log('_view为空')
    }
    // return _view
})

//渲染单选框
config.uiConfig.radioView.map((_view, _index) => {
    if (_view) {
        _view.id = 'radioView'+_index
        this._view = _view
        ui.inflate(
            <radio id='{{_view.id}}'></radio>
            ,ui.radioParent, true
        )
        if (_view.text) ui[_view.id].setText(_view.text)
        if (storage_uiConfig.radioView[_index]) ui[_view.id].setChecked(storage_uiConfig.radioView[_index])

    }
})

//渲染多选框
config.uiConfig.checkboxView.map((_view, _index) => {
    if (_view) {
        _view.id = 'checkboxView'+_index
        this._view = _view
        ui.inflate(
            <checkbox id='{{_view.id}}'></checkbox>
            ,ui.checkboxParent, true
        )
        if (_view.text) ui[_view.id].setText(_view.text)
        if (storage_uiConfig.checkboxView[_index]) ui[_view.id].setChecked(storage_uiConfig.checkboxView[_index])
    }
})

function 保存UI配置 () {
    storage_uiConfig.editView = []
    storage_uiConfig.radioView = []
    storage_uiConfig.checkboxView = []

    config.uiConfig.editView.forEach((_view, _index) => {
        log('第%d次保存编辑框文本', _index)
        log('view:'+_view)
        log('要保存的文本：'+ui[_view.id].text())
        storage_uiConfig.editView.push(ui[_view.id].text() || '')
    })

    config.uiConfig.radioView.forEach((_view, _index) => {
        if (_view) {
            storage_uiConfig.radioView.push(ui[_view.id].isChecked() || false)
        }
    })

    config.uiConfig.checkboxView.forEach((_view, _index) => {
        if (_view) {
            storage_uiConfig.checkboxView.push(ui[_view.id].isChecked() || false)
        }
    })

    log('开始把UI配置写入本地储存')
    storage.put('storage_uiConfig', storage_uiConfig)
    log('写入成功')
}
