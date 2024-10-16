var 当前版本 = 7;
var 脚本名称="给力刷金币无界面版本";
var storage = storages.create(脚本名称);
var qq交流群 = "207822467";
var 使用说明 = "暂无";
/////// var 下载链接 = "m.tb.cn/h.37c6suN"; ///////
var 下载链接 = "https://m.tb.cn/h.VJYeUbp?sm=6fbf61 "
var 应用包名 = "com.example.wzryphone";
var 打赏1元="fkx0998371nzatx7lwby37c";
var PHONE=手机信息();
var 适配的分辨率=[1280,1440,1520,1560,1600,1920,2040,2160,2220,2248,2280,2316,2340,2376,2400,2460,2560,2640,2880,2960,3040,3120,3168,3200];
var 分辨率高=正确的分辨率高(适配的分辨率);
var 分辨率高Text="分辨率高："+分辨率高;
var 是否需要更新=0;
var 提示更新的文字="";
///////  ui相关参数设置  //////////
var uicankaol=(PHONE.height>PHONE.width?PHONE.width:PHONE.height);
var uiw =parseInt(PHONE.width/1.98);
var uih =parseInt(PHONE.width/3);
var uitexth =parseInt(PHONE.width/3/9*2);
var uimargin =parseInt(PHONE.width/3/9/3);
var uimarginlr =parseInt(PHONE.width/3/9/3/2);
var uitextw =parseInt((uiw-uimargin)/2);
var uitextsize =parseInt(PHONE.width/3/9*2*0.7);
var uibgcolor ="#8B7D7B";
var uitextcolor ="#ffffff";
var uimovecolor="#43c080";

log(脚本名称+" v"+当前版本);
log("脚本测得分辨率："+PHONE.height+"*"+PHONE.width+"\n--(脚本测得分辨率不一定对,最好百度下)");
log("脚本测得手机型号："+PHONE.device);


无界面UI(脚本名称, 使用说明);

if(是否需要更新==2){
    app.openUrl(下载链接);
}else if(是否需要更新==1){
    log("非强制更新~");
    alert("检测到有更新","非强制更新~\n"
    +"更新链接："+下载链接+"\n"
    +"更新说明："+提示更新的文字);
}

var 关键坐标点=获取刷图数据();
log("开启无障碍权限 卡住");
auto.waitFor();
log("开启无障碍权限 通过");
//console.show();



sleep(100);
try {
    app.launch("com.tencent.tmgp.sgame");
} catch (e) {
    log("拉起app失败");
}

sleep(100);
var pointWindow = floaty.rawWindow(
    <frame >
        <text  text="" w="20px"h="20px" bg="#00FF00"/>
    </frame>
);
pointWindow.setPosition(0,0);
pointWindow.setTouchable(false);

toastLog("uiw->"+uiw);
toastLog("uih->"+uih);

sleep(100);
var window = floaty.window(
    <frame alpha="0.9">
        <vertical >
            <horizontal >
                <text id="action" textColor="{{uitextcolor}}"textSize="{{uitextsize}}px" gravity="center"marginRight="{{uimarginlr}}px" text="开始"h="{{uitexth}}px" w="{{uitextw}}px"bg="{{uimovecolor}}"/>
                <text id="time"   textColor="{{uitextcolor}}"textSize="{{uitextsize}}px" gravity="center"marginLeft="{{uimarginlr}}px"  text="倒计时"h="{{uitexth}}px" w="{{uitextw}}px"bg="{{uibgcolor}}"/>
            </horizontal> 
            <text id="fblHeight"  textColor="{{uitextcolor}}"textSize="{{uitextsize}}px" gravity="center"marginTop="{{uimargin}}px"   text="{{分辨率高Text}}"h="{{uitexth}}px" w="{{uiw}}px"bg="{{uibgcolor}}"/>
            <horizontal  marginTop="{{uimargin}}px" > 
                <text id="share"  textColor="{{uitextcolor}}"textSize="{{uitextsize}}px" gravity="center"marginRight="{{uimarginlr}}px"  text="分享"h="{{uitexth}}px" w="{{uitextw}}px"bg="{{uibgcolor}}"/>
                <text id="qqqun"  textColor="{{uitextcolor}}"textSize="{{uitextsize}}px" gravity="center"marginLeft="{{uimarginlr}}px"   text="加群"h="{{uitexth}}px" w="{{uitextw}}px"bg="{{uibgcolor}}"/>
            </horizontal> 
             <text id="end"        textColor="{{uitextcolor}}"textSize="{{uitextsize}}px" gravity="center"marginTop="{{uimargin}}px"   text="结束脚本"  h="{{uitexth}}px" bg="{{uibgcolor}}"/>
        </vertical>
    </frame>
);
window.setPosition( parseInt(uicankaol*0.15),parseInt(uicankaol*0.15) );


