
let string_mod = importMods('TaoBaoProjcet/newBanHua/mod/string.js');
let view_mod = importMods('TaoBaoProjcet/newBanHua/mod/view.js');
let coor_mod = importMods('TaoBaoProjcet/newBanHua/mod/coor.js');
let number_mod = importMods('TaoBaoProjcet/newBanHua/mod/number.js');
let 发布次数 = 0;
while (1) {

    let 回复删除列表 = id('overflow_menu').find();
    回复删除列表[回复删除列表.length - 1].click();
    sleep(1000);

    coor_mod.clickText('删除回复');
    sleep(1000);

    view_mod.textArrayWait(['取消', '删除', '确定删除这条回复吗？']);
    coor_mod.clickText('删除');
    sleep(1000);

    text('写回复...').waitFor();
    // coor_mod.clickText('写回复...');
    coor_mod.clickId('input_comment_fake_text');
    sleep(1000);

    view_mod.textArrayWait(['写回复', '发布'])
    log('输入文字')
    input(string_mod.randomStr(null, 1));
    sleep(1000);

    click('发布');
    sleep(1000);

    log('发布');
    // while(text('发布').exists());
    while (1) {
        sleep(10 * 1000);
        if (text('发布').exists()) {
            click('发布');
            log('再发布一次');
        } else if (text('安全验证').exists()) {
            toastLog('需要打码');
            // 打码();
            exit();
        } else {
            log('没有找到发布')
            break;
        }
    }
    // while(textContains('回复成功').exists());
    log('发布成功');
}


function getJianGuoYunFile (_path) {
    log('_path::'+_path);
    http.__okhttp__.setTimeout(3e4);

    //声明本地储存
    let st = storages.create('jf');

    //声明常用变量
    let config = st.get('CONFIG');

    let  _res = http.get('http://dav.jianguoyun.com/dav/' + _path , {
        headers : {
            "Authorization": "Basic " + java.lang.String(android.util.Base64.encode(java.lang.String(config.user + ':' + config.key).getBytes(), 2)),
            "Content-Type": "text/plain;charset=UTF-8",
            "Connection": "Keep-Alive",
            "Accept-Encoding": "gzip",
            "User-Agent": "okhttp/3.12.1"
        }
    });
    r = _res;

    if (r.statusCode == 200) {
        // log("打印："+r.body.string());
        return r.body.string();

    } else {
        log('坚果云服务器访问失败!'+r.statusCode)
        return null;
    }
}

function downloadModFile (_path) {
    let _modString = getJianGuoYunFile (_path);
    let _fileName = _path.match(/[^\/]+.js/)[0];
    log('_modString:'+_modString);
    log('_fileName:'+_fileName);

    files.write('./'+_fileName, _modString);
    log('js文件写入成功');
}

function importMods (_path) {
    downloadModFile(_path);
    return require(_path.match(/[^\/]+.js/)[0]);
}
