"ui";
const OWNER = 'liu_yi_shou';
const REPO = 'yys2';
const TOKEN = '54fb29559d202d1a62b109cc60331323';
const MYPATH = '/sdcard/yys2/';
const INDEXFILE = 'mainActivity.js';

ui.layout(
    <frame bg='#000000'>
        <horizontal>
            <text text='加载中' textColor='#ffffff'></text>
            <text text='' textColor='#ffffff' id='loadingText'></text>
        </horizontal>
    </frame>
);


threads.start(function () {
    let storage = storages.create(REPO);
    let r = getTree(OWNER, REPO, 'master', TOKEN)
    log(r);
    let localTree = storage.get('localTree') || [{}]

    if (JSON.stringify(r.res) != JSON.stringify(localTree)) {
        log('要更新');
        storage.put('localTree', r.res)
        downloadCodes(r.res, MYPATH);
    }
    log('开始运行')
    engines.execScriptFile(MYPATH+INDEXFILE , {
        path : MYPATH
    });
    ui.finish();
})


/**
 * 
 * @param {gitee返回的tree数组*} tree 
 * @param {本地保存的tree数组} tree_local 
 * @returns 如果返回false则不需要更新 反之需要更新
 */
function compread (tree, tree_local) {
    let rus = false;
    try {
        tree.forEach((t, index) => {
            if (!tree_local[index]) {
                rus = true;
                throw "tree_local[index]不存在";
            }

            if (t.size != tree_local[index].size) {
                rus = true;
                throw "t.size != tree_local[index].size";
            }

        });
    }   catch (e) {
        console.error(e)
    }
    return rus
} 


/**
 * 
 * @param {*仓库所属空间地址(企业、组织或个人的地址path)} owner 
 * @param {*仓库路径(path)} repo 
 * @param {*分支名默认master} sha 
 * @param {*用户授权码} access_token 
 * @param {*是否使用递归} recursive 
 * @returns 返回gitee的tree数组
 */
function getTree (owner, repo, sha, access_token, recursive) {
    recursive = recursive || 1;
    let api = 'https://gitee.com/api/v5/repos/'+owner+'/'+repo+'/git/trees/'+sha+'?access_token='+access_token+'&recursive='+recursive;
    let rus = {
        code : 0,
        message : 'ok',
        res : []
    };
    let res = http.get(api)

    if (res.statusCode != 200) {
        // console.error('请求gitee服务器失败！')
        rus.code = 10001
        rus.message = '请求gitee服务器失败！'
        return rus
    } else {
        rus.code = 0
        rus.message = 'ok'
        rus.res = res.body.json().tree
        return rus
    }
}


/**
 * 
 * @param {*gitee返回的tree数组} tree 
 * @param {*要保存的本地路径} path 
 */
function downloadCodes (tree, path) {
    let baseToString = function (str) {
        return new java.lang.String(android.util.Base64.decode(new java.lang.String(str).getBytes(), android.util.Base64.DEFAULT))
    }

    let baseToBytes = function (str) {
        return android.util.Base64.decode(new java.lang.String(str).getBytes(), android.util.Base64.DEFAULT)
    }

    let getBolb = function (owner, repo, sha, access_token) {

        // log()
        let api = 'https://gitee.com/api/v5/repos/'+owner+'/'+repo+'/git/blobs/'+sha+'?access_token='+access_token;
        let rus = {
            code : 0,
            message : 'ok',
            res : ''
        }
        let getRes = http.get(api);
        if (getRes.statusCode != 200) {
            rus.code = 10001;
            rus.message = '链接gitee服务器失败！';
            rus.res = null;
        } else {

            // log('niubi:'+JSON.stringify(getRes.body.json()))
            rus.code = 0;
            rus.message = 'ok';
            rus.res = getRes.body.json();
        
        }
        return rus;
    }

    //创建一系列文件夹
    files.createWithDirs(path)

    tree.forEach((res, index, tree) => {
        
        log('%d/%d', index, tree.length)
        ui.run(() => {
            ui.loadingText.setText(index+'/'+tree.length);
        })
        if (res.type == 'blob') {
            //文件
            files.create(path+res.path)

            let content = getBolb(OWNER, REPO, res.sha, TOKEN)
            if (content.code == 0) {
                let ccBtyes = baseToBytes(content.res.content)
                files.writeBytes(path+res.path, ccBtyes)
            } else {
                console.error(content.message)
            }
            
        } else if (res.type == 'tree') {
            //文件夹
            files.create(path+res.path+'/')
        }
    })
}