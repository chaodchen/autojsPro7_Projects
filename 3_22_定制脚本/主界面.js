"ui";

var softTitle="抖音直播助手"
var color = "#007aff";          //主题颜色
var roomID= "roomID"
var storage = storages.create("qq467780985");
var content = storage.get("content");
var f = null;//通讯线程

var myDate=new Date()
var logpath = "/sdcard/efenlog/"+myDate.toLocaleDateString()+myDate.getHours()+'时'+myDate.getMinutes()+'分'+myDate.getSeconds()+'秒'+".txt";
const W = device.width;
const H = device.height;

const DY_PACKAGE_NAME = "com.ss.android.ugc.aweme";

files.createWithDirs(logpath);
files.write(logpath, "0xFEFF");
console.setGlobalLogConfig({
    "file": logpath
});




//监听say事件
events.on("floatEmitter", function(floatEmitter){
    f = floatEmitter;
    main();
});

events.on("gather", function(){
    gatherPosition();
})

/***
 * 视图日志显示
 */
function vlog($msg){
    try {
        
        toastLog($msg)
        
    } catch (e) {
        log("出现异常");
        log(e);
    }
    
}

var datamofang = true;
var datazidingyi = false;


indexUi()
function indexUi(){
ui.layout(
    <drawer id="drawer" bg="#F0F8FF">
        <vertical>
            <linear gravity="center">
            <RelativeLayout id="head" h="48" w="*" margin="0" padding="18 0" bg="{{ color }}" layout_alignParentTop="true">
                <text id="title" gravity="right" textColor="white" textSize="17sp" text="{{softTitle}}" textStyle="bold" layout_centerInParent="true" w="auto" h="auto" />
                <img id="shezhi" w="25" h="25" gravity="right" src="@drawable/ic_settings_black_48dp" tint="white" />

                </RelativeLayout>
            </linear>

            <text textColor="red"/>

            <card w="*" cardCornerRadius="30dp" cardElevation="1dp" gravity="center_vertical">
            <horizontal padding="18 8" h="auto"gravity="center">
                <Switch id="autoService" textColor="#000000" textSize="14sp" text="无障碍服务" checked="{{auto.service != null}}" padding="10 8 10 8" textSize="16sp" />
                <Switch id="xuanfu" textColor="#000000" textSize="14sp" text="悬浮窗服务" checked="{{auto.service != null}}" padding="10 8 10 8" textSize="16sp" />
            </horizontal>
            </card>

            <vertical h="auto" padding="5 0" gravity="center_vertical">
             <text  h="auto" textSize="12sp" text="两项必须开启，无障碍每次从新打开软件都要开启，悬浮窗只需要开一次。" gravity="center"/>
            </vertical>

            <card w="*" cardCornerRadius="30dp" cardElevation="1dp" gravity="center_vertical">
            <horizontal padding="15 15 15">
                <vertical h="*" layout_weight="1" gravity="center">
                    <text textSize="16sp" textColor="#333333" text="主播uid" />
                </vertical>
                <vertical h="*" layout_weight="100" gravity="center">
                     <input id="roomID" w="*" text="" hint="" textColor="#333333" textColorHint="#999999" inputType="number"  />
                </vertical>
            </horizontal>
            </card>

            <vertical h="auto" padding="5 0" gravity="center_vertical">
             <text  h="auto" textSize="12sp" text="主播uid：UID可以不填，不填的话请运行后手动进入主播间" gravity="center"/>
            </vertical>
 


            <card w="*" cardCornerRadius="30dp" cardElevation="1dp" gravity="center_vertical">
            <horizontal padding="15 15 15">
                <vertical h="*" layout_weight="1" gravity="center">
                <text textSize="16sp" textColor="#333333" text="运行时长(分钟)" />
                </vertical>
                <vertical h="*" layout_weight="100" gravity="center">
                <input id="provide_runtime" w="*" text="60" hint="" textColor="#333333" textColorHint="#999999" inputType="number" gravity="center" />
                </vertical>
            </horizontal>
            </card>

            <vertical h="auto" padding="5 0" gravity="center_vertical">
             <text h="auto" textSize="12sp" text="运行时长：运行的时间，到时间退出抖音。" gravity="center"/>
            </vertical>


            <card w="*" cardCornerRadius="30dp" cardElevation="1dp" gravity="center_vertical">
            <horizontal padding="15 15 15 ">
            <vertical h="*" layout_weight="1" gravity="center">
                        <text textSize="16sp" textColor="#333333" text="点赞速度(毫秒)" />
                        </vertical>
                <vertical h="*" layout_weight="100" gravity="center">
                        <input textSize="16sp" id="输入框1" hint="" text="1-20" inputType="number" gravity="center" />
            </vertical>
            </horizontal>
            </card>

            <vertical h="auto" padding="5 0" gravity="center_vertical">
             <text  h="auto" textSize="12sp" text="点赞速度：1秒为1000毫秒，1-20就是随机1-20毫秒" gravity="center"/>
            </vertical>

            <card w="*" cardCornerRadius="30dp" cardElevation="1dp" gravity="center_vertical">
            <horizontal padding="15 15 15 ">
            <vertical h="*" layout_weight="1" gravity="center">
                        <text textSize="16sp" textColor="#333333" text="点赞次数" />
            </vertical>
            <vertical h="*" layout_weight="100" gravity="center">
                    <input textSize="16sp" id="输入框2" hint="" text="100" inputType="number" gravity="center" />
            </vertical>
            </horizontal>
            </card>

            
            <vertical h="auto" padding="5 0" gravity="center_vertical">
             <text  h="auto" textSize="12sp" text="点赞次数：点赞多少次发送一次评论" gravity="center"/>
            </vertical>
            
            <card w="*" cardCornerRadius="30dp" cardElevation="1dp" gravity="center_vertical">
            <horizontal marginTop="10"marginBottom="10"gravity="center">
                    <checkbox id="mofang" text="模仿公屏弹幕" checked="{{ datamofang }}" />
                    <checkbox id="zidingyi" text="自定义弹幕" checked="{{ datazidingyi }}" />
            </horizontal>
            </card>

            <vertical h="auto" padding="5 0" gravity="center_vertical">
             <text  h="auto" textSize="12sp" text="模仿公屏:全自动，公屏上在发什么，就跟随着发什么。" gravity="center"/>
             <text  h="auto" textSize="12sp" text="自定义:在左上角齿轮处设置保存，可以设置无限条，发送的时候随机发。" gravity="center"/>
            </vertical>

            <vertical layout_weight="1"gravity="center|bottom">
                <card w="200" h="60" margin="10 5" cardCornerRadius="30dp"
                    cardElevation="1dp" gravity="center_vertical" cardBackgroundColor="#87CEEB"  >
                    <vertical id="启动"   gravity="center">
                    <text textColor="#F0FFFF" textSize="25sp" text="启 动 运 行" gravity="center"/>
                    </vertical>
                </card>
            </vertical>

            
        </vertical>
    </drawer>
    );




 /***话术配置 */
 ui.shezhi.on("click",()=>{
    vtUi();
})
ui.xuanfu.on("check", function (xuanfu) {
    // 用户勾选悬浮窗的选项时，跳转到页面让用户去开启
    if (xuanfu && auto.service == null) {
        app.startActivity({
            action: "android.settings.action.MANAGE_OVERLAY_PERMISSION"
        })
    }
    if (!xuanfu && auto.service != null) {
        auto.service.disableSelf();
    }
});


ui.mofang.on("click", () => {
    datamofang = ui.mofang.isChecked()
    datazidingyi = !ui.zidingyi.isChecked()
    ui.mofang.setChecked(datamofang)
    ui.zidingyi.setChecked(datazidingyi)
});
ui.zidingyi.on("click", () => {
    datamofang = !ui.mofang.isChecked()
    datazidingyi = ui.zidingyi.isChecked()
    ui.mofang.setChecked(datamofang)
    ui.zidingyi.setChecked(datazidingyi)
});

ui.autoService.on("check", function (checked) {
    // 用户勾选无障碍服务的选项时，跳转到页面让用户去开启
    if (checked && auto.service == null) {
        app.startActivity({
            action: "android.settings.ACCESSIBILITY_SETTINGS"
        });
    }
    if (!checked && auto.service != null) {
        auto.service.disableSelf();
    }
});
ui.启动.click(function () {
    goto_Room();
    start_observeKey();
    toast("点击启动")
    arr = new Array();
    for (i = 0; i < 1; i++) {
        var content = ui["输入框" + (i + 1)].getText() + "";
        storage.put("输入框" + (i + 1), content);
        arr.push(content);
    } log(arr);
    线程1 = threads.start(脚本)
});


var storage = storages.create("点赞");
for (i = 0; i < 1; i++) {
    var content = storage.get("输入框" + (i + 1));

    if (content) {
        ui["输入框" + (i + 1)].setText(content);
    }
}


};