var selectTime=0;
    runtime=60*60;  
    runFlag=0; 

setInterval(() => {
    ui.run(() => {
        window.time.setText(时间字符串(runtime--));
    });
    if(runtime==0||runtime==-1){
        endFunc();
    }
}, 1000); 

window.action.setOnTouchListener(function(view, event) {
    switch (event.getAction()) {
        case event.ACTION_DOWN:
            x = event.getRawX();
            y = event.getRawY();
            windowX = window.getX();
            windowY = window.getY();
            downTime = new Date().getTime();
            return true;
        case event.ACTION_MOVE:
            //移动手指时调整悬浮窗位置
            window.setPosition(windowX + (event.getRawX() - x),
                windowY + (event.getRawY() - y));
            return true;
        case event.ACTION_UP:
            log("调用到了")
            //手指弹起时如果偏移很小则判断为点击
            if (Math.abs(event.getRawY() - y) <= 10 && Math.abs(event.getRawX() - x) <= 10) {
                onClick();
            }
            return true;
    }
    return true;
})

function onClick() {
    简单指导线程.interrupt();
    if(runFlag==0){
        ui.run(() => {
            window.action.setText("暂停");
        });
        runFlag=1;
        启动循环点击线程();
        显示状态信息("开始循环刷冒险",2,分辨率高Text);
    }else{
        runFlag=0;
        ui.run(() => {
            window.action.setText("开始");
        });
        pointWindow.setPosition(0,0);
        循环点击线程.interrupt();
        显示状态信息("刷图中断 已暂停",2,分辨率高Text);
    }
}

function 暂停刷图函数() {
    简单指导线程.interrupt();
    if(runFlag==1){
        runFlag=0;
        ui.run(() => {
            window.action.setText("开始");
        });
        pointWindow.setPosition(0,0);
        循环点击线程.interrupt();
        显示状态信息("刷图中断 已暂停",2,分辨率高Text);  
    }
}

启动简单指导线程();
var 简单指导线程;
function 启动简单指导线程() {
    简单指导线程 = threads.start(function() {
        显示状态信息("蓝色按钮移动位置",1,"");
        sleep(1300);
        显示状态信息("在闯关界面点开始",2,"");
        sleep(1300);
        显示状态信息("进游戏不动点自动",1,"");
        sleep(1300);
        显示状态信息("一直普攻请关补刀",1,"");
        sleep(1300);
        显示状态信息("不点闯关切换分辨",1,"");
        sleep(1300);
        显示状态信息("选择魔女回忆大师",1,"");
        sleep(1300);
        显示状态信息("阵容亚瑟后裔鲁班",1,"");
        sleep(1300);
        显示状态信息("任何疑问咨询客服",1,"");
        sleep(1300);
        显示状态信息("售后Q389358530",2,分辨率高Text);

    });
}

window.end.click(() => {
    try {
        循环点击线程.interrupt();
    } 
    catch (error) {
        log(error);
    }
    try {
        简单指导线程.interrupt();
    } 
    catch (error) {
        log(error);
    }
    endFunc();
});


function endFunc() {
    悬浮框横竖屏切换线程.interrupt();
    sleep(50);
    floaty.closeAll();
    suijishu=random(0, 2);
    //if(suijishu==0){
    //    支付宝打赏(打赏1元);
    //}
    engines.stopAll();
    exit();
    log("脚本正常结束");
}

function 获取刷图数据() {
    var 所有坐标点数据 = "1280720a1062595a"+"1440720a1157594a"+"1520720a1184594a"+"1560720a1211595a"+"1600720a1227594a"+"192010801597890a"+"204010801659891a"
    +"216010801732893a"+"222010801755891a"+"224810801763893a"+"228010801776892a"+"231610801796891a"+"234010801807891a"+"237610801825890a"+"240010801836893a"+"246010801870893a"
    +"2560144021311186"+"2640144021701189"+"2880144022901193"+"2960144023291190"+"3040144023681189"+"3120144024061188"+"3168144024301188"+"3200144024461190";

    var 查找分辨率=""+分辨率高+PHONE.width;
    var index = 所有坐标点数据.indexOf(查找分辨率);
    if(index>=0){
        x1=parseInt(所有坐标点数据.substring(index+8,index+12));
        y1=parseInt(所有坐标点数据.substring(index+12,index+16));
        log(""+分辨率高+PHONE.width+"->"+x1+" "+y1);
        return [x1,y1];
    }else{
        log("没有这个"+查找分辨率+"分辨率的刷图数据，如果你确实是这个分辨率，请进群联系开发者");
        return [0,0];
    } 
}




