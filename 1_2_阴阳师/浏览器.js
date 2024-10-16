"ui";

ui.layout(
    <frame w='*' h='*'>
        <webview w='*' h='*' id='webview'></webview>

            <button id='getCookie' layout_gravity='bottom' w='auto' h='auto' text='提取Cookie'></button>
            <button id='deleteCookie' layout_gravity='right|bottom' w='auto' h='auto' text='清除Cookie'></button>
            <button id='getUrl' layout_gravity='center|bottom' w='auto' h='auto' text='提取Url'></button>


    </frame>
)

ui.webview.loadUrl("https://wappass.baidu.com/passport?login&u=https://tieba.baidu.com/index/tbwise/forum#/insert_account");

http.__okhttp__.muteClient(new OkHttpClient.Builder().cookieJar(web.webkitCookieJar))
var cookieManager = web.cookieManager;
// cookieManager.removeAllCookie();
// cookieManager.removeSessionCookie();

ui.getCookie.on('click', ()=> {
    log(cookieManager.getCookie("https://wappass.baidu.com/passport?login&u=https://tieba.baidu.com/index/tbwise/forum#/insert_account"));
});


ui.getUrl.on('click', ()=> {
    log(ui.webview.getUrl());
});


function Baidu_OCR(imgFile) {
    access_token = http.get("https://aip.baidubce.com/oauth/2.0/token?grant_type=client_credentials&client_id=YIKKfQbdpYRRYtqqTPnZ5bCE&client_secret=hBxFiPhOCn6G9GH0sHoL0kTwfrCtndDj").body.json().access_token;
    url = "https://aip.baidubce.com/rest/2.0/ocr/v1/general_basic" + "?access_token=" + access_token;
    imag64 = images.toBase64(images.read(imgFile));
    res = http.post(url, {headers: {'Content-Type': 'application/x-www-form-urlencoded'},image: imag64,image_type: "BASE64",language_type:"JAP"});
    str = JSON.parse(res.body.string()).words_result.map(val => val.words).join('\n');
    return str;
}

// imgFile = "/sdcard/Pictures/Screenshots/Screenshot_20210125-152041.jpg";
// log(Baidu_OCR(imgFile));