/***
 * 话术页面
 */
 function vtUi(){
    ui.statusBarColor("#a0cfff");
    pageView = "vt";

    this.live_words = "来了  来了  来了\n11111111111\n主播真厉害\n我是捧场王\n榜一最帅\n2222222";
    ui.layout(

        <vertical h="*">
            <appbar bg="#a0cfff">
                <toolbar id="toolbar" fitsSystemWindows="true" h="50" >
                    <img w="50" h="45" id="back" src="@drawable/ic_keyboard_arrow_left_black_48dp" tint="white" />
                    <text text="话术设置" textStyle="bold" textSize="23" textColor="#ffffff" layout_gravity="center" />
                </toolbar>                   
            </appbar>

            <ScrollView>
                <vertical>
                    <vertical paddingLeft="20" paddingRight="20" paddingBottom="80" marginTop="10" layout_weight="1" >
                        <card w="*" cardCornerRadius="30dp" cardElevation="1dp" gravity="center_vertical" marginTop="10" cardBackgroundColor="#8EE5EE">
                            <vertical h="*" gravity="center" padding="10">
                                <text text="话术配置说明" textColor="#FF0000"></text>
                                    <text id="hspzsm" text="" textColor="#FF0000" w="*" textSize="10"></text>
                            </vertical>
                        </card>

                      

                        <card w="*" cardCornerRadius="30dp" cardElevation="1dp" gravity="center_vertical" marginTop="10" cardBackgroundColor="#8EE5EE">
                            <vertical h="*" gravity="center" padding="10">
                                <text text="直播话术" textColor="#000000"></text>
                                <input id="content" text="{{this.live_words}}" textColor="#000000" w="*" textSize="10"></input>
                            </vertical>
                        </card>

                      

                    </vertical> 
                    <button id="save" bg="#a0cfff" textColor="#000000" text="保存并返回" h="40" layout_gravity="bottom"></button>
                    
                </vertical>
            </ScrollView>
            
        </vertical>        
    );

    ui.hspzsm.setText("  每段话术用回车键分隔，可以添加无限条，系统会随机选一条发送。\n  其中私信和回访话术可用美元符号“$”分隔单条话术，使较长的单条话术分多次发送。")
    var storage = storages.create("qq467780985");
    var content = storage.get("content");
 

    /*** 返回主界面*/
    ui.back.on("click", ()=>{    
        pageView = "index";
        indexUi();
    });

    if(content != null){
        ui.content.setText(content);
    }

    ui.save.click(()=>{
      storage.put("content", ui.content.text());    
        indexUi();
    });


}



