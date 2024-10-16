//launchApp('王者联盟')
toastLog('打开王者联盟')
try {
    if(!requestScreenCapture()){
        toast("请求截图失败");
        exit();
    }
} catch (err) {
    console.error(err)

}

sleep(2000)

toast('找图中...')
_17 = images.load('http://f.8-0000.com/image/17.png')
if (images.findImage(images.captureScreen(), _17), {
    threshold:0.8
}) {
    toastLog('找图成功')
} else {
    toastLog('找图失败')
}