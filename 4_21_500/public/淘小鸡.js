//初始化变量
// console.hide()
// console.setSize(device.width*0.7, device.height /5);
// console.show()
购买延迟 = 1000
抽奖延迟 = 5000
看视频时间 = 25*1000
结束标志 = false
launch('com.lajiang.quanminyangji')
sleep(8 * 1000)
兼容线程 = threads.start(function(){
    try {
        分红鸡结束标志=false
        视频领取标志=false
        转盘结束标志=false
        while (!结束标志) {
            log("|开始兼容线程")
            sleep(random(3,5)*1000)
            ad_catch = className("ImageView").depth(5).clickable().findOnce()
            if(ad_catch){
                log("|处理异常视频")
                ad_catch.click()
                sleep(10*1000)
                // continue
            }
            if(text("恭喜获得").exists()){
                log("|恭喜获得");
                if(text("领取").exists()){click("领取")}
                if(text("收下").exists()){click("收下")}
            }
            if (text('新的小鸡').exists()) {log("|新的小鸡");click('去抽奖')}
            if(text("双倍领取").exists()){log("|双倍领取");看视频()}
            if(textContains("抽分红鸡").exists()){
                log("|抽分红鸡")
                if(text('抽奖次数：0').exists()){                   
                    id_click("img_close");
                    分红鸡结束标志 = true
                    log("分红鸡结束标志", 分红鸡结束标志)
                    // continue
                }else{
                    click("开始抽奖")
                    sleep(抽奖延迟)
                    // continue                          
                }   
            }
            if(id("tv_todayTurnNum").exists()){
                抽奖次数 = Number(id_txt("tv_todayTurnNum"))
                if (抽奖次数 > 0) {
                    log("|转盘抽奖")
                    id_click("img_start")
                    sleep(抽奖延迟)
                    if (text("恭喜获得").exists()) {
                        if (text("领取").exists()) { click("领取") }
                        if (text("收下").exists()) { click("收下") }
                    }
                } else {
                    id_click("img_close")
                }
                // continue
            }
            if(text("金币不足").exists()){
                log("|金币不足")
                if(text("每天20/24点重置视频次数（剩余0次）").exists()){
                    视频领取标志 = true
                    log("视频领取标志", 视频领取标志)
                    id_click("ll_close")
                    // continue
                }
            }
            if(id("layout_adv").exists()){id_click("ll_close")}
            if(id("tv_dividMoney").exists()){log("|获得红包");id_click("img_confirm");}
            if(id("layout_adv").exists()){}
            if(id_txt("tv_coin")=="0k"){back()}
            结束标志 = 分红鸡结束标志&& 视频领取标志
        }
    } catch (err) {
        log(err)
    }
})
幸运转盘()
while (!结束标志) {
    try {
        运行标志 = id("ll_buy_xiaoji").findOnce()
        if(运行标志){
            合成返回值 = 合成()
            回收()
            购买(12 - 合成返回值)
            领取金币()
            抽分红鸡()
            开启分红鸡()
 
        }else{
            sleep(10*1000)
        }    
    } catch (err) {
        log(err)
    }finally{
        log("-----------------")
    }

    // if (!购买(12 - 合成返回值)) {
    //     看视频()
    // }
}

//>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>函数库>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>

function taps (x, y) {
    try {
        loop:
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
    } catch (err) {
      log("err")  
    } finally{
        log("done:taps")
    }
}


function 合成 () {
    toastLog("开始合成")
    try {
        loop:
        while (1) {
            等级控件组 = id('tv_level').depth(10).find()
            等级控件数 = 等级控件组.length
            log('一共找到%d个等级控件', 等级控件数)
    
            if (等级控件数 > 1) {
                // try {
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
                                                _a_x = view.bounds().centerX()
                                                _a_y = view.bounds().centerY()
                            
                                                _b_x = arr[i].bounds().centerX()
                                                _b_y = arr[i].bounds().centerY()
                            
                                                log('第一个控件的坐标为%d，%d\n第二个控件的坐标为%d，%d', _a_x, _a_y, _b_x, _b_y)
                                                log('开始拖到一起去')
                            
                                                gesture(400, [_a_x, _a_y], [_b_x, _b_y])
                                                sleep(1000)
                                                log('拖动完成')
                                                arr[index] = 0
                                                arr[i] = 0
                                                log("ending");
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
                // } catch (err) {
        
                // }
        
            }else{
                log("等待...")
                sleep(10*1000)
            }
        }    
    } catch (err) {
        log(err)
        
    }
}

function 购买(购买次数) {
    toastLog("购买")
    log('开始购买函数,要购买%d次', 购买次数)
    try {
        // 可购买次数=可购买()
        // if(可购买次数>=0){
        //     log("可购买%d",可购买次数)
        //     购买次数=可购买次数;
        // }
        for (let i = 0; i < 购买次数; i++) {
            log('第%d次购买', i)
            购买按钮 = id('ll_buy_xiaoji').findOnce()
            if (购买按钮) {
                购买按钮.click()
                sleep(购买延迟)
                if(id("tv_tips").exists()&&id_txt("tv_tips")!="每天20/24点重置视频次数（剩余0次）"){
                    看视频()
                }
                // if(text("金币不足").exists()){break}
            }    
        }   
    } catch (err) {
        log(err)      
    }finally{
        log("done:购买")
    }
}