function start_observeKey() {
    if (auto.service !== null) {
        //启用按键监听
        events.observeKey();

        //监听音量上键按下
        events.onKeyDown("volume_up", function (event) {
            toastLog("强制停止当前脚本");
            engines.myEngine().forceStop();
        });
    };
};

//跳转到指定的直播房间
function goto_Room() {
    var roomID = ui.roomID.text();
    app.startActivity({
        data: "snssdk1128://live?room_id="+ roomID
    });
};


//悬浮窗
function 脚本(){

    floatEmitter = events.emitter(threads.currentThread());
    pageView = "float_window";

    importClass(android.widget.TextView)
    threads.start(function () {
        var window = floaty.window(
            <card cardCornerRadius="30" cardElevation="0" contentPadding="5" cardBackgroundColor="#FFFFFF" alpha="0.8">
        <vertical h="auto" w="auto" id="fr" >

            <frame  h="auto" >
                <horizontal w="auto">
                    <vertical w="auto" h="40" gravity="center" layout_gravity="left|center" marginLeft="30" marginRight="30">
                        <text id="stateText" w="auto" textStyle="bold" textSize="12sp" textColor="red" gravity="center" text="未运行" ></text>
                    </vertical>

                    <vertical id="start" w="40" h="40" gravity="center" visibility="gone">
                        <img id="start_icon" tint="green" w="30" h="30" src="@drawable/ic_play_circle_filled_black_48dp"></img>
                    </vertical>

                    <vertical id="quit" w="40" h="40" gravity="center" visibility="gone">
                        <img id="quit_icon" tint="red" w="30" h="30" src="@drawable/ic_cancel_black_48dp"></img>
                    </vertical>
                </horizontal>
                <img id="action" tint="green" layout_gravity="right|center" w="30" h="30" src="@drawable/ic_redo_black_48dp"></img>
            </frame>

            <vertical id="ava"  h="auto" w="*"  visibility="gone">
                <horizontal>
                    <text text="总内存:" h="20" textColor="#000000" textSize="10" textStyle="bold"></text>
                    <text id = "TotalMem" h="20" text="" marginRight="5"  textColor="#000000"  textSize="10" textStyle="bold"></text>

                    <text text="可用内存:" h="20"  textColor="#000000"  textSize="10" textStyle="bold"></text>
                    <text id = "AvailMem" h="20" text="" marginRight="5"  textColor="#000000" textSize="10" textStyle="bold"></text>

                    <text text="剩余电量:" h="20"  textColor="#000000" textSize="10" textStyle="bold"></text>
                    <text id = "quantity" h="20" text=""  textColor="#000000" textSize="10" textStyle="bold"></text>

                </horizontal>
            </vertical>
        </vertical>
    </card>
        );

        window.setPosition(0.2*device.width, device.height - (device.height * 0.85))



        ui.run(function(){
            let myVar = setInterval(function(){
                let a =parseInt((device.getTotalMem())/(1024*1024)).toString(); //内存总量
                let u =parseInt((device.getAvailMem())/(1024*1024)).toString(); //当前可用内存
                let d = device.getBattery().toString();
                window.AvailMem.setTextColor(colors.parseColor("#000000"));

                window.TotalMem.setText(a + 'M');
                window.AvailMem.setText(u + 'M');
                window.quantity.setText(d + '%');

                if(parseInt(u) <= 400){
                    window.AvailMem.setTextColor(colors.parseColor("#FF0000"));
                    log("总内存为:"+a + 'M');
                    log('当前可用内存:'+u + 'M');
                    log("当前电量:"+d + '%');
                }

                if(parseInt(u) <= 100){
                    window.AvailMem.setTextColor(colors.parseColor("#FF0000"));
                    toastLog("内存不足警告!即将发生闪退危险!");
                    log("总内存为:"+a + 'M');
                    toastLog('当前可用内存:'+u + 'M');
                    log("当前电量:"+d + '%');
                    events.broadcast.emit("任务结束", "内存不足");
                    clearInterval(myVar);
                }
            },500)
        })

        window.stateText.on("click", () => {
            if(window.start.getVisibility() == 8 && window.quit.getVisibility() == 8){

                window.start.setVisibility(0);
                window.quit.setVisibility(0);
                window.ava.setVisibility(0);
            }else{

                window.start.setVisibility(8);
                window.quit.setVisibility(8);
                window.ava.setVisibility(8);

            }
            
        })

        //退出
        window.quit.click(function () {
            toast("程序已退出");
            engines.stopAll()
        });

        //点开始或者暂停按钮
        window.start.click(function () {
            //点开始按钮修改
            if (window.stateText.getText() == '未运行') {
                //开始运行
                update_view("image", window.start_icon, "@drawable/ic_pause_circle_filled_black_48dp");
                update_view("text", window.stateText, "运行中");
                update_view("color", window.stateText, "#000000");
                线程2 = threads.start(主脚本)

            } else {
                update_view("image", window.start_icon, "@drawable/ic_play_circle_filled_black_48dp")
                update_view("text", window.stateText, "未运行");
                update_view("color", window.stateText, "#000000")
                线程2.interrupt()

            }
        });

        //更新视图
        function update_view(type, id, str) {
            ui.run(function () {
                if (type == "text") {
                    id.setText(str);
                }
                if (type == "image") {
                    id.setSource(str);
                }
                if (type == "color") {
                    id.setTextColor(colors.parseColor(str));
                }
            });
        }

    try{
        floatEmitter.on("stop", function(s){
            if(s){
                ui.run(function(){
                    log("状态改为待机");
                    update_view("image", window.start_icon, "@drawable/ic_play_circle_filled_black_48dp")
                    update_view("text", window.stateText, "任务结束");
                    update_view("color", window.stateText, "#FF0000");
                    e.getEngine().forceStop();
                })
            }
        })
    }
    catch(e){
        log("线程通讯出错"+e)
    }


    
    });
}


