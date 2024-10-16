

if(!requestScreenCapture()){
    toast("请求截图失败");
    exit();
}



while (1) {
    var jt = images.captureScreen();
    var point = images.findColor(jt, "#FFA68552");
    if (point) {
        log("找到了颜色坐标是x:%d，y:%d", point.x, point.y);
    }
    sleep(1000);
    log("------");
}
