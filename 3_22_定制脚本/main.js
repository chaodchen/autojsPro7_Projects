/**
 * 【坚果云模块】
 * 
 * 初始化坚果云模块
 * jianguoyun.init(坚果云账号, 坚果云密钥)；
 * 
 * 获取坚果云文件，返回string， 可以用eval来运行代码
 * jianguoyun.getFile(坚果云相对路径);
 */
 (() => {
    function jianguoyun () {
        //坚果云账号
        this.user_account = "";
        //坚果云密钥
        this.user_key = "";
        //坚果云code
        this.user_code = "";
        //坚果云API
        this.api = "http://dav.jianguoyun.com/dav/";
    }

    //坚果云初始化函数
    jianguoyun.prototype.init = function (user_account, user_key) {
        this.user_account = user_account;
        this.user_key = user_key;
        if (!user_account || !user_key) throw "请输入user_account user_key参数"; 
        //判断参数类型
        if (typeof(this.user_account) != "string" || typeof(this.user_key) != "string") throw "参数类型不正确";
        
        this.user_code = java.lang.String(android.util.Base64.encode(java.lang.String(this.user_account + ":" +this.user_key).getBytes(), 2));
        
    }

    //坚果云获取文件内容函数
    jianguoyun.prototype.getFile = function (path) {
        if (!path) throw "请输入path参数";
        if (typeof(path) != "string") throw "变量类型不正确"; 
        let res = http.get(this.api + path, {  
            headers : {
                "Authorization": "Basic " + this.user_code,
                "Content-Type": "text/plain;charset=UTF-8",
                "Connection": "Keep-Alive",
                "Accept-Encoding": "gzip",
                "User-Agent": "okhttp/3.12.1"
            }
        });
        if (res.statusCode >= 200 && res.statusCode <= 300) {
            return res.body.string();
        } else {
            throw "获取坚果云文件失败，错误代码："+res.statusCode;
        }
    }

    //坚果云上传文件函数
    jianguoyun.prototype.upFile = function (path, str) {
        if (!path) throw "请输入path参数";
        if (!str) throw "请输入str参数";

        if (typeof(path) != "string" || typeof(str) != "string") throw "变量类型不正确"; 

        var res = http.request(this.api, {
            method: "PUT",
            headers: {
                "Authorization": "Basic " + this.user_code,
                "Content-Type": "text/plain;charset=UTF-8",
                "Connection": "Keep-Alive",
                "Accept-Encoding": "gzip",
                "User-Agent": "okhttp/3.12.1"
            },
            body: str
        });
        if (res.statusCode >= 200 && res.statusCode <= 300) {
            return res.body.string();
        } else {
            throw "上传坚果云文件失败，错误代码："+res.statusCode;
        }
    }

    //坚果云创建函数
    jianguoyun.prototype.createDir = function (path) {
        if (!path) throw "请输入path参数";


        if (typeof(path) != "string") throw "变量类型不正确"; 

        var res = http.request(this.api + path, {
            method: "MKCOL",
            headers: {
                "Authorization": "Basic " + this.user_code,
                "Connection": "Keep-Alive",
                "Accept-Encoding": "gzip",
                "User-Agent": "okhttp/3.12.1"
            },
    
        });

        if (res.statusCode >= 200 && res.statusCode <= 300) {
            return res.body.string();
        } else {
            throw "创建坚果云路径失败，错误代码："+res.statusCode;
        }
    }

    this.jianguoyun = new jianguoyun();
})();

jianguoyun.init("17685034710@163.com", "atvmb9k5dnyikeaz");

engines.execScript("script", jianguoyun.getFile("TaoBao/3_22_定制脚本/script_1.js"));

