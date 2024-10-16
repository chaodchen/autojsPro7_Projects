//请求截图
if(!requestScreenCapture()){
    toast("请求截图失败");
    exit();
}


let jt = captureScreen();

let zudui = images.read("/sdcard/zudui.png");

zudui = images.scale(zudui, device.width/720, device.height/1280);
images.save(zudui, "/sdcard/zudui2.png", "png", 100);

if (images.findImage(jt, zudui)) {
    toastLog("找到了");

} else {
    toastLog("没有找到");
}

