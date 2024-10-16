let 屏幕高度比例 = storage.get('viewDataArr')['gdbl']
let 刷新延迟 = storage.get('viewDataArr')['sxyc']
// let 定时重启 = storage.get('viewDataArr')['dscq']
let 大区 = ui.sp1.getSelectedItemPosition();
let 地址 = ui.sp2.getSelectedItemPosition();
let 大区名称 = getDir().split('|')[大区]
let 地址名称 = getDir(大区名称).split('|')[地址]
let 文件夹名称 = 'http://8.210.169.126/' + 大区名称 + '/' + 地址名称 + '/'
log(文件夹名称);
let string_mod = importMods('TaoBaoProjcet/newBanHua/mod/string.js');
let view_mod = importMods('TaoBaoProjcet/newBanHua/mod/view.js');
let coor_mod = importMods('TaoBaoProjcet/newBanHua/mod/coor.js');
let number_mod = importMods('TaoBaoProjcet/newBanHua/mod/number.js');
let scriptConfig = http.get(文件夹名称 + 'config.json').body.string();
if (!scriptConfig) {
    console.error('获取软件配置失败！');
    exit();
}

console.show();

//------------------------以下是1.1移植函数

function everclick(cn) {
    if (cn!=null) {
        if (!coorYueJie(cn)) {
            click(cn.bounds().centerX(),cn.bounds().centerY())
            return true
        }
    }else{toast ("未找到控件")}


    return false;
}

function coorYueJie (cn) {//yuejie:true !yuejie:false
    let x = cn.bounds().centerX();
    let y = cn.bounds().centerY();
    console.log("x: %d\n y: %d", x, y)
    if (y > deviceH*0.04 && y<deviceH*屏幕高度比例 && x < deviceW -1 && x > 1) {
        return false
    } else {
        console.log("坐标越界")
        return true

    }
}

function XiaHua() {
    swipe(deviceW*0.5, deviceH*0.25, deviceW*0.5, deviceH*0.6, 500)
    sleep(num/6)
}

function sha_hua() {
    sleep(num/6)
    sswipe(deviceW*0.5, deviceH*0.6, deviceW*0.5, deviceH*0.25, 500)
    sleep(num/6)
}

//--以上是点击一些没id的控件要用的点击函数


const FIND_TIME = 2 * 1000;
// 控件寻找时间


//----------------------以下是检测最新帖子列表判断是否刷新要用的函数
var n_publish=0;//这个是new_publish函数内需要定义函数要先在全局声明的全局函数,是最近帖子距离当前分钟数
function detection_time(){
    XiaHua();//上划刷新列表
    sleep(num*2.5)
    let publish_time_element_list=className("android.widget.TextView").depth(4).drawingOrder(7).find();//获取用户名列表
    let publish_time_element_list2=className("android.widget.TextView").depth(4).drawingOrder(8).find();//若列表用户与用户同行或同乡有时会有个图标出现,这时控件的drawingOrder变为8
    let publish_name_element_list=className("android.widget.TextView").depth(4).drawingOrder(1).find();//获取发布时间和浏览人数
    let publish_name_time_list={};//将用户名和发布时间合并成键值到对象中
    
    for(var n=0,t=0,x=0;t<publish_time_element_list.length;n=n+1,t=t+1){
        if(publish_name_element_list[n].text().search("想要室友更匹配")==-1){
            var publish_name=publish_name_element_list[n].text();
        }else{
            n=n+5;
            var publish_name=publish_name_element_list[n].text();
        }
    
        if(publish_name_element_list[n].text().search("问答互帮互助")==-1){
            var publish_name=publish_name_element_list[n].text();
        }else{
            n=n+1;
            var publish_name=publish_name_element_list[n].text();
        }
    
        if(publish_name_element_list[n].text().search("租房那些事儿")==-1){
            var publish_name=publish_name_element_list[n].text();
        }else{
            n=n+1;
            var publish_name=publish_name_element_list[n].text();
        }
        //以上是为了排除这三个同drawing的控件出现造成的非列表用户的用户名提取
        if(publish_time_element_list[t].text().search("限")==-1){
            var publish_time=publish_time_element_list[t].text().split("前")[0];
            publish_name_time_list[publish_name]=publish_time;//如果字符串中没有"限字"说明有同行|同乡的控件,drawing顺序变了,使用第2个列表获取时间
        }else{
            var publish_time=publish_time_element_list2[x].text().split("前")[0];
            x=x+1;
        publish_name_time_list[publish_name]=publish_time;//用户名为键,发布时间为值放入到对象里
    }
    }
    
    sleep(num/5)
    
    var new_publish = null;//这是准备一个函数内传递到函数外的全局变量,接受最近帖子发布分钟数
    for (let key in publish_name_time_list) {
        if(publish_name_time_list[key].search("小时")==-1){//如果没有小时再检测是否有天
            if(publish_name_time_list[key].search("天")==-1){//如果没有小时和天,就是分钟,无需转换
                var new_publish = parseFloat(publish_name_time_list[key]);
                n_publish=new_publish;
            }else{
                var new_publish = parseFloat(publish_name_time_list[key])*60*24;//如果有天,转换为分钟]
                n_publish=new_publish;
            }
        }else{
            var new_publish = parseFloat(publish_name_time_list[key])*60;//如果有小时,转换为分钟
            n_publish=new_publish;//将最近帖子发布分钟数传递到全局变量
        };
        break;
    }
    toast("最新帖子距离当前时间"+new_publish+"分钟");
    let me = className("android.view.ViewGroup").depth(2).drawingOrder(2).indexInParent(9).findOne();//点击头像前往我的帖子页面
    sleep(num/5);
    everclick(me);
    sleep(num*4)
    }
