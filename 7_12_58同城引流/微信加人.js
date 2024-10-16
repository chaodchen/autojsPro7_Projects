this.windowObj = floaty.rawWindow(
    <frame>
        <img w="auto" h="auto" src="@drawable/ic_pause_circle_outline_black_48dp" id='windowButton'/>
    </frame>
);

setInterval(()=>{}, 1000);

//记录按键被按下时的触摸坐标
var x = 0, y = 0;
//记录按键被按下时的悬浮窗位置x
var windowX, windowY;
//记录按键被按下的时间以便判断长按等动作
var downTime, window = this.windowObj;

//设置悬浮窗随手指拖动
this.windowObj.windowButton.setOnTouchListener(function(view, event){
    switch(event.getAction()){
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
            //如果按下的时间超过1.5秒判断为长按，退出脚本
            if(new Date().getTime() - downTime > 1500){
                exit();
            }
            return true;
        case event.ACTION_UP:
            //手指弹起时如果偏移很小则判断为点击
            if(Math.abs(event.getRawY() - y) < 5 && Math.abs(event.getRawX() - x) < 5){
                onClick();
            }
            return true;
    }
    return true;
});


// {{(function(){
//     if (!this.scriptThreads) {
//         return '@drawable/ic_play_circle_filled_white_black_48dp';

//     } else {
//         return '@drawable/ic_pause_circle_outline_black_48dp';
//     }
// })()}}