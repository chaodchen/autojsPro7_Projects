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
importClass(android.view.WindowManager)
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

//mods = require('mods.js')


var logo_switch = false;//全局: 悬浮窗的开启关闭检测
var logo_buys = false;//全局: 开启和关闭时占用状态 防止多次点击触发
var logo_ms = 200//全局:  动画播放时间
var win = floaty.rawWindow(
  <frame >//子菜单悬浮窗
    <frame id="id_logo" w="150" h="210" alpha="0" >
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
    <frame id="logo" w="44" h="44" marginTop="83" alpha="1" >
    </frame>
  </frame>
)
win.setTouchable(false);//设置子菜单不接收触摸消息
var win_1 = floaty.rawWindow(
  <frame id="logo" w="44" h="44" alpha="0.4" >//悬浮按钮
    <img w="44" h="44" src="#ffffff" circle="true" alpha="0.8" />
    <img id="img_logo" w="32" h="32" src="@drawable/ic_android_black_48dp" gravity="center" layout_gravity="center" />
    <img id="logo_click" w="*" h="*" src="#ffffff" alpha="0" />
  </frame>
)
win_1.setPosition(-30, device.height / 2)
var win_2 = floaty.rawWindow(
  <frame id="logo" w="{{device.width}}px" h="44" alpha="0" >//悬浮按钮 弹性替身
    <img w="44" h="44" src="#ffffff" circle="true" alpha="0.8" />
    <img id="img_logo" w="32" h="32" src="@drawable/ic_android_black_48dp" margin="6 6" />
  </frame>
)
win_2.setTouchable(false);//设置弹性替身不接收触摸消息

var XY = [], TT = [], img_dp = {}, dpZ = 0
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
events.broadcast.on("悬浮显示", function (X) {
  ui.run(function () {
    win_1.setPosition(0 - img_dp.w, G_Y)
    win_2.logo.attr("alpha", "0")
    win_1.logo.attr("alpha", "0.4");
  })
})

var terid = setInterval(() => {
  if (TT.length == 0 && win.logo.getY() > 0) {// 不知道界面初始化的事件  只能放到这里将就下了
    ui.run(function () {
    TT = [win.logo.getX(), win.logo.getY()], anX = [], anY = []// 获取logo 绝对坐标
    XY[0] = [win.id_0, TT[0] - win.id_0.getX(), TT[1] - win.id_0.getY()]//  获取子菜单 视图和子菜单与logo绝对坐标差值
    XY[1] = [win.id_1, TT[0] - win.id_1.getX(), TT[1] - win.id_1.getY()]
    XY[2] = [win.id_2, TT[0] - win.id_2.getX(), 0]
    XY[3] = [win.id_3, TT[0] - win.id_3.getX(), TT[1] - win.id_3.getY()]
    XY[4] = [win.id_4, TT[0] - win.id_4.getX(), TT[1] - win.id_4.getY()]
    //log("上下Y值差值:" + XY[0][2] + "DP值:" + (XY[0][2] / 83))
    dpZ = XY[0][2] / 83
    img_dp.h_b = XY[0][2]//两个悬浮窗Y差值
    img_dp.w = parseInt(dpZ * 9)//计算logo隐藏时 X值
    win_1.setPosition(0 - img_dp.w, device.height / 2)
    win.id_logo.setVisibility(4)
    win.id_logo.attr("alpha", "1")
    })
    clearInterval(terid)
  }
}, 100)
setInterval(() => {
}, 1000)


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
    脚本线程 = threads.start(function(){
      new Function('', getCloudFiles(配置.路径+'script.js', 配置.密钥, 配置.账号))()
    })
  img_down()
})

win.id_3_click.on("click", () => {
  toastLog("结束脚本")
  if (脚本线程 != null && 脚本线程.isAlive()) {
    脚本线程.interrupt()
  }
  img_down()
})

win.id_4_click.on("click", () => {
  toastLog("设置菜单")
  img_down()
})