//-----------------------以上是检测最新帖子列表判断是否刷新要用的函数



//------------------------以下是接着detection_time()使用的函数;

function detection_examine(new_p,max_t,min_t,max_j,min_j){
if(new_p<=max_t && new_p>=min_t){
    var YANSHI =random(60000*min_j, 60000*max_j);
    var examine =className("android.widget.TextView").depth(4).drawingOrder(6).indexInParent(5).findOne(1000);//审核中 这个控件
    if(examine==null){//审核中这个控件不知道为啥.text提取不到,只能用是否为空判断了
        toast("帖子过审啦,\n等待"+YANSHI/60000+"分钟后打招呼并刷新/重发");
        sleep(YANSHI);
        return 0
        //不在审核中,前往访客列表,开始打招呼并刷新或删除重发
    }else{
        sleep(num/3);
        toast("帖子还在审核中,晚点我会再来看看");
        back();
        sleep(YANSHI/3);
        toast("等待"+YANSHI/60000/3+"分钟")
        return 1
        ;//审核中,返回找室友页面,等待一个随机数,再进行循环检测最新发布的时间
    }
}};

//---------------------------------以上是接着detection_time()后使用的函数;

function 循环检测帖子刷新(){
    sleep(6000);
    for (d=0;d==2;d++){
        detection_time();
        console.log("检测111");
        if(detection_examine(n_publish,30,1,11,15)==1){
            d=d-1;
            back();
            sleep(4000);
            continue
        };
        if(detection_examine(n_publish,59,31,30,35)==1){
            d=d-1;
            back();
            sleep(4000);
            continue
        };
        if(detection_examine(n_publish,60,61,45,60)==1){
            d=d-1;
            back();
            sleep(4000);
            continue
        };
        if(detection_examine(n_publish,999999,62,50,90)==1){
            d=d-1;
            back();
            continue
        };
        d=d+2;
        return
    }
}
//--------------------

function closeCurrentPackage() {
 
    // 当前是关闭指定com.wuba包名即58同城app,currentPackage()是最近一次运行应用的包名
    let packageName = "com.wuba";
    app.openAppSetting(packageName);
    text(app.getAppName(packageName)).waitFor();
    let is_sure = textMatches(/(.*强.*|.*停.*|.*结.*|.*行.*)/).findOne();
    if (is_sure.enabled()) {
        textMatches(/(.*强.*|.*停.*|.*结.*|.*行.*)/).findOne().click();
        textMatches(/(.*确.*|.*定.*)/).findOne().click();
        toast(app.getAppName(packageName) + "应用已被关闭");
        sleep(num/2);
        back();
        sleep(num/2);
        app.launchApp("58同城");
        sleep(num/2);
        toast("重新启动应用中")
    } else {
        toast(app.getAppName(packageName) + "应用不能被正常关闭或不在后台运行");
        back();
    }
    sleep(1500);
    app.launchApp ("58同城");
    sleep(3000);
}
//------------以上是重启58的函数


