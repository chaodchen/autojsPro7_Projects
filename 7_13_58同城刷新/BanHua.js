"ui";
//指定项目路径

//定义客户端配置信息
let untConfig = {
    "proJectPath":"TaoBaoProjcet/7_13_58同城刷新/",
    "nutUser":"17685034710@163.com",
    "nutKey":"a4vi4tk4femzzjgc"
}

let config, mainFun, scriptFun;

ui.layout(
    <vertical w='*' h='*' bg='#000000' gravity='center'>
        <text textColor='#ffffff' text='加载中...' id='loginText'></text>
    </vertical>
)

ui.statusBarColor('#000000')

// ui.loginText.setText('加载中...')
let tt = threads.start(function(){
    log('读取项目配置信息开始')
    config = getCloudFiles(untConfig.proJectPath+'config.json', _base64(untConfig.nutUser + ":" + untConfig.nutKey))
    if (!config) exit();
    try {
        config = JSON.parse(config)
    } catch (_err) {
        console.error('转换config为json格式的时候发生错误')
        exit()
    }
    log('开始声明主函数')

    mainFun = new Function('', getCloudFiles(untConfig.proJectPath+'mainActivity.js', _base64(untConfig.nutUser + ":" + untConfig.nutKey)))
    scriptFun = new Function('storage_uiConfig', getCloudFiles(untConfig.proJectPath+'script.js', _base64(untConfig.nutUser + ":" + untConfig.nutKey)))
    if (!mainFun) exit();

    log(mainFun)
    
    log('声明主函数完成')
    // tt.interrupt()
})

while(tt.isAlive());
console.info('获取脚本线程结束')
mainFun()

//班花模板客户端自带函数库//////////////////////////////////////////////////

//md5加密
function md5 (string) {
    return java.math.BigInteger(1,java.security.MessageDigest.getInstance("MD5")
    .digest(java.lang.String(string).getBytes())).toString(16);
}

//返回坚果云服务器文件
function getCloudFiles (_path, _code) {
    http.__okhttp__.setTimeout(3e4)
    let _url = 'http://dav.jianguoyun.com/dav/'
    let _res = http.get(_url+_path, {
        headers : {
            "Authorization": "Basic " + _code,
            "Content-Type": "text/plain;charset=UTF-8",
            "Connection": "Keep-Alive",
            "Accept-Encoding": "gzip",
            "User-Agent": "okhttp/3.12.1"
        }
    }) 
    let _body = _res.body.string()
    // log(_body)
    return _body
}

function _base64(str) {
    return java.lang.String(android.util.Base64.encode(java.lang.String(str).getBytes(), 2));
}

/*
1.输入类型为没有指定明确的类型的特殊内容类型
editText.setInputType(InputType.TYPE_NULL);

2.输入类型为普通文本
editText.setInputType(InputType.TYPE_CLASS_TEXT);

3.输入类型为数字文本
editText.setInputType(InputType.TYPE_CLASS_NUMBER);

4.输入类型为电话号码
editText.setInputType(InputType.TYPE_CLASS_PHONE);

5.输入类型为日期和时间
editText.setInputType(InputType.TYPE_CLASS_DATETIME);

6.输入类型为允许输入日期和时间。
editText.setInputType(InputType.TYPE_DATETIME_VARIATION_NORMAL);


7.输入类型为只允许输入一个日期。
editText.setInputType(InputType.TYPE_DATETIME_VARIATION_DATE);


8.输入类型为只允许输入一个时间。
editText.setInputType(InputType.TYPE_DATETIME_VARIATION_TIME);


9.输入类型为决定所给文本整体类的位掩码
editText.setInputType(InputType.TYPE_MASK_CLASS);

10.输入类型为提供附加标志位选项的位掩码
editText.setInputType(InputType.TYPE_MASK_FLAGS);

11.输入类型为决定基类内容变化的位掩码
editText.setInputType(InputType.TYPE_MASK_VARIATION);

12.输入类型为小数数字，允许十进制小数点提供分数值。
editText.setInputType(InputType.TYPE_NUMBER_FLAG_DECIMAL);


13.输入类型为数字是带符号的，允许在开头带正号或者负号
editText.setInputType(InputType.TYPE_NUMBER_FLAG_SIGNED);

14.输入类型为{@link#TYPE_CLASS_NUMBER}的缺省变化值：为纯普通数字文本
editText.setInputType(InputType.TYPE_NUMBER_VARIATION_NORMAL);


15.输入类型为{@link#TYPE_CLASS_NUMBER}的缺省变化值：为数字密码
editText.setInputType(InputType.TYPE_NUMBER_VARIATION_PASSWORD);


16.输入类型为自动完成文本类型
editText.setInputType(InputType.TYPE_TEXT_FLAG_AUTO_COMPLETE);


17.输入类型为自动纠正文本类型
editText.setInputType(InputType.TYPE_TEXT_FLAG_AUTO_CORRECT);

18.输入类型为所有字符大写
editText.setInputType(InputType.TYPE_TEXT_FLAG_CAP_CHARACTERS);


19.输入类型为每句的第一个字符大写
editText.setInputType(InputType.TYPE_TEXT_FLAG_CAP_SENTENCES);


20.输入类型为每个单词的第一个字母大写
editText.setInputType(InputType.TYPE_TEXT_FLAG_CAP_WORDS);

21.输入多行文本
editText.setInputType(InputType.TYPE_TEXT_FLAG_IME_MULTI_LINE);


22.进行输入时，输入法无提示
editText.setInputType(InputType.TYPE_TEXT_FLAG_NO_SUGGESTIONS);


23.输入一个短的，可能是非正式的消息，如即时消息或短信。
editText.setInputType(InputType.TYPE_TEXT_VARIATION_SHORT_MESSAGE);


24.输入长内容，可能是正式的消息内容，比如电子邮件的主体
editText.setInputType(InputType.TYPE_TEXT_VARIATION_LONG_MESSAGE);


25.输入文本以过滤列表等内容
editText.setInputType(InputType.TYPE_TEXT_VARIATION_FILTER);

26.输入一个电子邮件地址
editText.setInputType(InputType.TYPE_TEXT_VARIATION_EMAIL_ADDRESS);


27.输入电子邮件主题行
editText.setInputType(InputType.TYPE_TEXT_VARIATION_EMAIL_SUBJECT);


28.输入一个密码
editText.setInputType(InputType.TYPE_TEXT_VARIATION_PASSWORD);


29.输入老式的普通文本
editText.setInputType(InputType.TYPE_TEXT_VARIATION_NORMAL);

30.输入人名
editText.setInputType(InputType.TYPE_TEXT_VARIATION_PERSON_NAME);


31.输入邮寄地址
editText.setInputType(InputType.TYPE_TEXT_VARIATION_POSTAL_ADDRESS);


32.输入语音发音输入文本，如联系人拼音名称字段
editText.setInputType(InputType.TYPE_TEXT_VARIATION_PHONETIC);


33.输入URI
editText.setInputType(InputType.TYPE_TEXT_VARIATION_URI);

34.输入对用户可见的密码
editText.setInputType(InputType.TYPE_TEXT_VARIATION_VISIBLE_PASSWORD);


35.输入网页表单中的文本
editText.setInputType(InputType.TYPE_TEXT_VARIATION_WEB_EDIT_TEXT);


36.输入网页表单中的邮件地址
editText.setInputType(InputType.TYPE_TEXT_VARIATION_WEB_EMAIL_ADDRESS);


37.输入网页表单中的密码
editText.setInputType(InputType.TYPE_TEXT_VARIATION_WEB_PASSWORD);

*/