function 看视频() {
    toastLog("看视频")
    try {
        if (!视频领取标志) {
            _t = text('看视频领取').findOnce()
            if (!_t) { _t = text('双倍领取').findOnce() }
            if (!_t) {
                return null
            }

            console.log('点击看视频领取')
            _t.parent().click()
            sleep(看视频时间)
            while (1) {
                _t = id('tt_video_ad_close_layout').findOnce()
                if (_t) {
                    if (_t.click()) {
                        break
                    }
                }
                _t_2 = className("ImageView").depth(5).clickable().findOnce()
                if (_t_2) { _t_2.click(); break }
                sleep(1000)
            }

            while (!text('恭喜获得').exists());
            click('领取')
            // return true 
        }
    } catch (err) {
        log(err)
    } finally {
        log("done:看视频")
    }
}



function 领取金币() {
    toastLog("领取金币")
    try {
        if(text("可领取").exists()){
            id_click("ll_zhengdian_jinbi")
            if(text("整点金币").exists()){
                while(!text("领取").click()){}
            }
            if(text("恭喜获得").exists()){
                text("领取").click()
            } 
        }     
    } catch (err) {
        log(err)    
    }finally{
        log("done:领取金币")
    }

}

function 抽分红鸡() {
    toastLog("抽分红鸡")
    try {
        if (!分红鸡结束标志){
            if(id_click("img_chou_fenhongji")){
                // sleep(random(3,5)*1000)
                开始抽奖=id("tv_start_choujiang").findOnce()
                if(id_click("tv_start_choujiang")){
                    抽奖次数 = Number(id_txt("tv_todayTurnNum"))
                    if(抽奖次数 != 0){
                        click("开始抽奖")
                        sleep(抽奖延迟)
                        if(text("恭喜获得").exists()){
                            if(text("领取").exists()){click("领取")}
                            if(text("收下").exists()){click("收下")}
                        }
                    }   
                }
                id_click("img_close")
            }      
        }
 
    } catch (err) {
        log(err)    
    }finally{
        log("done:抽分红鸡")
    }
}
function 开启分红鸡() {
    toastLog(("开启分红鸡"))
    try {
        id_click("img_kaiqi")   
    } catch (err) {
        log(err)    
    }finally{
        log("done:开启分红鸡")
    }   
}

function 幸运转盘() {
    toastLog("幸运转盘")
    try {转盘:
        if (id_click("img_zhuanpan_red_dot")) {
            sleep(random(5,8)*1000)
            抽奖次数 = Number(id_txt("tv_todayTurnNum"))
            if (抽奖次数) {
                while (抽奖次数 != "0") {
                    id_click("img_start")
                    sleep(random(5, 10) * 1000)
                    id_click("ll_close")
                    click("领取")
                }
            }
        } else {
            toastLog("幸运转盘次数已用完")
        }    
    } catch (err) {
        log(err)    
    }finally{
        log("done:幸运转盘")
    }



}

function 回收() {
    toastLog("回收")
    try {
        等级控件组 = id('tv_level').depth(10).find()
        chick_level = id('tv_kegoumai_chick_level').findOnce()
        回收位置 = id("ll_buy_xiaoji").findOnce()
        if(等级控件组&&chick_level){
            _a_x = 回收位置.bounds().centerX()
            _a_y = 回收位置.bounds().centerY()
            等级控件组.forEach(e => {
                if (Number(e.text()) < Number(chick_level.text())-2){
                    log(e.text(),chick_level.text())
                    _b_x = e.bounds().centerX()
                    _b_y = e.bounds().centerY()
                    gesture(600, [_b_x, _b_y],[_a_x, _a_y])
                    sleep(1000)
                    if(text("出售").findOnce()){   
                        click("出售")
                        log('回收完成')   
                    }
                }            
            });
            log('未发现发育迟缓的小鸡')
        }    
    } catch (err) {
        log(err)    
    }finally{
        log("done:回收")
    }
    
}

function 可购买() {
    当前价格 = id_txt("tv_kegoumai_chick_coin")
    当前金币 = id_txt("tv_total_coin")
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
        }
        switch (金币单位) {
            case "k":
                if(价格单位=="m"){
                    可购买次数=0
                }
                if(价格单位=="k"){
                    可购买次数=parseInt(当前金币/当前价格)
                }             
                break;
            case "m":
                if(价格单位=="b"){
                    可购买次数=0
                }
                if(价格单位=="m"){
                    可购买次数=parseInt(当前金币/当前价格)
                }
                break                 
            default:
                可购买次数=parseInt(当前金币/当前价格)
                break;
        }
        return 可购买次数
    }else{
        return false
    }
}

function id_click(_id) {
    try {
        id_temp = id(_id).findOne(3 * 1000)
        if (id_temp) {
            log(_id + " = true")
            if (id_temp.clickable()) {
                if (id_temp.click()) {
                    log(_id + ".click() = true")
                    return true
                } else {
                    log(_id + ".click() = false")
                    return false
                }
            } else {
                _a_x = id_temp.bounds().centerX()
                _a_y = id_temp.bounds().centerY()
                click(_a_x, _a_y)
                log("click(" + _id + ") = false")
            }

        } else {
            log(_id + " = false")
            return false
        }
        log("done:%s click", _id)
    } catch (err) {
        log(err)

    }

}

function id_txt(_id){
    try {
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
    } catch (err) {
        log(err)       
    }
}