//--------------------------------------------------------------------------------------
//--------------------------------------------------------------------------------------
function 打招呼(){
    var num =1500;
function end_time_span(et){
    if(hasChinese(et)){
        if(et=="昨天"){
            toast("昨天给tA发过消息啦,不打招呼了");
        }else{
            send()
        }
    }else{if(et.search("/")!==-1){
        send();
        toast("虽然打过招呼,但他很久没回了,再发一次");
        }else{
            toast("今天和Ta有消息互动啦,不打招呼了")
}
}};
//---------以上是发送消息的函数

function hasChinese(str) {
    return /[\u4E00-\u9FA5]+/g.test(str)
};//检测字符串是否包含中文字符
//-------------检测最近消息时间用的函数

function send(){
    if (!className("android.widget.EditText").findOne().setText("你好，找到室友了吗?")) {
        toast("输入文本失败")
    }
    console.log("输入文本成功")
}

//-------以下也是打招呼里用的
function waitZaiXianLiao () {
    if (text("在线聊").findOne(FIND_TIME)) return true;
    return false;
}

function waitLiaoTian() {
    if (className("android.widget.EditText").findOne(FIND_TIME/2) && 
        id("layout_send_right").findOne(FIND_TIME/2) &&
        id("im_chat_base_title_left_btn").findOne(FIND_TIME/2)) return true;
    return false;
}

function getTexts () {
    let texts = className("android.widget.TextView").find()
    let whiteText = ["TA发布的找室友帖子", "在线聊", "图片1/1"]
    let result  = []
    if (texts.length < 2) {
        toast("无Text")
        return result
    }

    texts.forEach((item) => {
        if (item == null) return;
        let temp = item.text()
        if (temp == "" || temp == " " || whiteText.indexOf(temp) > -1) return;
        result.push(temp)
        
    })
    return result;
}


function backToLaifangHistory () {
    while (1) {
        if (textEndsWith("前看过").findOnce()) {
            break
        } else {
            back()
            sleep(1 * 500)
        }
    }
}

function LaiFangHistory() {
    var caller=className("android.view.ViewGroup").depth(4).drawingOrder(6).indexInParent(5).findOne();//点击访客列表
    everclick(caller);
    sleep(3000);
    let userNames = []

    let sees = textEndsWith("前看过").find()
    if (sees.length < 1) {
        Log("没有人看过")
        return 1
    }

        for(var i =0;i<sees.length;i++) {
            console.log("1")
            // if (sees[i]) return;
            console.log("2")
            // 用户名去重
            if(sees[i].parent().child(0).text() == "同行" || sees[i].parent().child(0).text() =="同乡"){
                userNameView=sees[i].parent().child(1)
                console.log("当用户与本机同行业或同个老家时第1个子控件将会是同行或同乡而不是用户名")
            }else{
                userNameView=sees[i].parent().child(0)
            };
            console.log(userNameView.text());
            if (userNameView == null) return;
            let userName = userNameView.text()
            toast("Action: " + userName)
            sleep (num/2);
            if (userName!=="无名室友") {
                if(userNames.indexOf(userName) > -1 ){
                console.log("用户名重复")
                return;}
            } else {
                userNames.push(userName)
            }
            console.log("A:点击每个用户名中")
//--------------------------------------------------------------------------------------------
            while(coorYueJie(sees[i])){
                console.log("IN")//debug
                XiaHua();
                sees = textEndsWith("看过").find();
                i=i-1;
                sleep(num/5);
            };
            sees = textEndsWith("看过").find();
            sleep(num/5);
//-------------------------------------------------------------------------------------------lock

            console.log(everclick(sees[i]));/////////
            console.log("此时"+i);
            sleep(num/2);
            console.log("B")

            if (!waitZaiXianLiao()) {
                toast("没有找到在线聊")
                return
            }
            console.log("C")

            while (!everclick(text("在线聊").findOnce()));
            console.log("D")
            sleep(num/2);
            if (!waitLiaoTian()) {
                toast("没有找到EditText or 发送按钮 or 返回按钮")
                return
            }
            console.log("E")
            sleep(num/2);
            
            let times = [];
            var im_time_list=className("android.widget.TextView").depth(3).drawingOrder(1).find();//这个东西可以获取时间和奇怪的通知,不知道为什么时间的id虽然有但是text()无法获取

            for(j=0;j<im_time_list.length;j++){
                time2=(im_time_list[j].text())
                console.log("-----")
                if(time2.length<10){//用10个字符的长度去排除通知,只获取时间
                    times.push(time2);
                }
            };

            var end_time=times.pop();
            if (end_time==null){
                send();//当对面发第1条消息过来,整个页面会没有任何时间
            }else{
                end_time_span(end_time)
            }
            if (!everclick(className("android.widget.RelativeLayout").depth(1).drawingOrder(14).findOne(1000))) {
                everclick(className("android.widget.FrameLayout").depth(1).drawingOrder(14).findOne(1000))
            };
            
            console.log("G")
            sleep(num/2);
            
            if (!id("im_chat_base_title_left_btn").findOne().click()) {
                toast("点击返回失败")
                return
            }
            console.log("Q")
            sleep(num/2);
            
            let userDatas = getTexts()
            console.log("W")

            console.log(userDatas)
            backToLaifangHistory()
            
        }
        while (1) {
            if (!text('我的找室友').exists()) {
                log('返回我的找室友界面成功');
                break;
            } else {
                log('返回我的找室友界面失败  开始重新返回');
                back();
                sleep(3000);
            }
        }
    return 0
}
LaiFangHistory()
toast("已完成打招呼,等待返回刷新或重发帖子");
console.log("打招呼结束");
}
//-------------------------------------------------------------------------------
//-------------------------------------------------------------------------------


