"ui";

//设置脚本主题颜色
var color = '#DDC700'

var version = 'test 0.2'

var add = '游戏版本：xxx.xx\nAndroid版本：6.0+'

var storage = storages.create('3_18_300')

ui.layout(
    <drawer id="drawer">
        <vertical>
            <appbar id='appbar' bg='{{this.color}}'>
                <toolbar id="toolbar" title='异世界OL_{{this.version}}'/>
            </appbar>
            <viewpager id="viewpager">
                <frame>
                    <vertical>

                        <horizontal gravity='center_vertical'>
                            <text text='' margin='5dp' bg='{{this.color}}' w='8dp' h='35dp'></text>
                            <text text='软件权限' textSize='16sp' textColor='{{this.color}}'></text>
                        </horizontal>
                        <card cardCornerRadius='5dp' margin='5dp' cardElevation='5dp'>
                            <vertical bg='#ffffff' margin='5dp'>
                                <Switch id="autoService" text="无障碍服务" checked="{{auto.service != null}}" padding="8 8 8 8" textSize="15sp"/>
                                <Switch id="windowService" text="悬浮窗服务" checked="{{floaty.checkPermission()}}" padding="8 8 8 8"textSize="15sp"/>
                            </vertical>
                        </card>

                        <horizontal gravity='center_vertical'>
                            <text text='' margin='5dp' bg='{{this.color}}' w='8dp' h='35dp'></text>
                            <text text='必读公告' textSize='16sp' textColor='{{this.color}}'></text>
                        </horizontal>
                        <card cardCornerRadius='5dp' margin='5dp' cardElevation='5dp'>
                            <text padding='10dp' text='{{this.add}}'></text>
                        </card>

                        <horizontal gravity='center_vertical'>
                            <text text='' margin='5dp' bg='{{this.color}}' w='8dp' h='35dp'></text>
                            <text text='脚本配置' textSize='16sp' textColor='{{this.color}}'></text>
                        </horizontal>
                        <ScrollView>
                            <vertical bg='#ffffff'>
                                <card cardCornerRadius='5dp' margin='5dp' cardElevation='5dp'>
                                    <vertical>

                                        <button margin='10dp' id='start' bg='{{this.color}}' textColor='#ffffff' textSize='16sp' text='开始运行'></button>
                                        <button margin='10dp' id='rizhi' bg='{{this.color}}' textColor='#ffffff' textSize='16sp' text='复制日志'></button>

                                    </vertical>
                                </card>
                            </vertical>
                        </ScrollView>
                    </vertical>
                </frame>
            </viewpager>
        </vertical>
    </drawer>
);
/*
if (storage.contains('config')) {
    storage.get("inputViewArray").forEach((_res, _index) => {
        if (_res != null || _res != '') {
            _id = 'input_' + _index
            ui[_id].setText(_res)
        }
    })
}
*/
//设置日志路径
console.setGlobalLogConfig({
    "file": "/sdcard/rizhi.txt"
});

//设置状态栏的颜色
ui.statusBarColor(color)

//当用户回到本界面时，resume事件会被触发
ui.emitter.on("resume", function () {
    // 此时根据无障碍服务的开启情况，同步开关的状态
    ui.autoService.checked = auto.service != null;
    ui.windowService.checked = floaty.checkPermission()
})

//+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

//用户勾选无障碍服务的选项时，跳转到页面让用户去开启
ui.autoService.on("check", (checked) => {
    if (checked && auto.service == null) {
        app.startActivity({
            action: "android.settings.ACCESSIBILITY_SETTINGS"
        });
    }
    if (!checked && auto.service != null) {
        auto.service.disableSelf();
    }
})

//悬浮窗按钮单击事件
ui.windowService.on('check', (checked) => {
    if (checked && !floaty.checkPermission() && device.sdkInt > 23) {
        log('打开悬浮窗权限')
        var intent = new Intent();
        intent.setAction("android.settings.action.MANAGE_OVERLAY_PERMISSION")
        app.startActivity(intent);
        toast('选择此软件')
    }
})