function 动画() {
  var anX = [], anY = [], slX = [], slY = []
  if (logo_switch) {
    for (let i = 0; i < XY.length; i++) {
      anX[i] = ObjectAnimator.ofFloat(XY[i][0], "translationX", parseInt(XY[i][1]), 0);
      anY[i] = ObjectAnimator.ofFloat(XY[i][0], "translationY", parseInt(XY[i][2]), 0);
      slX[i] = ObjectAnimator.ofFloat(XY[i][0], "scaleX", 0, 1)
      slY[i] = ObjectAnimator.ofFloat(XY[i][0], "scaleY", 0, 1)
    }
  } else {
    for (let i = 0; i < XY.length; i++) {
      anX[i] = ObjectAnimator.ofFloat(XY[i][0], "translationX", 0, parseInt(XY[i][1]));
      anY[i] = ObjectAnimator.ofFloat(XY[i][0], "translationY", 0, parseInt(XY[i][2]));
      slX[i] = ObjectAnimator.ofFloat(XY[i][0], "scaleX", 1, 0)
      slY[i] = ObjectAnimator.ofFloat(XY[i][0], "scaleY", 1, 0)
    }
  }
  set = new AnimatorSet();
  set.playTogether(
    anX[0], anX[1], anX[2], anX[3], anX[4],
    anY[0], anY[1], anY[2], anY[3], anY[4],
    slX[0], slX[1], slX[2], slX[3], slX[4],
    slY[0], slY[1], slY[2], slY[3], slY[4]);
  set.setDuration(logo_ms);
  //set.setFillAfter(true)
  threads.start(function () {//动画的结束事件一直没有明白 只能拿线程代替了
    logo_buys = true
    if (logo_switch) {
      log("开启")
      events.broadcast.emit("悬浮开关", true)
      sleep(logo_ms)

    } else {
      log("关闭")
      sleep(logo_ms + 100)
      events.broadcast.emit("悬浮开关", 0)
    }
    logo_buys = false
  });
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
  switch (event.getAction()) {
    case event.ACTION_DOWN:
      x = event.getRawX();
      y = event.getRawY();
      windowX = win_1.getX();
      windowY = win_1.getY();
      let currentTime = new Date().getTime();
      if(currentTime-downTime<500) return false;
      else downTime = currentTime;
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
      if (Math.abs(event.getRawY() - y) < 30 && Math.abs(event.getRawX() - x) < 30) {
        //toastLog("点击弹起")
        if (logo_buys) { return }// logo_buys为真表示动画正在播放中 无操作
        if (logo_switch) {
          logo_switch = false
          win_1.logo.attr("alpha", "0.4")
        } else {
          win.setPosition(windowX + (event.getRawX() - x),
            windowY + (event.getRawY() - y) - img_dp.h_b);
          win.id_logo.setVisibility(0)
          logo_switch = true
          win_1.logo.attr("alpha", "0.9")
        }
        动画()
      } else if (!logo_switch) {
        //toastLog("移动弹起")
        G_Y = windowY + (event.getRawY() - y)
        win_1.logo.attr("alpha", "0.4")
        animator = ObjectAnimator.ofFloat(win_2.logo, "translationX", windowX + (event.getRawX() - x), 0 - img_dp.w);
        mTimeInterpolator = new BounceInterpolator();
        animator.setInterpolator(mTimeInterpolator);
        animator.setDuration(300);
        win_2.logo.attr("alpha", "0.4")
        win_1.logo.attr("alpha", "0");
        animator.start();
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


var window = floaty.window(
  <frame gravity='center'>
    <text id='text' textSize='16sp' textColor='#f44336'></text>
  </frame>
);

window.exitOnClose();

window.text.click(() => {
  window.setAdjustEnabled(!window.isAdjustEnabled());

})

setInterval(() => {
  ui.run(function(){
    window.text.setText(dynamicText())
  })
}, 1000)

function dynamicText () {
  let str = util.format("内存使用量：%d%", getMemoryUsage())
  return str
}

function getMemoryUsage () {
  let usage = (100 * device.getAvailMem() / device.getTotalMem());
  return Math.round(usage * 10) / 10
}