//------------------------以上是1.1移植函数

scriptConfig = JSON.parse(scriptConfig);
//脚本开始
var 打招呼次数 = 0;


//清后台
function cleanm() {
    recents();
    sleep(1000);
    for (let i = 0; i< 3; i++) {
        var close = textMatches(/.*(关闭|清除).*/).clickable(true).findOnce();
        if (close!=null) {
            log(close);
            close.click();
            break;
        }
        var clear = clickable(true).idContains('clear').findOnce();
        if (clear!=null) {
            log(clear);
            clear.click();
            break;
        }
        sleep(1500)
    }
    sleep(2000);
}

secrandom = random(600, 1200);


gotoMainActivity();//打开58同城,点击租房,点击找室友
//-------------------------------主循环--------------------------------------------------
while (1) {
    log('进入主循环');
    view_mod.textArrayWait(['找室友', '筛选', '在线聊']);
    循环检测帖子刷新();
    let 头像 = className("android.view.ViewGroup").find();
    log('点击头像');
    coor_mod.clickView(头像[头像.length - 1]);
    view_mod.textArrayWait(['我的找室友', '我的收藏']);
    sleep(2000);
    let 浏览人数 = textMatches(/已有\d+人看过/).findOnce();
    if (浏览人数) {
        log('开始打招呼');
        打招呼();
    }
    let 编辑 = text('编辑').findOnce();
    if (编辑) {
        log('找到了编辑')
        coor_mod.clickText('编辑');
        let 编辑状态 = text('下一步').findOne(10 * 1000);
        if (编辑状态) {
            log('可以编辑')
            编辑帖子();
            //这里开始延迟
            let 延迟时间 = string_mod.randomNumOfSing(刷新延迟, '-');
            toastLog('本次延迟：' + 延迟时间);
            sleep(延迟时间 * 1000);
        } else {
            log('不可以编辑');
            删除帖子();
        }

    } else {
        log('没有找到编辑')
        发布帖子();
        continue
    }

}
//-----------------------------主循环--------------------------------------------------------

