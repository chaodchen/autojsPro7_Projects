"ui";
// 初始化
importClass(android.view.View);
importClass(android.content.Intent);
importClass(android.net.Uri);
importClass(android.provider.Settings);
// AppKey 和 AppSecret 在泡椒云开发者后台获取

var color = "#FFC0CB", title = "羊毛衫";

//读取本地储存


//读取首页UI配置
var homeData = Config.o_storage.get('homeData') || {
    JHcode : ""
}

//读取脚本商店UI配置 
var scriptShopData = Config.o_storage.get('scriptShopData') || [
    {
        title:"快手极速版",
        time:"120",
        shuaTime:"0",
        idName:"ksjsb"
    },
    {
        title:"刷宝短视频",
        time:"80",
        shuaTime:"0",
        idName:'sbdsp'
    },
    {
        title:"抖音极速版",
        time:"90",
        shuaTime:"0",
        idName:"dyjsb"
    }
];

//

var color = "#009688";

ui.layout(
    <frame>
        <vertical>
            <appbar bg='{{color}}'>
                <toolbar title='{{title}}'></toolbar>
            </appbar>
            <card cardCornerRadius='5dp' margin='5dp' cardElevation='5dp' padding='5 5 5 5'>
                <vertical>
                    <horizontal>
                        <button id='start' gravity='center' layout_weight='1' text='开始运行' textSize='16sp' textColor='#000000'></button>
                        <button id='quit' gravity='center' layout_weight='1' text='退出软件' textSize='16sp' textColor='#000000'></button>
                    </horizontal>
                </vertical>
            </card>
            <ScrollView>
                <vertical id='body' w='*' h='*' padding='5dp'>

                </vertical>
            </ScrollView>
        </vertical>
    </frame>
);


//绘制脚本商店界面
ui.inflate(
    <vertical>
        <card cardCornerRadius='5dp' margin='5dp' cardElevation='5dp' padding='5 5 5 5'>
            <vertical>
                <list id='scriptShopList' padding='5dp'>
                    <vertical w='*'>
                        <horizontal>
                            <text w='auto' text='{{this.title}}：'></text>
                            <input id='{{this.idName}}' layout_weight='0' text='{{this.time}}'></input>
                            <text layout_weight='1' text='分，已刷：{{this.shuaTime}}分'></text>
                            <button text='重置' id='reset' layout_gravity='right'></button>
                        </horizontal>
                        <text w='*' h='2dp' text='' bg='{{color}}'></text>
                    </vertical>
                </list>
            </vertical>
        </card>
    </vertical>, ui.body, true
);

//导入list数据
ui.scriptShopList.setDataSource(scriptShopData);

//创建重置事件
ui.scriptShopList.on("item_bind", function (itemView, itemHolder){
    itemView.reset.on("click", function () {
        let item = itemHolder.item;
        scriptShopData.splice(itemHolder.position, 1,     {
            title:item.title,
            time:item.time,
            shuaTime:"0",
            idName:item.idName
        });
    });
});

ui.start.on("click", ()=> {
    startScript();
});

function startScript () {
    //首先获取配置
    scriptShopData.map((vue, index) => {
        if (vue) {
            scriptShopData[index].time = ui[vue.idName].text();
        }
    });

    //然后保存配置
    Config.o_storage.put('scriptShopData', scriptShopData);
    log('保存配置为：'+JSON.stringify(scriptShopData));
    //然后检测基础脚本运行环境
    let _jgyStr = null;
    let _runScript = threads.start(function(){
        _jgyStr = Config.f_getJgyFile(Config.s_jgyUser, Config.s_jgyKey, Config.s_jgyPath, "script.js");
        if (!_jgyStr) {
            toastLog("获取script脚本失败！")
        } else {
            eval(_jgyStr);
        }
    });
}