//日志
ui.rizhi.on('click', () => {
    threads.start(function(){
        setClip(files.read('/sdcard/rizhi.txt'))
        toastLog('复制成功')
    })
})

//用户开始事件
ui.start.on('click', () => {

    //保存脚本配置
    log('保存脚本配置')/*
    preservationConfigThreads = threads.start(function () {
        var viewObj = {
            inputViewArray:[]
        }

        className('android.widget.EditText').find().forEach((t) => {
            viewObj.inputViewArray.push(t.text())
        })

        storage.put('config', viewObj)
        log('脚本配置保存完成')


    })*/

    windowThreads = threads.start(function(){

        //开始显示悬浮窗
        //悬浮窗logo
        importClass(java.lang.Runnable);
        importClass(android.animation.ObjectAnimator)
        importClass(android.animation.PropertyValuesHolder)
        importClass(android.animation.ValueAnimator)
        importClass(android.animation.AnimatorSet)
        importClass(android.view.animation.AccelerateInterpolator)
        importClass(android.view.animation.TranslateAnimation)
        importClass(android.animation.ObjectAnimator)
        importClass(android.animation.TimeInterpolator)
        importClass(android.os.Bundle)
        importClass(android.view.View)
        importClass(android.view.Window)

        importClass(android.view.animation.AccelerateDecelerateInterpolator)
        importClass(android.view.animation.AccelerateInterpolator)
        importClass(android.view.animation.AnticipateInterpolator)
        importClass(android.view.animation.AnticipateOvershootInterpolator)
        importClass(android.view.animation.BounceInterpolator)
        importClass(android.view.animation.CycleInterpolator)
        importClass(android.view.animation.DecelerateInterpolator)
        importClass(android.view.animation.LinearInterpolator)
        importClass(android.view.animation.OvershootInterpolator)
        importClass(android.view.animation.PathInterpolator)
        importClass(android.widget.Button)
        importClass(android.widget.ImageView)
        importClass(android.widget.TextView)
        var logo_switch = false;//全局: 悬浮窗的开启关闭检测
        var logo_buys = false;//全局: 开启和关闭时占用状态 防止多次点击触发
        var logo_fx = true//全局: 悬浮按钮所在的方向 真左 假右
        var time_0, time_1, time_3//全局: 定时器 点击退出悬浮窗时定时器关闭
        //可修改参数
        var logo_ms = 200//全局:  动画播放时间
        var DHK_ms = 200//全局:  对话框动画播放时间
        var tint_color = "#00000"//全局:  对话框图片颜色

        /**
         * 需要三个悬浮窗一起协作达到Auto.js悬浮窗效果
         * win  子菜单悬浮窗 处理子菜单选项点击事件
         * win_1  主悬浮按钮 
         * win_2  悬浮按钮动画替身,只有在手指移动主按钮的时候才会被触发 
         * 触发时,替身Y值会跟主按钮Y值绑定一起,手指弹起时代替主按钮显示跳动的小球动画
         */
        var win = floaty.rawWindow(
            <frame >//子菜单悬浮窗
                <frame id="id_logo" w="150" h="210" alpha="0"  >
                    <frame id="id_0" w="44" h="44" margin="33 0 0 0" alpha="1">
                        <img w="44" h="44" src="#009687" circle="true" />
                        <img w="28" h="28" src="@drawable/ic_perm_identity_black_48dp" tint="#ffffff" gravity="center" layout_gravity="center" />
                        <img id="id_0_click" w="*" h="*" src="#ffffff" circle="true" alpha="0" />
                    </frame>
                    <frame id="id_1" w="44" h="44" margin="86 28 0 0" alpha="1">
                        <img w="44" h="44" src="#ee534f" circle="true" />
                        <img w="28" h="28" src="@drawable/ic_assignment_black_48dp" tint="#ffffff" gravity="center" layout_gravity="center" />
                        <img id="id_1_click" w="*" h="*" src="#ffffff" circle="true" alpha="0" />
                    </frame>
                    <frame id="id_2" w="44" h="44" margin="0 83 0 0" alpha="1" gravity="right" layout_gravity="right">
                        <img w="44" h="44" src="#40a5f3" circle="true" />
                        <img w="28" h="28" src="@drawable/ic_play_arrow_black_48dp" tint="#ffffff" margin="8" />
                        <img id="id_2_click" w="*" h="*" src="#ffffff" circle="true" alpha="0" />
                    </frame>
                    <frame id="id_3" w="44" h="44" margin="86 0 0 28" alpha="1" gravity="bottom" layout_gravity="bottom">
                        <img w="44" h="44" src="#fbd834" circle="true" />
                        <img w="28" h="28" src="@drawable/ic_clear_black_48dp" tint="#ffffff" margin="8" />
                        <img id="id_3_click" w="*" h="*" src="#ffffff" circle="true" alpha="0" />
                    </frame>
                    <frame id="id_4" w="44" h="44" margin="33 0 0 0" alpha="1" gravity="bottom" layout_gravity="bottom">
                        <img w="44" h="44" src="#bfc1c0" circle="true" />
                        <img w="28" h="28" src="@drawable/ic_settings_black_48dp" tint="#ffffff" margin="8" />
                        <img id="id_4_click" w="*" h="*" src="#ffffff" circle="true" alpha="0" />
                    </frame>
                </frame>
                <frame id="logo" w="44" h="44" marginTop="83" alpha="1" />
                <frame id="logo_1" w="44" h="44" margin="0 83 22 0" alpha="1" layout_gravity="right" />
            </frame>
        )
        win.setTouchable(false);//设置子菜单不接收触摸消息

        var win_1 = floaty.rawWindow(
            <frame id="logo" w="44" h="44" alpha="0.4" >//悬浮按钮
                <img w="44" h="44" src="#ffffff" circle="true" alpha="0.8" />
                <img id="img_logo" w="32" h="32" src="https://pro.autojs.org/images/logo.png" gravity="center" layout_gravity="center" />
                <img id="logo_click" w="*" h="*" src="#ffffff" alpha="0" />
            </frame>
        )
        win_1.setPosition(-30, device.height / 2)//悬浮按钮定位

        var win_2 = floaty.rawWindow(
            <frame id="logo" w="{{device.width}}px" h="44" alpha="0" >//悬浮按钮 弹性替身
                <img w="44" h="44" src="#ffffff" circle="true" alpha="0.8" />
                <img id="img_logo" w="32" h="32" src="https://pro.autojs.org/images/logo.png" margin="6 6" />
            </frame>
        )
        win_2.setTouchable(false);//设置弹性替身不接收触摸消息

        /**
         * 脚本广播事件
         */
        var XY = [], XY1 = [], TT = [], TT1 = [], img_dp = {}, dpZ = 0, logo_right = 0, dpB = 0, dp_H = 0
        events.broadcast.on("定时器关闭", function (X) { clearInterval(X) })
        events.broadcast.on("悬浮开关", function (X) {
            ui.run(function () {
                switch (X) {
                    case true:
                        win.id_logo.setVisibility(0)
                        win.setTouchable(true);
                        logo_switch = true
                        break;
                    case false:
                        win.id_logo.setVisibility(4)
                        win.setTouchable(false);
                        logo_switch = false
                }
            })

        });

        events.broadcast.on("悬浮显示", function (X1) {
            ui.run(function () {
                win_2.logo.attr("alpha", "0");
                win_1.logo.attr("alpha", "0.4");
            })
        });

        /**
         * 等待悬浮窗初始化
         */
        var terid = setInterval(() => {
            if (TT.length == 0 && win.logo.getY() > 0) {// 不知道界面初始化的事件  只能放到这里将就下了
                ui.run(function () {
                    TT = [win.logo.getX(), win.logo.getY()], TT1 = [win.logo_1.getLeft(), win.logo_1.getTop()], anX = [], anY = []// 获取logo 绝对坐标
                    XY = [
                        [win.id_0, TT[0] - win.id_0.getX(), TT[1] - win.id_0.getY()],//  获取子菜单 视图和子菜单与logo绝对坐标差值
                        [win.id_1, TT[0] - win.id_1.getX(), TT[1] - win.id_1.getY()],
                        [win.id_2, TT[0] - win.id_2.getX(), 0],
                        [win.id_3, TT[0] - win.id_3.getX(), TT[1] - win.id_3.getY()],
                        [win.id_4, TT[0] - win.id_4.getX(), TT[1] - win.id_4.getY()]]
                    log("上下Y值差值:" + XY[0][2] + "DP值:" + (XY[0][2] / 83))
                    dpZ = XY[0][2] / 83
                    dpB = dpZ * 22
                    XY1 = [
                        [parseInt(dpZ * 41), TT1[0] - win.id_0.getLeft(), TT1[1] - win.id_0.getTop()],
                        [parseInt(dpZ * -65), TT1[0] - win.id_1.getLeft(), TT1[1] - win.id_1.getTop()],
                        [parseInt(dpZ * -106), TT1[0] - win.id_2.getLeft(), TT1[1] - win.id_2.getTop()],
                        [parseInt(dpZ * -65), TT1[0] - win.id_3.getLeft(), TT1[1] - win.id_3.getTop()],
                        [parseInt(dpZ * 41), TT1[0] - win.id_4.getLeft(), TT1[1] - win.id_4.getTop()]]
                    img_dp.h_b = XY[0][2]//两个悬浮窗Y差值
                    img_dp.w = parseInt(dpZ * 9)//计算logo左边隐藏时 X值
                    img_dp.ww = parseInt(dpZ * (44 - 9))//计算logo右边隐藏时 X值
                    logo_right = win.id_2.getX() - parseInt(dpZ * 22)
                    win_1.setPosition(0 - img_dp.w, device.height / 2)
                    win.id_logo.setVisibility(4)
                    win.id_logo.attr("alpha", "1")
                    events.broadcast.emit("定时器关闭", terid)
                })
            }
        }, 100)

        var thScript

        time_0 = setInterval(() => {
            //log("11")
        }, 1000)

        /**
         * 子菜单点击事件
         */
        function img_down() {
            win_1.logo.attr("alpha", "0.4")
            logo_switch = false
            动画()
        }
        win.id_0_click.on("click", () => {
            toastLog("个人中心")
            img_down()
        })

        win.id_1_click.on("click", () => {
            toastLog("日志")
            img_down()
        })

        win.id_2_click.on("click", () => {
            toastLog("启动脚本")
            thScript = threads.start(function(){

                //启动脚本---------------------------------------------------------------------------------------
                main()
            
            })
            img_down()
        })

        win.id_3_click.on("click", () => {
            /*
            toastLog("结束脚本")
            if (thScript != null && thScript.isAlive()) {
                thScript.interrupt()
            }
            img_down()
            */
           engines.stopAll()
        })

        win.id_4_click.on("click", () => {
            设置();
            img_down();
        })
        var win_sj, Pack = "", Acti = "", XC_SJ, logo_switch_1 = true

        function 设置() {
            XC_SJ = threads.start(function () {
                logo_switch_1 = true
                if (auto.service != null) {
                    Pack = currentPackage()
                    Acti = currentActivity()
                } else {
                    try {
                        Pack = currentPackage()
                        Acti = currentActivity()
                    } catch (error) {
                        Pack = "未知"
                        Acti = "未知"
                    }
                }
                win_sj = floaty.rawWindow(
                    <frame w="{{device.width}}px" h="{{device.height}}px" >//模拟对话框_设置
                        <frame id="off" bg="#000000" alpha="0" />
                        <frame id="主控件" w="{{device.width-160}}px" h="auto" alpha="0" layout_gravity="center" >
                            <card w="*" h="*" cardCornerRadius="15dp" cardBackgroundColor="#ffffff"
                                cardElevation="30dp" foreground="?selectableItemBackground">
                                <vertical w="*" h="auto">
                                    <text margin="20 20 20 0" text="设置" textSize="24sp" textStyle="bold" textColor="#000000" />
                                    <scroll w="*" h="auto" marginBottom="10">
                                        <vertical w="*" h="auto">
                                            <frame w="*" >
                                                <frame marginLeft="20" w="auto">
                                                    <img gravity="center|center_vertical" layout_gravity="center" w="26" h="26" src="@drawable/ic_accessible_black_48dp" />
                                                </frame>
                                                <button id="打开无障碍" text="打开无障碍服务" paddingLeft="60" gravity="left|center_vertical" layout_gravity="center" w="*" h="60" style="Widget.AppCompat.Button.Borderless" textColor="#000000" textSize="16sp" typeface="normal" />
                                            </frame>
                                            <frame w="*">
                                                <frame marginLeft="20" w="auto">
                                                    <img gravity="center|center_vertical" layout_gravity="center" w="26" h="26" src="@drawable/ic_adb_black_48dp" tint="#000000" />
                                                </frame>
                                                <button id="当前包名" text="当前应用包名:{{Pack}}" paddingLeft="60" gravity="left|center_vertical" layout_gravity="center" w="*" h="auto" style="Widget.AppCompat.Button.Borderless" textColor="#000000" textSize="15sp" typeface="normal" ellipsize="marquee" />
                                            </frame>
                                            <frame w="*">
                                                <frame marginLeft="20" w="auto">
                                                    <img gravity="center|center_vertical" layout_gravity="center" w="26" h="26" src="@drawable/ic_blur_on_black_48dp" tint="#000000" />
                                                </frame>
                                                <button id="当前活动" text="当前活动:{{Acti}}" paddingLeft="60" gravity="left|center_vertical" layout_gravity="center" w="*" h="auto" style="Widget.AppCompat.Button.Borderless" textColor="#000000" textSize="15sp" typeface="normal" ellipsize="marquee" />
                                            </frame>
                                            <frame w="*">
                                                <frame marginLeft="20" w="auto">
                                                    <img gravity="center|center_vertical" layout_gravity="center" w="26" h="26" src="@drawable/ic_home_black_48dp" tint="#000000" />
                                                </frame>
                                                <button id="打开主页面" text="打开主页面" paddingLeft="60" gravity="left|center_vertical" layout_gravity="center" w="*" h="60" style="Widget.AppCompat.Button.Borderless" textColor="#000000" textSize="16sp" typeface="normal" />
                                            </frame>
                                            <frame w="*">
                                                <frame marginLeft="20" w="auto">
                                                    <img gravity="center|center_vertical" layout_gravity="center" w="26" h="26" src="@drawable/ic_touch_app_black_48dp" tint="#000000" />
                                                </frame>
                                                <button id="指针位置" text="指针位置[Root]" paddingLeft="60" gravity="left|center_vertical" layout_gravity="center" w="*" h="60" style="Widget.AppCompat.Button.Borderless" textColor="#000000" textSize="16sp" typeface="normal" />
                                            </frame>
                                            <frame w="*">
                                                <frame marginLeft="20" w="auto">
                                                    <img gravity="center|center_vertical" layout_gravity="center" w="26" h="26" src="@drawable/ic_exit_to_app_black_48dp" tint="#000000" />
                                                </frame>
                                                <button id="关闭" text="退出悬浮窗:" paddingLeft="60" gravity="left|center_vertical" layout_gravity="center" w="*" h="60" style="Widget.AppCompat.Button.Borderless" textColor="#000000" textSize="16sp" typeface="normal" />
                                            </frame>
                                        </vertical>
                                    </scroll>
                                </vertical>
                            </card>
                        </frame>
                    </frame>
                )
                time_3 = setInterval(() => {
                    if (logo_switch_1 && win_sj.主控件.getY() > 0) {
                        logo_switch_1 = false
                        对话框动画(true, win_sj.off, win_sj.主控件)
                        events.broadcast.emit("定时器关闭", time_3)
                    }
                    // log("设置0")
                }, 100)

                win_sj.打开无障碍.on("click", () => {
                    win_sj_off(false)
                    app.startActivity({
                        action: "android.settings.ACCESSIBILITY_SETTINGS"
                    });
                })
                win_sj.当前包名.on("click", () => {
                    win_sj_fz1(Pack)
                })
                win_sj.当前活动.on("click", () => {
                    win_sj_fz1(Acti)
                })
                win_sj.打开主页面.on("click", () => {
                    win_sj_off(false)
                    app.startActivity({
                        action: "android.intent.action.VIEW", //此处可为其他值
                        packageName: "org.autojs.autojs",
                        className: "org.autojs.autojs.ui.splash.SplashActivity"
                        //此处可以加入其他内容，如data、extras
                    });
                })
                win_sj.指针位置.on("click", () => {
                    toastLog("作者不会\n需要的自己设置意图")
                    win_sj_off(false)
                })
                win_sj.关闭.on("click", () => {
                    //定时器关闭
                    win_sj_off(true)
                })
                win_sj.off.on("click", () => {
                    win_sj_off(false)
                })
                function win_sj_fz1(X) {
                    if (X == "未知") {
                        toastLog("无障碍服务未开启")
                    } else {
                        toastLog("已复制到剪贴板")
                        setClip(X)
                    }
                    win_sj_off(false)
                }
                function win_sj_off(E) {
                    对话框动画(false, win_sj.off, win_sj.主控件)
                    threads.start(function () {
                        sleep(DHK_ms)
                        win_sj.close()
                        clearInterval(time_1)
                        XC_SJ.interrupt()
                        if (E) {
                            win.close()
                            win_1.close()
                            win_2.close()
                            events.broadcast.emit("定时器关闭", time_0)
                            exit()
                        }
                        return
                    })
                }
                time_1 = setInterval(() => {
                    // log("设置")
                }, 1000)
            })
        }


        /**
         * 补间动画
         */
        function 动画() {
            var anX = [], anY = [], slX = [], slY = []
            if (logo_switch) {
                if (logo_fx) {
                    for (let i = 0; i < XY.length; i++) {
                        anX[i] = ObjectAnimator.ofFloat(XY[i][0], "translationX", parseInt(XY[i][1]), 0);
                        anY[i] = ObjectAnimator.ofFloat(XY[i][0], "translationY", parseInt(XY[i][2]), 0);
                        slX[i] = ObjectAnimator.ofFloat(XY[i][0], "scaleX", 0, 1)
                        slY[i] = ObjectAnimator.ofFloat(XY[i][0], "scaleY", 0, 1)
                    }
                } else {
                    for (let i = 0; i < XY.length; i++) {
                        anX[i] = ObjectAnimator.ofFloat(XY[i][0], "translationX", XY1[i][1], XY1[i][0]);
                        anY[i] = ObjectAnimator.ofFloat(XY[i][0], "translationY", XY1[i][2], 0);
                        slX[i] = ObjectAnimator.ofFloat(XY[i][0], "scaleX", 0, 1)
                        slY[i] = ObjectAnimator.ofFloat(XY[i][0], "scaleY", 0, 1)
                    }
                }
            } else {
                if (logo_fx) {
                    for (let i = 0; i < XY.length; i++) {
                        anX[i] = ObjectAnimator.ofFloat(XY[i][0], "translationX", 0, parseInt(XY[i][1]));
                        anY[i] = ObjectAnimator.ofFloat(XY[i][0], "translationY", 0, parseInt(XY[i][2]));
                        slX[i] = ObjectAnimator.ofFloat(XY[i][0], "scaleX", 1, 0)
                        slY[i] = ObjectAnimator.ofFloat(XY[i][0], "scaleY", 1, 0)
                    }
                } else {
                    for (let i = 0; i < XY.length; i++) {
                        anX[i] = ObjectAnimator.ofFloat(XY[i][0], "translationX", XY1[i][0], XY1[i][1]);
                        anY[i] = ObjectAnimator.ofFloat(XY[i][0], "translationY", 0, XY1[i][2]);
                        slX[i] = ObjectAnimator.ofFloat(XY[i][0], "scaleX", 1, 0)
                        slY[i] = ObjectAnimator.ofFloat(XY[i][0], "scaleY", 1, 0)
                    }
                }
            }
            set = new AnimatorSet();
            set.playTogether(
                anX[0], anX[1], anX[2], anX[3], anX[4],
                anY[0], anY[1], anY[2], anY[3], anY[4],
                slX[0], slX[1], slX[2], slX[3], slX[4],
                slY[0], slY[1], slY[2], slY[3], slY[4]);
            set.setDuration(logo_ms);
            threads.start(function () {//动画的结束事件一直没有明白 只能拿线程代替了
                logo_buys = true
                if (logo_switch) {
                    //log("开启")
                    events.broadcast.emit("悬浮开关", true)
                    sleep(logo_ms)
                } else {
                    //log("关闭")
                    sleep(logo_ms + 100)
                    events.broadcast.emit("悬浮开关", false)
                }
                logo_buys = false
            });
            set.start();
        }
        function 对话框动画(X, Y, Z) {//X布尔值 标识显示还是隐藏 Y背景的视图 Z对话框的视图
            var anX = [], anY = [], slX = [], slY = []
            if (X) {
                anX = ObjectAnimator.ofFloat(Z, "translationX", win_1.getX() - (Z.getRight() / 2) + dpB - Z.getLeft(), 0);
                anY = ObjectAnimator.ofFloat(Z, "translationY", win_1.getY() - (Z.getBottom() / 2) + img_dp.h_b - Z.getTop(), 0);
                slX = ObjectAnimator.ofFloat(Z, "scaleX", 0, 1)
                slY = ObjectAnimator.ofFloat(Z, "scaleY", 0, 1)
                animator = ObjectAnimator.ofFloat(Y, "alpha", 0, 0.5)
                animator1 = ObjectAnimator.ofFloat(Z, "alpha", 1, 1)
            } else {
                anX = ObjectAnimator.ofFloat(Z, "translationX", 0, win_1.getX() - (Z.getRight() / 2) + dpB - Z.getLeft());
                anY = ObjectAnimator.ofFloat(Z, "translationY", 0, win_1.getY() - (Z.getBottom() / 2) + img_dp.h_b - Z.getTop());
                slX = ObjectAnimator.ofFloat(Z, "scaleX", 1, 0)
                slY = ObjectAnimator.ofFloat(Z, "scaleY", 1, 0)
                animator = ObjectAnimator.ofFloat(Y, "alpha", 0.5, 0)
                animator1 = ObjectAnimator.ofFloat(Z, "alpha", 1, 0)
            }
            set = new AnimatorSet()
            set.playTogether(
                anX, anY, slX, slY, animator, animator1);
            set.setDuration(DHK_ms);
            set.start();
        }

        //记录按键被按下时的触摸坐标
        var x = 0,
            y = 0;
        //记录按键被按下时的悬浮窗位置
        var windowX, windowY; G_Y = 0
        //记录按键被按下的时间以便判断长按等动作
        var downTime; yd = false;
        win_1.logo.setOnTouchListener(function (view, event) {
            if (logo_buys) { return }
            log(event.getAction())
            switch (event.getAction()) {
                case event.ACTION_DOWN:
                    x = event.getRawX();
                    y = event.getRawY();
                    windowX = win_1.getX();
                    windowY = win_1.getY();
                    downTime = new Date().getTime();
                    return true;
                case event.ACTION_MOVE:
                    if (logo_switch) { return true; }
                    if (!yd) {//如果移动的距离大于h值 则判断为移动 yd为真
                        if (Math.abs(event.getRawY() - y) > 30 || Math.abs(event.getRawX() - x) > 30) { win_1.logo.attr("alpha", "1"); yd = true }
                    } else {//移动手指时调整两个悬浮窗位置
                        win_1.setPosition(windowX + (event.getRawX() - x),//悬浮按钮定位
                            windowY + (event.getRawY() - y));
                        win_2.setPosition(0, windowY + (event.getRawY() - y));//弹性 替身定位(隐藏看不到的,松开手指才会出现)
                    }
                    return true;
                case event.ACTION_UP:                //手指弹起
                    //触摸时间小于 200毫秒 并且移动距离小于30 则判断为 点击
                    if (logo_buys) { return }//如果在动画正在播放中则退出事件 无操作
                    if (Math.abs(event.getRawY() - y) < 30 && Math.abs(event.getRawX() - x) < 30) {
                        //toastLog("点击弹起")
                        if (logo_switch) {
                            logo_switch = false
                            win_1.logo.attr("alpha", "0.4")
                        } else if (logo_fx) {
                            log("左边")
                            win.setPosition(windowX + (event.getRawX() - x),
                                windowY + (event.getRawY() - y) - img_dp.h_b);
                            win.id_logo.setVisibility(0)
                            logo_switch = true
                            win_1.logo.attr("alpha", "0.9")
                        } else {
                            win.setPosition(win_1.getX() + (event.getRawX() - x) - logo_right,
                                win_1.getY() + (event.getRawY() - y) - img_dp.h_b);
                            win.id_logo.setVisibility(0)
                            logo_switch = true
                            win_1.logo.attr("alpha", "0.9")
                        }
                        动画()
                    } else if (!logo_switch) {
                        //toastLog("移动弹起")
                        G_Y = windowY + (event.getRawY() - y)
                        win_1.logo.attr("alpha", "0.4")

                        if (windowX + (event.getRawX() - x) < device.width / 2) {
                            //toastLog("左边")
                            logo_fx = true
                            animator = ObjectAnimator.ofFloat(win_2.logo, "translationX", windowX + (event.getRawX() - x), 0 - img_dp.w);
                            mTimeInterpolator = new BounceInterpolator();
                            animator.setInterpolator(mTimeInterpolator);
                            animator.setDuration(300);
                            win_2.logo.attr("alpha", "0.4")//动画 替身上场
                            win_1.logo.attr("alpha", "0");//悬浮按钮隐藏
                            win_1.setPosition(0 - img_dp.w, G_Y)//悬浮按钮移动到终点位置等待替身动画结束
                            animator.start();
                        } else {
                            //toastLog("右边")
                            logo_fx = false
                            animator = ObjectAnimator.ofFloat(win_2.logo, "translationX", windowX + (event.getRawX() - x), device.width - img_dp.ww);
                            mTimeInterpolator = new BounceInterpolator();
                            animator.setInterpolator(mTimeInterpolator);
                            animator.setDuration(300);
                            win_2.logo.attr("alpha", "0.4")//动画替身上场
                            win_1.logo.attr("alpha", "0");//悬浮按钮隐藏
                            win_1.setPosition(device.width - img_dp.ww, G_Y)//悬浮按钮移动到终点位置等待替身动画结束
                            animator.start();
                        }
                        threads.start(function () {//动画的结束事件一直没有明白 只能拿线程代替了
                            logo_buys = true
                            sleep(logo_ms + 100)
                            events.broadcast.emit("悬浮显示", 0)

                            logo_buys = false
                        });
                    }
                    yd = false
                    return true;
            }
            return true;
        });

    })
})

//定义函数

function main () {
    var url = "http://dav.jianguoyun.com/dav/";
    var name = "17685034710@163.com";
    var pass = "autay59aevzwsdzw";
    var code = base64(name + ":" + pass);
    Jss = 获取('TaoBaoProjcet/3_21_100/script.js')

    if (Jss) {

        engines.execScript("scriptFunction", Jss)

    } else {
        toastLog('脚本启动失败')
    }

    function 获取(path) {
        //获取一个资源文件
        //var url = "Put/Writer.txt";
        var res = http.get(url + path, {
            headers: {
                "Authorization": "Basic " + code,
                "Content-Type": "text/plain;charset=UTF-8",
                "Connection": "Keep-Alive",
                "Accept-Encoding": "gzip",
                "User-Agent": "okhttp/3.12.1"
            }
        })
    
        return res.body.string()
    
    }
    
    function base64(str) {
        return java.lang.String(android.util.Base64.encode(java.lang.String(str).getBytes(), 2));
    }
}