window.fblHeight.click(()=>{
    简单指导线程.interrupt();
    var haveDianColor;
    try {
        var index=适配的分辨率.indexOf(分辨率高);
        if((index+1)==适配的分辨率.length) 分辨率高=适配的分辨率[0];
        else 分辨率高=适配的分辨率[index+1];
        storage.put("分辨率高",分辨率高);

        tempDian=获取刷图数据();
        if(tempDian[0]==0){
            storage.put("分辨率高",分辨率高);
            haveDianColor="#FF0000";
            关键坐标点=[0,0];
        } else{
            关键坐标点=tempDian;
            haveDianColor=uibgcolor;
        }
        分辨率高Text="分辨率高："+分辨率高;
        ui.run(()=>{
            window.fblHeight.setText(分辨率高Text);
            window.fblHeight.setBackgroundColor(colors.parseColor(haveDianColor));
        });
    } catch (error) {
        log("切换分辨率错误，请联系开发者！！！"+error);   
    }
});

var timerId;
function 显示状态信息(str,sec,moren){
    try {
        clearTimeout(timerId);
    } 
    catch (error) {
        toastLog("first time");
    }
    ui.run(()=>{
        window.fblHeight.setText(str);
    });
    log(str);
    ui.run(()=>{
        timerId=setTimeout(function(){
            window.fblHeight.setText(moren);
        }, sec*1000);
    });
}

var 循环点击线程;
function 启动循环点击线程() {
    循环点击线程 = threads.start(function() {
        while(1){
            点击屏幕(关键坐标点[0],关键坐标点[1]);
            点击屏幕(parseInt(分辨率高*0.8123),parseInt(PHONE.width*0.9185) );
        }
    });
}
function 点击屏幕(x,y) {
    log("点击x:%s，y:%s", x, y);
    press(x,y,1);
    sleep(100);
    // 点击位置(x,y,10,pointWindow);
    sleep(900);
}

window.time.click(() => {
    简单指导线程.interrupt();
    var alltime=[60,120,150,240,300];
    if(selectTime==alltime.length){ 
       selectTime=0;
    }
    runtime=alltime[selectTime]*60;
    ui.run(() => {
        window.time.setText(时间字符串(runtime));
    });
    显示状态信息("倒计时"+alltime[selectTime]+"分钟",1,分辨率高Text);
    selectTime++;
});

window.share.click(() => {
    暂停刷图函数();
    var content = "给力的工作室店铺之金币脚本：\n" 
        +脚本名称+"\n" +
        "qq交流群："+qq交流群+"\n" +
        "下载链接："+下载链接+"\n" +
        "使用说明："+使用说明+"\n" +
        "适用对象：安卓7以上手机\n" +
        "演示视频：看群内群文件\n" +
        "觉得不错：打赏或分享";
    log("QQ分享内容\n"+content);
    QQ分享(content);
});

window.qqqun.click(() => {
    try {
        暂停刷图函数();
    加QQ群(qq交流群);
    } catch (error) {
        log(error);
    }
    
});

function 检测更新(num,url){
    var banben;
    threads.start(function(){  
        //var checkUpdateResult=0;
		//app.openUrl(url);
        //try {
            //var res = http.get(url);
            //if(res.statusCode == 200){
                //log("updating...");
                //var httpstr = res.body.string();
                //var index = httpstr.indexOf("bbh");
                //if(index>0){
                   // banben = parseInt(httpstr.substring(index+3,index+5),10);
                    //提示更新的文字=httpstr.substring(index+5,index+25);
                    //log("本机版本号:"+num+" 最新版本号:"+banben);
                    //if(banben>num)  checkUpdateResult=1;
                   // else            checkUpdateResult=-1;
                //}
            //}
        //} catch (error) {
            //log("检测更新失败，但不影响使用");
        //}
        //if(checkUpdateResult==1){
            //if(banben%2==0){
                //是否需要更新=2;
            //}else{
                //是否需要更新=1;
            //}
        //}else if(checkUpdateResult==-1){
            log("当前为最新版");
        //}else{
            //log("我的问题 没设置好");
        //}
        //log("update end");
    });
}

