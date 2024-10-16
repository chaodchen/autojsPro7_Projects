//初始化变量
console.show()
console.setSize(device.width*0.7, device.height*0.3);
console.setPosition(device.width*0.3/2, 15);
购买延迟 = 0
抽奖延迟 = 5000
看视频时间 = 25*1000
结束标志 = false
launch('com.jiaen.rensheng')
sleep(15* 1000)
购买等级 = 1
错误次数 = 0
兼容线程 = threads.start(function(){
    while (!结束标志) {
        异常标志 = false
        if(id("iv_close").exists()){
            log("开始处理异常")
            异常标志 = true
            if(text("金币不足").exists()){
                if (textContains('剩余0次').exists()) {
                    id_click("iv_close");
                    结束标志 = true
                    log("结束标志",结束标志)
                    continue
                }
                if (textContains("看视频领取").exists()) {看视频();continue}
            }
            if(textContains("离线收益").exists()){id_click("iv_close")}
            if(text("看视频翻倍").exists()){click("看视频翻倍")}
            if (text("现金红包").exists()) {id_click("btn_action");id_click("iv_close")}
            if(text("确定").exists()){click("确定")}
            sleep(3000)
        }
        if(id("tt_video_ad_close_layout").exists()){
            异常标志 = true
            log("开始处理视频异常")
            // id_click('tt_video_ad_close')
            // // sleep(3000)
            id_click("tt_video_ad_close_layout")
        }
        if(id("btn_close").exists()){
            if(textContains('恭喜').exists()){click("确定")}
            if(id_txt("tv_coupon")=="X0"){id_click("btn_close")}
        }
        if(text("确定").exists()){click("确定")}
        if(text("拒绝").exists()){click("拒绝")}
    }
    兼容线程.interrupt();
})

//转盘

// 领取金币()
转盘()
while (!结束标志) {
    合成返回值 = 合成()
    领取金币()
    回收()
    购买(12 - 合成返回值)
    // if (!购买(12 - 合成返回值)) {
    //     toastLog('开始看视频')
    //     看视频()
    // }
    sleep(3000)
}
toastLog("脚本运行完毕")

//>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>函数库>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>

function taps (x, y) {
    if (device.sdkInt > 23) {
        click(x, y)
    } else {
        _sh = shell('input tap '+x+' '+y)
        if (_sh.code != 0) {
            console.verbose('shell点击失败')
            taps(x, y)
            sleep(3000)
        }
    }
}


function 合成 () {
    var 标记坐标 = {
        x:'',
        y:''
    }
    loop:
    while (1) {
        等级控件组 = id('tv_level').depth(12).find()
        等级控件数 = 等级控件组.length
        log('一共找到%d个等级控件', 等级控件数)

        if (等级控件数 > 1) {
            try {
                //用一个变量判断是否全部合成完了
                var 判断 = true
                等级控件组.forEach((view, index, arr) => {
    
                    if (view != 0) {
                        _view_text = view.text()
                        if (_view_text) {
                
                            log('当前控件文本：'+_view_text)
                            for (let i = 0; i < arr.length; i++) {
                
                                if (arr[i] != 0) {
                                    if (i != index) {
                                        if (_view_text == arr[i].text()) {
                                            判断 = false
                                            log('第%d个控件跟第%d个控件匹配到了', (index+1), (i+1))
                                            _a_x = view.bounds().centerX() - 30 + random(0, 20)
                                            _a_y = view.bounds().centerY() - 30 + random(0, 20)
                        
                                            _b_x = arr[i].bounds().centerX() - 30 + random(0, 20)
                                            _b_y = arr[i].bounds().centerY() - 30 + random(0, 20)

                                            log('第一个控件的坐标为%d，%d\n第二个控件的坐标为%d，%d', _a_x, _a_y, _b_x, _b_y)
                                            log('开始拖到一起去')                 
                                            gesture(400, [_a_x, _a_y], [_b_x, _b_y])
                                            sleep(1000)
                                            log('拖动完成')
                                            arr[index] = 0
                                            arr[i] = 0
                                            throw new Error("ending");
                                        }
                                    }
                                }
                            }
                        }
                    }
                })
                log('forEach 结束')
                if (判断) {
                    log('全部合成完毕')
                    return 等级控件数
                }
            } catch (err) {
    
            }
        }
        if (等级控件数==1){
            购买(1)  
        }
        if(等级控件数==0){
            // if(异常标志){}
            if(错误次数<6){
                sleep(10*1000)
                toastLog("休息10秒钟")
                错误次数++
            }else{
                log("错误次数",错误次数)
                back()
                // id_click("iv_close")
                // id_click("btn_close")
                错误次数=0
            }        
        }
    }
}