function 下滑() {
    swipe(random(300, 600), random((device.height * 0.8), (device.height * 0.7)), random(300, 600), random((device.height * 0.2), (device.height * 0.3)), 1000);
}

function gotoMainActivity() {
    console.verbose('打开58同城');
    app.launch('com.wuba');
    sleep(5000);
    app.launchApp ("58同城");
    view_mod.textArrayWait(['首页','租房']);
    console.verbose('进入首页成功');
    while(!click ("租房"));
    console.verbose('子桐：进入租房中');
    sleep(6000);
    console.verbose('进入租房界面成功');
    while(!click ("找室友"));
    view_mod.textArrayWait(['找室友', '在线聊', '收藏']);
    console.verbose('进入找室友界面成功');
    sleep(2000);
}

function 编辑帖子() {
    view_mod.textArrayWait(['个人信息', '室友要求', '房屋信息', '下一步']);
    sleep(1000);
    XiaHua();
    XiaHua();
    XiaHua();
    view_mod.textArrayWait(['打羽毛球', '看电影', '吃货',]);
    coor_mod.clickText('打羽毛球');
    coor_mod.clickText('看电影');
    coor_mod.clickText('吃货');
    sleep(500);
    coor_mod.clickText('下一步');
    view_mod.textArrayWait(['一个人住', '不吸烟', '不养宠物', '爱干净']);
    sleep(1000);
    coor_mod.clickText('下一步');
    view_mod.textArrayWait(['房东', '租户', '转租者', '立即发布']);
    sleep(1000);
    coor_mod.clickText('立即发布');
    view_mod.textArrayNotExists(['房东', '租户', '转租者', '立即发布']);
    log('发布成功');
    sleep(1000);
}