function suijidanmu() {
    mainThread.interrupt();
    var target = text("说点什么...").visibleToUser(true).findOne().bounds();
    if (target != null) {
    click(target.centerX(), target.centerY())
    }

    sleep(3000)
      setText(content[random(0, content.length-1)]);
    sleep(3000)

    
    var target = desc("发送").visibleToUser(true).findOne().bounds();
     if (target != null) {
        click(target.centerX(), target.centerY())
        sleep(1000)
       }
}

function mofangdanmu() {
    var jihe = [];
    var uc = textMatches(".+：.+").visibleToUser().find();
    var a = uc[2].text();
    str1 = a;
    jihe.push(str1);//加入数组
    dm=str1.split('：')[1]
    
    var target = text("说点什么...").visibleToUser(true).findOne().bounds();
    if (target != null) {
        click(target.centerX(), target.centerY());
    }

    sleep(3000)
    setText(dm)
    sleep(3000)

    var target = desc("发送").visibleToUser(true).findOne().bounds();
    if (target != null) {
        click(target.centerX(), target.centerY())
        sleep(1000)
    }
}


function 主脚本() {
    var X1 = device.height / 3.5
    var Y1 = device.width / 7
    var storage = storages.create("qq467780985");
    var content = storage.get("content");
    let content = content.split("\n");
    var dzcishu = ui.输入框2.getText()
    var yxshijian = ui.provide_runtime.getText()


    threads.start(function(){
        sleep(60 * 1000 * parseInt(yxshijian));
        back();
        sleep(500)
        back();
        sleep(100)
        back();
        sleep(100)
        back();
        sleep(3000)
        back();
        sleep(100)
        
        vlog("运行已到达指定时间，程序已退出");
        try{
            f.emit("stop",true);
        }catch(e){
            log("停止出错"+e);
        }
        exit();
    });

    sleep(2000);


    let mainThread = threads.start(function(){
        mutilproextro(centerCount);
    });

    let message = threads.start(function(){
    while (true) {
        mainThread.interrupt();
    for (var i = 0; i < dzcishu; i++) {
        mainThread.interrupt();
        setScreenMetrics(1080, 1920);
        var 分割 = String(ui.输入框1.getText()).split("-")
        var 速度 = random(Number(分割[0]), Number(分割[1]))
        var 随机1 = random(X1 - 50, X1 + 50)
        var 随机2 = random(Y1 - 50, Y1 + 50)
        click(随机2, 随机1)
        sleep(速度)
    }
        if(datamofang){

            var jihe = [];
            var uc = textMatches(".+：.+").visibleToUser().find();
            var a = uc[2].text();
            str1 = a;
            jihe.push(str1);//加入数组
            dm = str1.split('：')[1]

            var target = text("说点什么...").visibleToUser(true).findOne().bounds();
            if (target != null) {
                click(target.centerX(), target.centerY())
            }

            sleep(3000)
            setText(dm)
            sleep(3000)

            var target = desc("发送").visibleToUser(true).findOne().bounds();
            if (target != null) {
                click(target.centerX(), target.centerY())
                sleep(1000)
            }
        }
        
        if(datazidingyi){
            mainThread.interrupt();
            var target = text("说点什么...").visibleToUser(true).findOne().bounds();
            if (target != null) {
                click(target.centerX(), target.centerY())
            }

            sleep(3000)
            setText(content[random(0, content.length - 1)]);
            sleep(3000)


            var target = desc("发送").visibleToUser(true).findOne().bounds();
            if (target != null) {
                click(target.centerX(), target.centerY())
                sleep(1000)
            }
        }
     
    

    
    }

  });
}