function 购买(购买次数) {
    log('开始购买函数,要购买%d次', 购买次数)
    //新建一个判断金币不足的线程
    var 判断金币 = true
    _threads = threads.start(function(){
        while (1) {
            if (text('金币不足').exists()) {
                log('金币不足')
                判断金币 = false
                break
            }
            if(!判断金币){
                break
            }else{
                continue
            }    
        }
    })
    可购买次数=可购买()
    if(可购买次数){
        log("可购买%d",可购买次数)
        if (可购买次数<购买次数){
            购买次数=可购买次数+1
        }
    }
    for (let i = 0; i < 购买次数; i++) {
        toast('第'+(i+1)+'次购买')
        // 购买按钮 = id('iv_suggest').findOnce()
        购买按钮 = id('btn_buy').findOnce()
        if (购买按钮&&判断金币) {
            购买按钮.click()
            // taps(购买按钮.bounds().centerX(), 购买按钮.bounds().centerY())
            sleep(购买延迟)
        }

    }
    if (_threads.isAlive()) {
        _threads.interrupt()
    }

    return 判断金币

}

function 看视频 () {
    _t = id('btn_action').findOnce()
    if (!_t) {
        return null
    }

    console.log('点击看视频领取')
    _t.click()
    sleep(看视频时间)
    // id_click('tt_video_ad_close')
    // // sleep(3000)
    id_click('tt_video_ad_close_layout')
    //tt_video_ad_close
    // com.bytedance.sdk.openadsdk.activity.TTRewardExpressVideoActivity
    log('刷视频完成')
    // click('领取')
    return true
}

function 转盘() {
    if(id_click("tv_lottery")){
        转盘券 = id_txt("tv_coupon")
        toastLog("转盘券"+转盘券)
        while(转盘券!="X0"){
            if(id_click("btn_start")){
                while(!id_txt("btn_action")){}
                gold_add = id_txt("tv_gold")
                if (gold_add) {
                    toastLog("领取金币"+gold_add)
                }
                if(text("看视频领取").exists()){
                    id_click("iv_close")
                }
                id_click("btn_action")        
            }
            转盘券 = id_txt("tv_coupon")
            toastLog("转盘券"+转盘券)     
        }
        sleep(1000)
        id_click("btn_close")
    }
    toastLog("转盘活动领取结束")
}

function 领取金币() {
    if (id_txt("tv_countdown") == "领取") {
        if (id_click("ll_get_freecoin")) {
            gold_add = id_txt("tv_gold")
            if (gold_add) {
                toastLog("领取金币", gold_add)
            }
            id_click("btn_action")
        }
    }else{
        log("下次领取还有"+id_txt("tv_countdown"))
    }
    toastLog("领取金币结束")
}

function 回收() {
    回收位置 = id("tv_price").findOnce()
    购买猫= id('tv_level').depth(10).findOnce()
    回收猫控件组 = id('tv_level').depth(12).find()
    if(回收位置&&购买猫&&回收猫控件组){
        _p_x = 购买猫.bounds().left
        _p_y = 回收位置.bounds().top
        log(_p_x,_p_y)
        购买猫等级=Number(购买猫.text())-1
        回收猫= text(购买猫等级).findOnce()
        回收猫控件组.forEach(e => {
            if (Number(e.text()) < 购买猫等级){
                log(e.text(),购买猫等级)
                _c_x = e.bounds().centerX()
                _c_y = e.bounds().centerY()
                gesture(700, [_c_x, _c_y],[_p_x, _p_y])
                sleep(3000)
                if(text("回收").findOnce()){   
                    id_click("btn_action")
                    log('销毁完成')   
                }
                return true
            }            
        });   
    }
    toastLog('未发现发育迟缓的猫')

}

function 可购买() {
    当前价格 = id_txt("tv_price")
    当前金币 = id_txt("tv_gold_icon")
    if(当前价格&&当前金币){
        log(当前价格,当前金币)
        金币单位=当前金币.substr(-1)
        价格单位=当前价格.substr(-1)
        当前金币=parseInt(当前金币)
        当前价格=parseInt(当前价格)
        // log(价格单位,金币单位)
        if (金币单位==价格单位){
            可购买次数=parseInt(当前金币/当前价格)
            return 可购买次数
            // if (可购买次数<购买次数){
            //     购买次数=可购买次数+1
            // }  
        }else{
            log("金币单位不一致")
            return false
        }   
    }else{
        return false
    }
    
}


function id_click(_id){
    id_temp=id(_id).findOnce()
    if (id_temp) {
        log(_id+" = true")
        if(id_temp.click()){
            log(_id+".click() = true")
            return true
        }else{
            log(_id+".click() = false")
            return false  
        }
    }else{
        log(_id+" = false")
        return false
    }
}

function id_txt(_id){
    id_temp=id(_id).findOnce()
    if(id_temp){
        log(_id+" = true")
        id_temp_txt = id_temp.text()
        log(id_temp_txt)
        return id_temp_txt
    }else{
        log(_id+" = false")
        return false
    }
}