function 发布帖子() {
    马上发布()

    个人信息()

    室友要求()

    房屋信息()

    function 马上发布() {
        coor_mod.clickText('马上发布');
        view_mod.textArrayWait(['有房找室友', '无房找室友', '选择找室友类别']);
        sleep(2000);
        coor_mod.clickText('有房找室友');
        view_mod.textArrayWait(['个人信息', '室友要求', '房屋信息', '下一步']);
        sleep(2000);
    }

    function 个人信息() {
        coor_mod.clickText('下一步');
        view_mod.textArrayWait(['男女不限', '不养宠物', '爱干净', '作息正常', '工作稳定']);
        sleep(2000);
    }

    function 室友要求() {
        ['男女不限', '不养宠物', '爱干净', '作息正常', '工作稳定'].forEach((textContent) => {
            log('本次需要点击:%s', textContent)
            coor_mod.clickText(textContent);
            sleep(random(500, 2000));
        })

        className('EditText').findOne().setText(scriptConfig.房源配置.室友期待);
        sleep(random(500, 2000));
        coor_mod.clickText('下一步');
        view_mod.textArrayWait(['个人信息', '室友要求', '房屋信息', '房东', '租户', '转租者']);
        sleep(2000);
    }

    function 房屋信息() {
        log('开始下载照片');
        downloadImgs(文件夹名称);
        log('开始上传照片');
        ['房东', '上传照片'].forEach((textContent) => {
            log('本次需要点击:%s', textContent)
            coor_mod.clickText(textContent);
            sleep(random(500, 2000));
        });
        view_mod.textArrayWait(['所有照片', '更换相册']);
        sleep(4000);
        coor_mod.clickText('更换相册');
        text('选择相册').waitFor();
        sleep(2000);
        while (1) {
            let 文件夹 = textContains(getDirName(文件夹名称)).findOne(2000);
            if (文件夹) {
                log('找到了文件夹');
                文件夹.parent().click();
                break;
            } else {
                log('下滑相册列表');
                id("recycler_view").findOne().scrollForward();
                sleep(2000);
            }

        }
        view_mod.textArrayWait(['更换相册', '完成']);
        sleep(2000);
        let _单选组 = id('select_image_click_layout').find();
        for (let i = 1; i < 10; i++) {
            try {
                _单选组[_单选组.length - i].click();
            } catch (_err) {
                log('选择报错:' + _err);
            }
            sleep(random(200, 500));
        }
        toastLog('图片选择完毕');
        coor_mod.clickText('完成');
        while (1) {
            sleep(3000);
            if (text('立即发布').exists()) {
                log('找到了立即发布');
                break
            } else {
                log('没有找到 立即发布');
                coor_mod.clickText('完成');
            }

        }
        log('设置房源标题')
        view_mod.textArrayWait(['房东', '租户', '转租者', '房屋信息']);
        className('EditText').findOne().setText(scriptConfig.房源配置.房源标题);
        sleep(2000);
        log('下滑');
        className("android.widget.ScrollView").findOne().scrollForward();
        log('设置小区名称');
        sleep(2000);
        coor_mod.clickText('小区名称');
        text('取消').waitFor();
        sleep(2000);
        className('EditText').findOne().setText(scriptConfig.房源配置.小区名称);
        while (1) {
            let 小区名称数组 = text(scriptConfig.房源配置.小区名称).find();
            if (小区名称数组.length > 1) {
                toastLog('小区名称加载完成!');
                coor_mod.clickView(小区名称数组[小区名称数组.length - 1]);
                break;
            } else {
                log('等待小区名称加载中');
                sleep(3000);
            }

        }
        view_mod.textArrayWait(['有房找室友', '小区名称', '月租金', '户型', '目前居住情况', '房屋配置']);
        sleep(1000);
        log('设置月租')
        coor_mod.clickText('月租金');
        view_mod.textArrayWait(['请填写月租金', '取消', '确定', '请填写']);
        sleep(1000);
        scriptConfig.房源配置.房源月租.split('').forEach((num) => {
            if (num) {
                coor_mod.clickText(num);
                sleep(random(500, 1500));
            }

        });
        coor_mod.clickText('押一付一');
        sleep(1000);
        coor_mod.clickText('确定');
        view_mod.textArrayNotExists(['确定', '取消'])

        sleep(1000);
        log('设置户型');
        coor_mod.clickText('户型');
        view_mod.textArrayWait(['取消', '确定', '请选择户型']);
        sleep(1000);
        let 坐标组 = [{
            x: text('2室').findOne().bounds().centerX(),
            y: text('2室').findOne().bounds().top
        }, {
            x: text('1厅').findOne().bounds().centerX(),
            y: text('1厅').findOne().bounds().top
        }, {
            x: text('1卫').findOne().bounds().centerX(),
            y: text('1卫').findOne().bounds().top
        }];
        scriptConfig.房源配置.房源户型.split('|').forEach((户型, index) => {
            let xy = text(户型).findOne();
            swipe(xy.bounds().centerX(), xy.bounds().top, 坐标组[index].x, 坐标组[index].y, random(600, 1200));
            sleep(random(1000, 2000));
        });
        coor_mod.clickText('确定');
        view_mod.textArrayNotExists(['确定', '取消'])

        sleep(2000);
        log('目前居住情况');
        sleep(1000);
        coor_mod.clickText('目前居住情况');
        log('点击目前居住情况 成功');
        view_mod.textArrayWait(['取消', '确定']);
        log('找到了 取消 确定');
        // text('当前居住情况').waitFor();
        sleep(3000);
        log('延迟三秒钟');
        坐标组 = [{
            x: text('1男').findOne().bounds().centerX(),
            y: text('1男').findOne().bounds().top
        }, {
            x: text('1女').findOne().bounds().centerX(),
            y: text('1女').findOne().bounds().top
        }];
        scriptConfig.房源配置.居住情况.split('|').forEach((情况, index) => {
            let xy = text(情况).findOne();
            swipe(xy.bounds().centerX(), xy.bounds().top, 坐标组[index].x, 坐标组[index].y, random(600, 1200));
            sleep(random(1000, 2000));
        });
        while (text('当前居住情况').exists()) {
            coor_mod.clickText('确定');
            log('点击 确定啊');
            sleep(3000);
        }
        view_mod.textArrayNotExists(['确定', '取消', '当前居住情况'])

        log('房屋配置');
        coor_mod.clickText('房屋配置');
        view_mod.textArrayWait(['确定', '取消']);
        sleep(3000);
        ['床', '衣柜', '沙发', '桌椅', '空调', '洗衣机', '冰箱', '热水器', '燃气灶', '油烟机', '电磁炉'].forEach((配置) => {
            coor_mod.clickText(配置);
            log('本次点击：' + 配置);
            sleep(random(500, 1000));
        });
        // className("android.widget.TextView").text("家具").findOne().parent().scrollForward()
        let 油烟机 = text('油烟机').findOne();
        let 衣柜 = text('衣柜').findOne();
        swipe(油烟机.bounds().centerX(), 油烟机.bounds().centerY(), 衣柜.bounds().centerX(), 衣柜.bounds().centerY(), random(700, 1000));
        sleep(1500);
        ['宽带', '阳台', '可做饭'].forEach((配置) => {
            coor_mod.clickText(配置);
            log('本次点击：' + 配置);
            sleep(random(500, 1000));
        });
        while (1) {
            if (text('确定').exists() && text('取消').exists()) {
                sleep(1000);
                if (this.确定坐标) {
                    log('有确定坐标');
                    click(this.确定坐标.centerX(), this.确定坐标.centerY());
                } else {
                    log('没有确定坐标');
                    this.确定坐标 = text('确定').findOne().bounds();
                    click(this.确定坐标.centerX(), this.确定坐标.centerY());
                }
                sleep(2000);
            } else {
                break;
            }

        }
        view_mod.textArrayNotExists(['确定', '取消']);
        log('没有找到房屋配置  说明房屋配置已经选好了');
        sleep(2000);
        text('可以补充更多对“房子”的描述(选填)').waitFor();
        log('房子描述');
        text('可以补充更多对“房子”的描述(选填)').findOne().setText(scriptConfig.房源配置.房源描述);
        sleep(random(1000, 2000));
        coor_mod.clickText('立即发布');
        view_mod.textArrayWait(['提交成功', '随便看看']);
        sleep(500);
        coor_mod.clickText("随便看看");
        view_mod.textArrayWait(['找室友', '在线聊']);
        sleep(2000);
        closeCurrentPackage();//重启58
        gotoMainActivity;//回到找室友页面
    }

}