/**
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 */
function 手机信息() {
    return {
        id: device.getAndroidId(),
        sdk: device.sdkInt,
        height: device.height,
        width: device.width,
        device: device.device,
        model: device.brand + " " + device.product,
        statusbar: 状态栏高度(),
    };
}

function 正确的分辨率高(shuzu){
    if(storage.contains("分辨率高")==true)
    {
        return(storage.get("分辨率高"));
    }
    var min=shuzu.indexOf(PHONE.height);
    if(min==-1){
        log("正确的分辨率高:脚本数据库里没有这个"+PHONE.height+"分辨率高，如果你确实是，请进群联系开发者适配");
        log("将为您切换到最小分辨率高:"+shuzu[0]);
        return(shuzu[0]);
    }else{
        return(shuzu[min]);
    }
}

function 无界面UI(name, url) {
    var sdk = device.sdkInt;
    var str = "";
    if (sdk < 24) str = "无法启动脚本\n安卓版本低于7.0\n";
    else str = "直接启动脚本";
    while (true) {
        // var i = dialogs.select(name, "退出脚本", "------------", str,"百度自己的分辨率(主屏尺寸)");
        var i = 2;
        if (i == -1) {
            toast("不想用就选择退出脚本");
            continue;
        } else if (i == 1) {
            //toast("说明说网页地址已复制到剪贴板");
            setClip(url);
            app.openUrl(url);
            exit();
        } else if (i == 2) {
            if (sdk >= 24) break;
            else {
                //toast("说明说网页地址已复制到剪贴板");
                setClip(url);
                app.openUrl(url);
                exit();
            }
        }else if (i == 3) {
            var fblurl="http://detail.zol.com.cn/index.php?c=SearchList&keyword="+device.device;
            app.openUrl(fblurl);
            toastLog("已复制网址，跳转浏览器");
            log("回到桌面再次点击app，打开脚本");
            log("脚本正常结束");
            exit();
        } else if (i == 0) exit();
    }
}

function 时间字符串(time) {
    var min=parseInt(time/60);
    var sec=parseInt(time%60);
    if(sec<10) sec="0"+sec;
    return ""+min+":"+sec;
}

function 支付宝打赏(yuan) {
    try {
        app.startActivity({
            action: "android.intent.action.VIEW",
            data:   "alipayqr://platformapi/startapp?saId=10000007&qrcode="
                    +"HTTPS://QR.ALIPAY.COM/" + yuan
        });
    } catch (e) {
        toast("goto 支付宝 failed");
    }
}

function QQ分享(content) {
    try {
        app.startActivity({
            action: "android.intent.action.SEND",
            type: "text/*",
            extras: {
                "android.intent.extra.TEXT": content
            },
            packageName: "com.tencent.mobileqq",
            className: "com.tencent.mobileqq.activity.JumpActivity"
        });
    } catch (error) {
        log("share qq error!!!");
    }
}

function 点击位置(x,y,halfSize,window){
    window.setPosition(x-halfSize,y-halfSize);
}
function 状态栏高度() {
    var result = 0;
    var resourceId = context.getResources().getIdentifier("status_bar_height", "dimen", "android");
    if (resourceId > 0) {
        result = context.getResources().getDimensionPixelSize(resourceId);
    }
    //log("状态栏高度: " + result);
    return result;
}

var 悬浮框横竖屏切换线程;
悬浮框横竖屏切换(window);
function 悬浮框横竖屏切换(window){
    var lishihenshu=context.resources.configuration.orientation;
    悬浮框横竖屏切换线程=threads.start(function(){  
        while(1){
            henshu=context.resources.configuration.orientation;
            if(henshu!=lishihenshu){
                lishihenshu=henshu;
                wX = window.getX();
                wY = window.getY();
                window.setPosition(wY,wX);
            }
            sleep(250);
        }
    });
}

function 加QQ群(qun) {
    try {
        app.startActivity({
            action: "android.intent.action.VIEW",
            data:   "mqqapi://card/show_pslcard?src_type=internal&version=1&uin=" 
                    + qun + "&card_type=group&source=qrcode"
        });
    } catch (e) {
        toast("加入 " + qun + " QQ群失败,手动加吧");
    }
}
