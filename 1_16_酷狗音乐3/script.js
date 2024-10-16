/*
 * @Author: BanHua
 * @Date: 2021-01-16 16:07:04
 * @LastEditors: BanHua
 * @LastEditTime: 2021-01-20 23:51:42
 * @Description: file content
 */

console.show();
main();

function main () {
    //字符串分割为数字函数
    this.Fn_n_RandomStrToNum = function ($s_str_0) {
        //以str_1分割，取一个随机数
        let str_1 = $s_str_0.replace(/\d/g, '');
        switch (typeof($s_str_0)) {
            case 'number':
                return $s_str_0
            case 'string':
                if ($s_str_0.indexOf(str_1) > -1) {
                    num_min = $s_str_0.split(str_1)[0]
                    num_max = $s_str_0.split(str_1)[1]
                    return random(Number(num_min), Number(num_max))
                } else {
                    return Number($s_str_0)
                }
            default:
                return 0;
        }
    }

    //数组随机取一个范围
    this.Fn_n_NumberToRundomNum = function ($n_num, $n_num2) {
        $n_num = Number($n_num),$n_num2 = $n_num2 || 10;
        return random($n_num - $n_num2 / 2, $n_num + $n_num2 / 2);
    }

    /**
     * 下滑函数
     */
    this.Fn_v_SwipeDown = function () {
        let x1 = this.Fn_n_NumberToRundomNum (device.width / 2, 50);
        let y1 = this.Fn_n_NumberToRundomNum (device.height * 0.75, 50);
        let x2 = this.Fn_n_NumberToRundomNum (device.width / 2, 50);
        let y2 = this.Fn_n_NumberToRundomNum (device.width * 0.25, 50);
        let r1 = random(600, 1200);
        device.sdkInt > 23 ? swipe(x1, y1, x2, y2, r1) : shell("input swipe "+x1+" "+y1+" "+x2+" "+y2+" "+r1, true);
    }

    /**
     * 上滑
     */
    this.Fn_v_SwipeUp = function () {
        let x1 = this.Fn_n_NumberToRundomNum (device.width / 2, 50);
        let y1 = this.Fn_n_NumberToRundomNum (device.width * 0.25, 50);
        let x2 = this.Fn_n_NumberToRundomNum (device.width / 2, 50);
        let y2 = this.Fn_n_NumberToRundomNum (device.height * 0.75, 50);
        let r1 = random(600, 1200);
        device.sdkInt > 23 ? swipe(x1, y1, x2, y2, r1) : shell("input swipe "+x1+" "+y1+" "+x2+" "+y2+" "+r1, true);
    }

    /**
     * 
     * @param {公会名称} s_GHname 
     */
    this.返回公会 = function (s_GHname) {
        while (!desc(s_GHname).exists()) {
            back();
            sleep(2000);
        }
    }
    
    /**
     * 
     * @param {操作次数} n_oper 
     */
    this.访问主页 = function (n_oper) {
        //定义操作次数
        n_oper = n_oper || 30;
    
        //定义已操作次数
        let n_oper_i = 0;
        let a_userData = [];
        text("7天").waitFor();
        text('本场').waitFor();
        sleep(3*1000);
        while (1) {
            log("----while----");
            let o_list = id('ca7').find();
            if (o_list.length == 0) {
                console.log("没有人给主播送礼物！");
                break;
            }
    
            // if (text("还没有人给主播送礼物\n赶紧给主播送礼占领榜单吧").exists()) {
            //     console.log("没有人给主播送礼物！");
            //     break;
            // }
            o_list = o_list[o_list.length - 1];
            
            try {
                o_list.children().forEach((o_view, n_index) => {
                    log("----forEach---开始");
                    if (o_view) {
                        let s_userName = o_view.findOne(id("de3"));
                        if (!s_userName) {
                            console.error('s_userName-->>', s_userName)
                            return false;
                        }
                        
                        console.info("已操作【%d】次！", n_oper_i);
                        
                        if (n_oper_i >= n_oper) {
                            console.info("操作完成！");
                            // return false;
                            throw "操作完成！！！";
                        }
        
                        //开始判断是否重复
                        if (a_userData.indexOf(s_userName.text()) > -1) {
                            console.warn('重复，跳过该用户！');
                            return false;
                        }
                        a_userData.push(s_userName.text());
                        console.info("本次对【%s】用户进行操作！", s_userName.text());
                        
                        let n_clickNum = 0;
                        do {
                            console.info("开始进入【%s】的主页", s_userName.text());
                            s_userName.parent().parent().click();
                            sleep(1000);
                            n_clickNum++;
                            if (n_clickNum > 3) {
                                console.warn("【%s】是神秘嘉宾", s_userName.text());
                                return false;
                            }
                        } while (!text("资料").exists() || !text("动态").exists());
                        console.verbose("进入主页成功");
                        sleep(2000);
                        n_oper_i++;
                        do {
                            console.info("点击返回");
                            if (text("资料").exists() || text('动态').exists()) {
                                back();
                            }
                            sleep(1000);
                        } while (!text("7天").exists() && !text("本场").exists());
                    }
                });
            } catch (_err) {
                console.error("_err"+_err);
            }

            if (n_oper_i >= n_oper) {
                console.info("操作完成！");
                break;
            }
            
            console.warn('forEach循环完毕！开始下滑!');
            
            if (!o_list.scrollForward()) {
                console.warn("下滑到底了！");
                break;
            }
            console.info("延迟三秒钟！");
            sleep(3 * 1000);
        }
    }
    
    this.兼容函数 = function () {
        while (1) {
            if (text('fx_icon_H5-close-w_68x68@3x_eca8c7').exists()) {
                log("活动弹窗");
                text('fx_icon_H5-close-w_68x68@3x_eca8c7').findOne().click();
                sleep(1000);
            } else if (text('+关注').exists()) {
                sleep(5 * 1000);
                if (text('+关注').exists()) {
                    back();
                }
            } else if (text('开启宝箱').exists()) {
                log('开启宝箱！');
                back();
                sleep(1000);
            } else if (id('ajt').exists()) {
                log("一元活动");
                id('ajt').findOne().click();
            } else if (text("直播已结束").exists()) {
                log("兼容：直播已结束");
                back();
            } else if (text("重新加载").exists()) {
                back();
            } else if (text('该用户已被封禁').exists()) {
                sleep(5*1000);
                click('确定');
            } else if (text('酷狗直播').exists() || text('酷狗安全验证').exists()) {
                back();
                log("酷狗直播||酷狗安全验证");
                sleep(2000);
            } else if (id('d8h').exists()) {
                back();
                log("d8h");
                sleep(2000);
            }
        }
    }
    
    //定义脚本架构
    return (function(){
        //读取脚本变量
        let st =  storages.create("KuGou3");
        let 操作次数 = st.get("viewDataArr")["bh_czcs"] || 30;
        let 主播数组 = [];
        console.info("操作次数%s", 操作次数);
        //定义脚本局部变量
        console.info("定义循环变量:%s", b_loop = true);
        console.info("定义已操作次数:%d", n_oper = 0);
        
        threads.start(兼容函数);
        while (b_loop) {
            
            console.verbose(">>>>b_loop循环开始>>>>");

            let o_list = className("android.widget.ScrollView").findOne();
            console.log("找到了-->>ScrollView");
            let s_公会名称 = o_list.parent().child(0).child(0).desc();
            if (!s_公会名称) {
                console.error("没有找到公会名称");
                exit();
            }
            console.info("公会名称：%s", s_公会名称);
            //开始遍历子控件
            o_list.children().forEach(($o_view, $n_index) => {
                let o_GongHuiZhuBo = desc('公会主播').findOne(1 * 1000);
                if (o_GongHuiZhuBo) {
                    console.verbose("找到了-->>公会主播");
                    if ($n_index <= o_GongHuiZhuBo.indexInParent()) {
                        return false;
                    } else {
                        log("$n_index大于公会主播index位置!");
                    }
                } else {
                    console.verbose("没有找到-->>公会主播");
                }

                if (主播数组.indexOf($o_view.desc()) > -1) {
                    log("主播重复了");
                    return false;
                }

                console.info("准备对%s主播进行操作!", $o_view.desc());
                主播数组.push($o_view.desc());
                //定义并初始化粉丝控件
                let o_b5l = null, o_暂未开播 = null, o_直播已结束 = null, o_封禁 = null;
                let _判断变量 = true;
                while (1) {
                    o_b5l = id("b5l").findOnce();
                    o_暂未开播 = text('暂未开播').findOnce();
                    o_正在直播 = text('正在直播').findOnce();
                    o_封禁 = text('该用户已被封禁').findOnce();
                    o_直播已结束 = text('直播已结束').findOnce();
                    _酷狗安全验证 = text("酷狗安全验证").findOnce();
                    _酷狗音乐 = text("酷狗音乐").findOnce();
                    if (o_b5l) {
                        log("找到了b5l");
                        sleep(5*1000);
                        if (id("b5l").exists()) {
                            log("五秒后b5l还在");
                            _判断变量 = true;
                            break;
                        }
                    } else if (o_暂未开播 || o_正在直播) {
                        console.verbose("暂未开播");
                        _判断变量 = true;
                        id('g6r').findOne().parent().click();
                        
                    } else if (o_直播已结束) {
                        console.verbose("直播已结束");
                        back();
                        _判断变量 = false;
                        break;
                    } else if (o_封禁) {
                        _判断变量 = false;
                        log("该用户已被封禁");
                        click("确定");
                        break;
                    } else if (_酷狗安全验证 || _酷狗音乐) {
                        log("酷狗安全验证！！");
                        back();
                        sleep(2000);
                    } else {
                        console.verbose("点击主播");
                        $o_view.click();
                    }
                    sleep(2000);
                }
                sleep(2000);

                if (_判断变量) {
                    console.verbose("进入直播界面成功！");
                
                    let o_贡献榜 = null;
                    while (1) {
                        o_贡献榜 = text("贡献榜").findOnce();
                        if (o_贡献榜) {
                            break;
                        } else {
                            o_b5l.click();
                            sleep(1000);
                        }
                    }
    
                    console.verbose("打开粉丝榜成功!");
                    sleep(3000);
                    click("贡献榜");
                    sleep(3000);
    
                    click("7天");
                    sleep(3000);
                    访问主页(操作次数);
                }
                返回公会(s_公会名称);
            });

            //开始下滑
            if (!o_list.scrollForward()) {
                console.error("下滑失败！主播弄完了");
                return;
            }

            sleep(3000);
            
            console.verbose("----b_loop循环结束----");
        }
    })();
}