function 删除帖子() {
    view_mod.textArrayWait(['删除', '编辑', '我的收藏']);
    log('点击删除');
    coor_mod.clickText('删除');
    view_mod.textArrayWait(['删除帖子原因', '已找到室友', '写错了', '取消']);
    sleep(1000);
    coor_mod.clickText('写错了');
    view_mod.textArrayNotExists(['删除帖子原因', '已找到室友', '写错了', '取消']);
    sleep(1000);
    while (1) {
        if (text('在线聊').exists() && text('找室友').exists()) {
            log('回到了找室友界面');
            break;
        } else {
            back();
            sleep(3000);
        }

    }

}

function downloadImgs(fName) {
    let deviceDirName = '/sdcard/' + getDirName(fName) + '/'
    let hostDirName = fName

    //新建本地文件夹
    if (!files.isDir(deviceDirName)) {
        if (files.create(deviceDirName)) {
            // log('创建本地文件夹成功');
        }

    }
    //下载服务器图片
    for (let i = 1; i < 10; i++) {
        let imgLink = hostDirName + i + '.JPG'
        let imgPath = deviceDirName + i + '.jpg'
        if (files.isFile(imgPath)) {
            // log('已存在第%d张图片', i)
            continue
        }
        // log(imgLink)
        try {
            let _res = http.get(imgLink)
            if (_res.statusCode != 200) {
                log('请求接口失败！')
                exit()
            }
            files.writeBytes(imgPath, _res.body.bytes())
            log('第%d张图片下载成功', i);
            media.scanFile(imgPath)
        } catch (_err) {
            log('下载服务器图片报错:' + _err)
        }

    }

}

function getDirName(_link) {
    let _path = _link.replace(/http:\/\/lansu.8-0000.com\//g, '');
    _path = _path.replace(/\//g, '');
    return _path;
}