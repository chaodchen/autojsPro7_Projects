"ui";

ui.run(function () {
    ui.layout(<frame>
        <vertical>
            <frame id="bg" w="*" h="*" background="#d9e7f5">
                <card id="box" w="*" h="*" margin="20 20 20 30" cardCornerRadius="16dp">
                    <vertical><ScrollView w="*" h="130" bg="#286fce">
                        
                    <vertical padding="20 15 20 8">
                        <text text="京东年货节活动脚本" textSize="20sp" textColor="#ffffff" textStyle="bold" marginBottom="5" />
                        <text text="1、脚本基于伪装请求的执行方式，相对稳定且执行效率高；" textSize="12sp" textColor="#a4b7d1" marginBottom="2" />
                        <text text="2、首次使用需要手动登录京东账号，脚本不会上传您的账户信息且建议使用验证码的方式进行登录；" textSize="12sp" textColor="#a4b7d1" marginBottom="2" />
                        <text text="3、在执行过程中，请保持屏幕常亮且网络状态良好；" textSize="12sp" textColor="#a4b7d1" marginBottom="2" />
                        <text text="4、若脚本长时间无响应或发生异常，可尝试重启脚本，如无法解决，可向社群反馈并等待脚本的后续更新。" textSize="12sp" textColor="#a4b7d1" marginBottom="2" />
                        </vertical>
                        </ScrollView>
                        <tabs id="tabs" bg="#175fc0" />
                        <viewpager id="viewpager" w="*" h="*" marginBottom="65" padding="10 20"><list id="todoList1"><card w="*" h="45" margin="10 0 10 10" cardCornerRadius="6dp" cardElevation="0" foreground="?selectableItemBackground"><horizontal id="card" gravity="center_vertical" paddingLeft="5" bg="#f2f2f2"><checkbox id="check" marginLeft="4" marginRight="6" checked="{{this.check}}" /><text id="title" text="{{this.title}}" textSize="16sp" maxLines="1" /></horizontal></card></list><list id="todoList2"><card w="*" h="45" margin="10 0 10 10" cardCornerRadius="6dp" cardElevation="0" foreground="?selectableItemBackground"><horizontal id="card" gravity="center_vertical" paddingLeft="5" bg="#f2f2f2"><checkbox id="check" marginLeft="4" marginRight="6" checked="{{this.check}}" /><text id="title" text="{{this.title}}" textSize="16sp" maxLines="1" /></horizontal></card></list><vertical><card id="log" w="*" margin="10 0 10 10" cardCornerRadius="6dp" cardElevation="0" foreground="?selectableItemBackground"><horizontal bg="#d3e1f4" padding="15"><frame w="*" h="*"><vertical><text id="jdid" textColor="#000000" textSize="16sp" maxLines="1" text="账户未登录" textStyle="bold" /><text textColor="#676767" textSize="12sp" maxLines="1" text="点击可切换以往登录过账户" /></vertical><img layout_gravity="right|center" w="auto" h="28" marginRight="-10" src="@drawable/ic_keyboard_arrow_right_black_48dp" tint="#909399" /></frame></horizontal></card><card w="*" margin="10 0 10 10" cardCornerRadius="6dp" cardElevation="0"><vertical bg="#d3e1f4" padding="15"><text id="ystext" textColor="#000000" textSize="16sp" maxLines="1" /><seekbar id="ys" progress="0" max="100" margin="-10 10 -10 0" /></vertical></card><card id="ck" w="*" margin="10 0 10 10" cardCornerRadius="6dp" cardElevation="0" foreground="?selectableItemBackground"><horizontal bg="#d3e1f4" padding="15"><frame w="*" h="*"><vertical><text textColor="#000000" textSize="16sp" maxLines="1" text="提取调试信息" /><text textColor="#676767" textSize="12sp" maxLines="1" text="包含cookie和活动证书，用于异常原因分析" /></vertical><img layout_gravity="right|center" w="auto" h="28" marginRight="-10" src="@drawable/ic_keyboard_arrow_right_black_48dp" tint="#909399" /></frame></horizontal></card></vertical></viewpager></vertical></card><card id="runbox" visibility="gone" w="*" h="*" margin="20 15 20 30" cardCornerRadius="16dp"><vertical><frame w="*" h="130" background="#286fce"><img w="200" h="200" layout_gravity="right" marginRight="-40" marginTop="-15" src="@drawable/ic_directions_run_black_48dp" tint="#4a8dda" /><vertical w="auto" h="auto" margin="30"><text text="运行脚本" textSize="23sp" textColor="#FFFFFF" textStyle="bold" /><text id="infotit" text="初始化脚本中……" textSize="14sp" textColor="#99c0ed" /></vertical><linear background="#4a8dda" h="4" layout_gravity="left|bottom"></linear><linear id="jdt" background="#fe5300" h="4" layout_gravity="left|bottom"></linear></frame ><list id="infoList" w="*" h="*" marginBottom="65" padding="30 20"><text id="info" text="{{this.msg}}" textColor="{{this.err?\'#F56C6C\':\'#606266\'}}" /></list></vertical></card><card w="auto" h="auto" layout_gravity="center|bottom" marginBottom="50"><horizontal w="auto" h="auto"><card id="runon" w="180" h="50" cardCornerRadius="30dp"><horizontal id="butbg" w="*" h="*" bg="#fe5300"><img id="icon" layout_gravity="left|center" w="auto" h="*" src="@drawable/ic_play_circle_filled_black_48dp" tint="#ffffff" padding="10 5 0 5" /><text id="but" text="启动脚本" gravity="center" w="*" h="*" textSize="18sp" textColor="#ffffff" textStyle="bold" marginRight="16" /></horizontal></card></horizontal></card><text id="but" text="Program by Insen (2021-01-25)" gravity="center|bottom" w="*" h="*" textSize="10sp" textColor="#b9d1eb" marginBottom="10" /></frame></vertical><frame id="loginwindow" clickable="true" w="*" h="*" visibility="gone" bg="#BF000000"><card layout_gravity="center" h="auto" margin="50 50" cardCornerRadius="10dp"><vertical><horizontal id="addid" h="auto" bg="#286fce" padding="15"><frame w="*" h="*"><text layout_gravity="left|center" h="auto" textColor="#ffffff" textSize="16sp" maxLines="1" text="手动登录添加新账号" /><img layout_gravity="right|center" w="auto" h="28" marginRight="-10" src="@drawable/ic_keyboard_arrow_right_black_48dp" tint="#ffffff" /></frame></horizontal><list id="idlist"><vertical w="*" margin="20 10"><text textColor="#000000" textSize="16sp" maxLines="1" text="{{this.idname}}" /><text id="lasttime" textColor="#676767" textSize="12sp" maxLines="1" text="{{\'上次登录：\'+this.lasttime}}" /></vertical></list></vertical></card></frame><card id="login" visibility="gone" layout_gravity="center|bottom"><vertical><linear background="#67C23A" w="*" h="auto"><text id="but" text="使用先需手动登录京东账号，脚本不会上传您的账户信息且建议使用验证码的方式进行登录" textColor="#ffffff" margin="10" /></linear><webview id="wb" h="*" /></vertical></card></frame>);



    importClass(android.graphics.Color);
    importClass(android.animation.ObjectAnimator)
    importClass(android.animation.AnimatorSet)
    importClass(android.view.animation.DecelerateInterpolator)
    importClass(android.view.View)
    // importClass(android.webkit.WebViewClient)
    // importClass(android.webkit.CookieManager)
    http.__okhttp__.muteClient(new OkHttpClient.Builder().cookieJar(web.webkitCookieJar));
    WebViewClient = web.WebViewClient

    log("WebViewClient:" + WebViewClient);
    var st = storages.create("insen_jd_spring");
    var op = [{
        object: "todoList1",
        tab: "全名炸年兽",
        list: [{
            name: "收取爆竹",
            id: "get",
            zt: true
        }, {
            name: "完成签到任务",
            id: "sign",
            zt: true
        }, {
            name: "完成即时浏览任务",
            id: "view",
            zt: true
        }, {
            name: "完成8秒浏览任务",
            id: "v8",
            zt: true
        }, {
            name: "完成加购任务",
            id: "add",
            zt: true
        }, {
            name: "完成入会任务",
            id: "vip",
            zt: true
        }, {
            name: "完成领券任务",
            id: "coupu",
            zt: true
        }, {
            name: "完成图鉴任务",
            id: "map",
            zt: true
        }, {
            name: "完成店铺签到",
            id: "shopsign",
            zt: true
        }, {
            name: "自动使用爆竹",
            id: "use",
            zt: true
        }, {
            name: "完成队伍积分任务",
            id: "team",
            zt: true
        }, {
            name: "完成特殊礼物任务",
            id: "spe",
            zt: true
        }]
    }, {
        object: "todoList2",
        tab: "神仙书院",
        list: [{
            name: "完成签到任务",
            id: "sign",
            zt: true
        }, {
            name: "完成即时浏览任务",
            id: "view",
            zt: true
        }, {
            name: "完成15秒浏览任务",
            id: "v15",
            zt: true
        }, {
            name: "完成入会任务",
            id: "vip",
            zt: true
        }]
    }]
    var debug = false
    var creatlist = function (a) {
        var list = []
        var sets = typeof st.get(a.object) != "undefined" ? st.get(a.object).split("||") : ""
        a.list.forEach(function (e) {
            var temp = {
                title: e.name,
                id: e.id,
                check: e.zt
            }
            for (var set of sets) {
                var t = set.split("|")
                if (t.length == 2) {
                    if (t[0] == e.id) {
                        temp.check = parseInt(t[1]) ? true : false
                        continue
                    }
                }
            }
            list.push(temp)
        })
        return list
    }

    ui.run(function () {
        var anset = new AnimatorSet();
        anset.playTogether(
            ObjectAnimator.ofFloat(ui.box, "scaleX", 0.3, 1),
            ObjectAnimator.ofFloat(ui.box, "scaleY", 0.3, 1),
            ObjectAnimator.ofFloat(ui.box, "alpha", 0, 1),
            ObjectAnimator.ofFloat(ui.bg, "alpha", 0, 1)
        );
        anset.setDuration(400);
        anset.setInterpolator(new DecelerateInterpolator())
        anset.start();
    })

    var tabs = []
    var todoLists = []
    for (var list of op) {
        var todoList = creatlist(list)
        ui[list.object].setDataSource(todoList)
        todoLists.push(todoList)
        ui[list.object].on("item_click", function (item, i, itemView, listView) {
            itemView.check.checked = !itemView.check.checked;
        });

        ui[list.object].on("item_bind", function (itemView, itemHolder) {
            itemView.check.on("check", function (checked) {
                itemHolder.item.check = checked;
                if (checked) {
                    itemView.card.setBackgroundColor(Color.parseColor("#d3e1f4"));
                    itemView.title.setTextColor(Color.parseColor("#1d1d1d"));
                } else {
                    itemView.card.setBackgroundColor(Color.parseColor("#f2f2f2"));
                    itemView.title.setTextColor(Color.parseColor("#999999"));
                }
            });
        });
        tabs.push(list.tab)
    }
    tabs.push("设置")
    ui.viewpager.setTitles(tabs);
    ui.tabs.setupWithViewPager(ui.viewpager);

    idlist = st.get("idlist")
    var idlist = idlist ? JSON.parse(idlist).data : []

    var infoList = []
    ui.infoList.setDataSource(infoList)

    var sentit = function (msg) {
        ui.run(function () {
            ui.infotit.setText(msg)
        })
    }

    var sentzt = false
    var sent = function (msg, wait) {
        var addinfo = function (msg) {
            ui.post(function () {
                infoList.unshift({ msg: msg, err: false })
                ui.infoList.refreshDrawableState()
            })
            ui.post(function () {
                ui.infoList.scrollToPosition(0)
            }, 100)
        }
        if (typeof wait == "boolean") {
            if (wait) {
                sentzt = true
                addinfo(msg + "…")
            } else {
                if (sentzt) {
                    ui.post(function () {
                        var temp = infoList[0].msg
                        infoList.shift()
                        infoList.unshift({ msg: temp.substring(0, temp.length - 1) + "，" + msg, err: false })
                    })
                    sentzt = false
                } else {
                    addinfo(msg)
                }
            }
        } else {
            addinfo(msg)
            sentzt = false
        }
    }
    var err = function (msg) {
        ui.post(function () {
            infoList.unshift({ msg: msg, err: true })
        })
        ui.post(function () {
            ui.infoList.scrollToPosition(0)
        }, 100)
    }

    var sle = function (a) {
        var t = ys * 100 + a + Math.floor(Math.random() * 300) - 99
        ui.post(function () {
            var anset = ObjectAnimator.ofFloat(ui.jdt, "scaleX", 0, 1)
            anset.setDuration(t)
            anset.start()
        })
        sleep(t)
    }



    ui.idlist.on("item_click", function (item, i, itemView, listView) {
        var tc = cookie, tu = UserAgent
        autolog(item.cookie, item.UserAgent, function () {
            ui.loginwindow.setVisibility(View.GONE)
        }, function (e) {
            idlist.splice(i, 1)
            st.put("idlist", JSON.stringify({ data: idlist }))
            toast("账户已失效，" + e + ",已从列表中删除")
            cookie = tc
            UserAgent = tu
        })
    });


    var ys = st.get("ys") ? parseInt(st.get("ys")) : 0

    var printys = function (e) {
        if (ys > 0) {
            ui.ystext.setText("增加额外的延迟等待时间 (" + e / 10 + "秒)")
        } else {
            ui.ystext.setText("增加额外的延迟等待时间 (无延时)")
        }
    }
    printys(ys)
    ui.ys.setProgress(ys)

    ui.ys.on("touch", function (e, a) {
        printys(a.progress)
    });

    ui.ys.on("touch_up", function (e, a) {
        ys = a.progress
    });

    ui.addid.on("click", function (e, a) {
        islogin = false
        // CookieManager.getInstance().removeAllCookie()
        web.cookieManager.removeAllCookie();

        login(function () { toast("账号已添加") })
    });

    ui.log.on("click", function (e, a) {
        ui.loginwindow.setVisibility(View.VISIBLE)
        ui.idlist.setDataSource(idlist)
    });

    ui.loginwindow.on("click", function (e, a) {
        e.setVisibility(View.GONE)
    });

    var running = false
    var mainthread
    var UserAgent
    var cookie
    var smashUtils
    var bandl = {}
    var islogin = false

    var login = function (callback) {
        var weblogin = function (callback) {
            var webcc = new JavaAdapter(WebViewClient, {
                shouldInterceptRequest: function (view, url) {
                    if (url.getUrl() == "https://m.jd.com/") {
                        ui.post(function () {
                            ui.wb.loadDataWithBaseURL(null, "", "text/html", "utf-8", null)
                            ui.login.setVisibility(View.GONE)
                        });

                        var cookieManager = web.cookieManager;
                        cookie = cookieManager.getCookie("plogin.m.jd.com")
                        blogin(function () {
                            callback()
                        }, function (e) {
                            err("登录失败：" + e)
                        })
                    }
                }
            })
            ui.run(function () {
                var set = ui.wb.getSettings()
                set.setAllowFileAccessFromFileURLs(false)
                set.setAllowUniversalAccessFromFileURLs(false)
                set.setSupportZoom(false)
                set.setJavaScriptEnabled(true)
                UserAgent = "jdapp;" + set.getUserAgentString();
                set.setUserAgentString(UserAgent);
                ui.wb.setWebViewClient(webcc)
                ui.login.setVisibility(View.VISIBLE)
                ui.wb.loadUrl("http://plogin.m.jd.com/login/login")
            })
        }
        sent("检查登录状态……")
        if (islogin) {
            blogin(function () {
                sle(500)
                callback()
            },
                function () {
                    weblogin(callback)
                })
        } else {
            weblogin(callback)
        }

    }
    var addid = function (info) {
        for (var i in idlist) {
            if (idlist[i].pin == info.curPin) {
                idlist.splice(i, 1)
                break
            }
        }
        var formatDateTime = function () {
            var date = new Date();
            var y = date.getFullYear();
            var m = date.getMonth() + 1;
            m = m < 10 ? ('0' + m) : m;
            var d = date.getDate();
            d = d < 10 ? ('0' + d) : d;
            var h = date.getHours();
            h = h < 10 ? ('0' + h) : h;
            var minute = date.getMinutes();
            var second = date.getSeconds();
            minute = minute < 10 ? ('0' + minute) : minute;
            second = second < 10 ? ('0' + second) : second;
            return y + '-' + m + '-' + d + ' ' + h + ':' + minute + ':' + second;
        };
        idlist.unshift({
            cookie: cookie,
            UserAgent: UserAgent,
            idname: info.nickname,
            pin: info.curPin,
            lasttime: formatDateTime()
        })
        st.put("idlist", JSON.stringify({ data: idlist }))
    }

    var blogin = function (seccess, fail) {
        http.get("https://wq.jd.com/user/info/QueryJDUserInfo?sceneval=2", {
            headers: {
                "Referer": "https://home.m.jd.com/",
                "User-Agent": UserAgent,
                "cookie": cookie,
            }
        }, function (res, err) {
            if (err) {
                return;
            }
            var info = res.body.json()
            if (info.retcode == 0) {
                islogin = true
                addid(info.base)
                if (seccess) {
                    seccess(info.base)
                }
            } else {
                if (fail) {
                    fail(info.msg)
                }
            }
        })
    }

    var autolog = function (c, u, s, f) {
        cookie = c
        UserAgent = u
        blogin(function (e) {
            ui.jdid.setText("已登录：" + e.nickname)
            toast(e.nickname + " 账户已登录")
            s()
        }, f)
    }

    // autolog("pt_pin=jd_gZnSZbukLfPM;pwdt_id=jd_gZnSZbukLfPM;unpl=;__jdc=122270672;visitkey=15115133987060944;cuid=eidAf8188122d2s5CzMwIGKfTouWzggeO%252F%252FkWAszMZd7NtBzsXB2CCpU99A4gaF3E4GqcFRHJzZxy2zi%252FvCl2Hn9fYSGQflknITBUTzMbgYrUsbmFBAw;pt_key=app_openAAJgDYrfADA_kvpcjerz4G7lUls414Ox8ep1q6mLSeGTIEBaB-VOB7ou38uSNc3TQgyXPPDduyc;sid=431c7512111668713480262b6afa568w;__jda=122270672.1611064177311645342411.1611064177.1611283169.1611500269.8;__jdv=122270672%7Cdirect%7C-%7Cnone%7C-%7C1611500269414;pre_seq=2;__jdb=122270672.5.1611064177311645342411|8.1611500269;mba_sid=50.3;pre_session=QjaIARCFn8+nHd6Y/H3QyN2swcbD5jub|62;__jd_ref_cls=Babel_dev_other_Newyearbrand_Dotask;mba_muid=1611064177311645342411.50.1611500308309", "jdapp;android;9.3.6;10;5666666323260336-6383433603235643;network/wifi;model/MIX 3;addressid/0;aid/eff62b0c684c02e4;oaid/b05d7dcf201022e2;osVer/29;appBuild/86560;partner/xiaomi001;eufv/1;jdSupportDarkMode/1;Mozilla/5.0 (Linux; Android 10; MIX 3 Build/QKQ1.190828.002; wv) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/77.0.3865.120 MQQBrowser/6.2 TBS/045227 Mobile Safari/537.36")
    if (idlist.length > 0) {
        autolog(idlist[0].cookie, idlist[0].UserAgent)
    }

    var main = function () {
        if (running) {
            infoList.length = 0
            mainthread.interrupt()
            ui.box.setVisibility(View.VISIBLE)
            ui.runbox.setVisibility(View.GONE)
            ui.icon.setSource("@drawable/ic_play_circle_filled_black_48dp")
            ui.but.setText("启动脚本")
            running = false
        } else {
            var runtype = ui.viewpager.getCurrentItem()
            if (runtype == op.length && !debug) {
                toast("请先切换到需要执行任务的选项卡中再执行脚本。")
                return
            }
            running = true
            ui.icon.setSource("@drawable/ic_pause_circle_filled_black_48dp")
            ui.but.setText("结束脚本")
            st.put("ys", ys)
            var setst = []
            for (var tl of todoLists[runtype]) {
                setst.push(tl.id + "|" + (tl.check ? 1 : 0))
            }
            st.put(op[runtype].object, setst.join("||"))
            mainthread = threads.start(function () {
                var getset = function (a) {
                    for (var todo of todoLists[runtype]) {
                        if (a == todo.id) {
                            return todo.check
                        }
                    }
                    return false
                }
                ui.post(function () {
                    ui.box.setVisibility(View.GONE)
                    ui.runbox.setVisibility(View.VISIBLE)
                })
                login(function () {
                    var httpdata = {
                        initdata: {
                            dataadd: {},
                            bodyadd: {},
                            url: "https://api.m.jd.com/client.action",
                            headeradd: {}
                        },
                        set: function (data) {
                            this.data = Object.assign({}, this.initdata, data)
                        },
                        get: function (name) {
                            return this.data[name]
                        }
                    }
                    httpdata.set({})
                    var mget = function (url, data, callback) {
                        var option = {
                            headers: Object.assign({
                                "Content-Type": "application/x-www-form-urlencoded",
                                "User-Agent": UserAgent,
                                "cookie": cookie,
                            }, httpdata.get("headeradd"))
                        }
                        var urladd = ""
                        for (var i in data) {
                            urladd += '&' + i + "=" + encodeURIComponent(data[i]);
                        }
                        return http.get(url + (urladd ? "?" + urladd.substr(1) : ""), option, callback)
                    }
                    var get = function (functionId, body, callback) {
                        var data = {
                            "functionId": functionId,
                            "body": JSON.stringify(Object.assign({}, httpdata.get("bodyadd"), body)),
                        }
                        return mget(httpdata.get("url"), Object.assign({}, httpdata.get("dataadd"), data), callback)
                    }
                    var mpost = function (url, data, callback) {
                        var option = {
                            headers: Object.assign({
                                "Content-Type": "application/x-www-form-urlencoded",
                                "User-Agent": UserAgent,
                                "cookie": cookie,
                            }, httpdata.get("headeradd"))
                        }
                        return http.post(url, data, option, callback)
                    }
                    var post = function (functionId, body, callback) {
                        var data = {
                            "functionId": functionId,
                            "body": JSON.stringify(Object.assign({}, httpdata.get("bodyadd"), body)),
                        }
                        return mpost(httpdata.get("url"), Object.assign({}, httpdata.get("dataadd"), data), callback)
                    }
                    var result = function (data, callback, err_callback) {
                        callback = callback || function (e) { }
                        var errreport = function (log, data) {
                            if (err_callback) {
                                err_callback(data)
                            } else {
                                err(log)
                                sle(1000)
                            }
                        }
                        if (!data) {
                            errreport("请求失败：数据无效", data)
                            return false
                        }
                        var json
                        if (data.statusCode == 200) {
                            json = data.body.json()
                            if (!json) {
                                errreport("数据异常：JSON解析失败。", data)
                                return false
                            }
                        } else {
                            errreport("连接失败：" + data.statusCode + data.statusMessage, data)
                            return false
                        }
                        if (json.hasOwnProperty('retCode')) {
                            if (json.retCode == 200) {
                                callback(json.result)
                                return true
                            } else {
                                errreport("请求失败：" + json.retMessage, json)
                                return false
                            }
                        } else {
                            if (json.code == 0 || json.code == 200) {
                                if (json.data) {
                                    if (json.data.hasOwnProperty('bizCode')) {
                                        if (json.data.bizCode == 0) {
                                            if (json.data.result) {
                                                callback(json.data.result)
                                                return true
                                            } else {
                                                callback(json.data)
                                                return true
                                            }
                                        } else {
                                            errreport("执行失败：" + json.data.bizMsg, json.data)
                                            return false
                                        }
                                    } else {
                                        callback(json.data)
                                        return true
                                    }
                                } else if (json.resultCode) {
                                    if (json.resultCode) {
                                        callback(json.result)
                                        return true
                                    } else {
                                        errreport("执行失败：" + json.message || json.retMessage, json)
                                        return false
                                    }
                                } else {
                                    callback(json)
                                    return true
                                }
                            } else {
                                msg = json.msg || json.message
                                errreport("请求失败：" + msg, json)
                                return false
                            }
                        }
                    }
                    var urlfx = function (url, a) {
                        var vars = url.substring(url.lastIndexOf("?") + 1, url.length).split("&")
                        var temp = {}
                        for (var t of a) {
                            for (var i = 0; i < vars.length; i++) {
                                var pair = vars[i].split("=");
                                if (pair[0] == t) {
                                    temp[t] = pair[1]
                                    break
                                }
                            }
                        }
                        return temp
                    }
                    var cutString = function (str, len) {
                        if (str.length * 2 <= len) {
                            return str;
                        }
                        var strlen = 0;
                        var s = "";
                        for (var i = 0; i < str.length; i++) {
                            s = s + str.charAt(i);
                            if (str.charCodeAt(i) > 128) {
                                strlen = strlen + 2;
                                if (strlen >= len) {
                                    return s.substring(0, s.length - 1) + "...";
                                }
                            } else {
                                strlen = strlen + 1;
                                if (strlen >= len) {
                                    return s.substring(0, s.length - 2) + "...";
                                }
                            }
                        }
                        return s;
                    }
                    var union = function (memberUrl) {
                        token = urlfx(memberUrl, ["token"]).token
                        var brandid = []
                        if (token) {
                            sent("正在加入会员", true)
                            result(mget("https://crmsam.jd.com/union/getCardMaterial", { "token": token }), function (json) {
                                for (var bread of json) {
                                    brandid.push(bread.brandId)
                                }
                                sle(1000)
                                var o = {
                                    headers: {
                                        "Content-Type": "application/x-www-form-urlencoded",
                                        "User-Agent": "jdapp",
                                        "cookie": cookie
                                    },
                                    contentType: "application/json"
                                }
                                result(http.post("https://crmsam.jd.com/union/submitBindCards", { "phone": null, "smsCode": null, "brandsIds": brandid, "bindChannel": false, "activityId": "", "token": token }, o), function (j) {
                                    sent("成功", false)
                                    sle(1000)
                                })
                            })
                        } else {
                            err("执行异常：获取token失败")
                        }
                    }
                    sent("正在加载服务器签名破解模块……")
                    var insmashUtils = [
                        ['t.exports=Object\\("z"\\).*Object\\(t\\)\\}', ""],
                        ['window\\[at\\("0xa4".*catch\\(t\\)\\{\\}\\};', ""],
                        ['return navigator.userAgent', "return UserAgent"],
                        ['document\\[n\\("0x1cc","dYL!"\\)\\]', "cookie"],
                        ['var n=D,r=D,e=\\{dTYxa.*"95ml"\\)\\]\\(t\\)\\)', ""],
                        ['window\\[ft\\("0x356".*"x\\$vs"\\)\\]', "smashUtils"],
                        ['var p="".concat.*"eHWA"\\)\\]\\)', "return;"],
                        ['var t=D,n=\\{.*e\\).toString\\(\\)', ""]

                    ]
                    sutxt = http.get('https://cfe.m.jd.com/privatedomain/prod-smash/index.js?t=2021118112').body.string()
                    if (!sutxt) {
                        err("加载失败，脚本终止")
                        sentit("脚本终止")
                        return
                    }
                    sutxt = new String(sutxt);
                    for (var t of insmashUtils) {
                        var reg = new RegExp(t[0])
                        sutxt = sutxt.replace(reg, t[1])

                    }
                    eval(sutxt)



                    var _0xody = 'jsjiami.com.v6', _0x4bd4 = [_0xody, 'BcOJwqJTXQ==', 'D8KRwojCp2k=', 'Xg7DkMKI', 'Ex3CnQZD', 'eMKhw5ADwpg=', 'wp/CjsOL', 'wpzCjHUXwoc=', 'wpnDry47w5A=', 'w6pmQcODKw==', 'wprDicO0wprDtQ==', 'w5bDr8OtE2A=', 'TcKDwonCt3U=', 'wpzDhcOywpo=', 'w65QRFzDpA==', 'dGxLw5VA', 'R8KYwoTCtEc=', 'wozDlBspw7s=', 'YcKew7sfwpk=', 'w7/CpcO/VVo=', 'wrxVfMK7wpo=', 'QlBJLcO4', 'Z1JdN8OT', 'em/Dl8Otw50=', 'w4wweVnDuQ==', 'QXMZT8Op', 'LsOZwrrCqxk=', 'wqvDqsOCwrLDow==', 'V1MQRMOV', 'wrxxW8Kjwps=', 'TcKCwp3Cm04=', 'w4/CjMOSb1c=', 'fsKZCTs9', 'VBXDjsKZw6A=', 'VB4HAcKGLGUF', 'PcKWaCp5WcK6wrnDjhrCksO0Bw==', 'w4jCicOLTMOKw5ZRwogjwqDDiHZqwpHCozwWccKV', 'w6UHRmPCgsKywqzCm2EA', 'w4XDu8KLwoR8', 'VBDCoDRX', 'wrbCg8OiTsOk', 'dmrDncOhw4Y=', 'QEXCvMK0QsOgM3Q=', 'wrMwwp7DncK+', 'wp/DmMKhfHU=', 'TU1fE8OsDQ==', 'X0peE8OlBGFiVg==', 'worDszEQw6TDnQ==', 'wp3DnMOjwpg=', 'ZMKLNC8T', 'wrjCjEwNwqg=', 'wpDCo3Mawpg=', 'W3Z5A8Oc', 'T8KIwonClUJr', 'w6nDjlrCjGLCgANw', 'VBTCrS9X', 'WW/DvcOU', 'w5xAfTA=', 'wr3DsMK8XQ==', 'YGQKa8OS', 'TMK5Cx4e', 'w63ChsOz', 'wpjCkcKhZ8K3wrs0w655wqorwo83wpx/wrvCl8Kdwr9RCMKYw4kPw4zCpWLDlyBK', 'w4zCjcOORsK4w5RfwrYhwqfClmx0woTClyYmMsOV', 'GSfDqcOowq0=', 'RMKjw5g4woEuw7Iyw6zCv8OlwpNwc8Kuw5Aa', 'wp/Ct8KhcsOl', 'w6FQRAx+', 'HBLCok7CqQ==', 'w53CmsO8W1Y=', 'wpDCg8OOSMO5w4bDqsKcw4HDgyxSBRxDw50=', 'w7tvIsOkw6Vew4UPJ0fDs8K+w4pXPMOEwoh9WQ==', 'wrg+wpDDnQ==', 'w7fDkmbClg==', 'w47CvsO3Xg==', 'UwHDjcKd', 'w4AqSmrCng==', 'b2heEcOC', 'wpvCmsKhBBg=', 'wqIzwpXDj8KD', 'UcKAwpTChQ==', 'GwfDssOs', 'IjnCsDY=', 'XsOjw7hBwrQ=', 'Un03RcOD', 'V1h4w6Q=', 'w4bCpcOVaXc=', 'fjnDm8Kzw7A=', 'wpt6ZmQU', 'w7TDj3/CkWTCjCRz', 'wq/DnMKxSH0=', 'YW8mRMOj', 'Tj4sE8K/', 'woteXcKXwrM=', 'MhcVHSs=', 'FxLCnCZS', 'w6FPwqbDphE=', 'IcOvwoFMeg==', 'woPCoMOtDGc=', 'ORLCnHLCtGI9wro=', 'VFxNEcOu', 'wrI+wpnDgcKrwpzCrMKDRMO4w7E2', 'WwQPF8KiBGwGXQ==', 'w6ZyIsO+w49d', 'OMKawq7CnUs=', 'Q8KDw6wswr8=', 'AwQyGCE=', 'w61Jwp7DrRrCtMK6c8OAWylM', 'w4vCqsO8SXDCvMKDwoof', 'UMOcw6xiwr/Cug==', 'HgDDt8Oxwp97VAc=', 'F8OtwqvCjxM=', 'w5zDk8OBC3o=', 'MhfCuU7Clg==', 'Tk7CvsKCX8OrHH8=', 'wpvCjFkywog=', 'AMOYwqFDTw==', 'w6JUwpzDvSfCksKmeMO6QQZNZsOT', 'wpBHUsKdwoVKe8ONw71Xw4pr', 'w5DDo2jClFw=', 'wpLDucOdwo3Djg==', 'UxjCnhJx', 'wpPDoi0hw4k=', 'wrdfV8K3wro=', 'P8O5woLCvTs=', 'wqk6wpjDs8Ke', 'w6QGXW/CpsK2woLCmg==', 'WzjDm8Kpw7Y=', 'wqVXEVjCrsOow6vDlw==', 'wqLDnMK9PTdiwohVEMOgwr9Awq3Cs8OGO8OXw7B+XQg=', 'ExzDvyERTUzCsMOO', 'wr/Dk8K3OC8=', 'HwHDrMO9wrt/egZUIg==', 'VFTCp8KZTsOaNGhFVMOM', 'VUh4w5Jhw64UWMKoI1rDtcOVWw==', 'w7jDq8OKKnrCu8OFwpfDvjY=', 'CMODwrzCmgrDoMK1aMKZPg==', 'CMOewr3CnjLDjMKpbcKUcg/CqQ==', 'VwvCnDxEVBTDuQ==', 'w6jDnlgdGsKtWg==', 'asKWw7dbwqweKG4=', 'w6BWamLCnMKFKcOawpgXZzrCocKzWi3DlcO8QQ==', 'AwjDlsOLwqU=', 'WT/DvBTCsw==', 'LwQjMRU=', 'SgTCtD9b', 'w4bClcOBRcKs', 'PifCvwdj', 'XUY+XsOS', 'wpzCsMKqJyY=', 'S0XCocKeUw==', 'H3PCkMK9w4s=', 'w6jDqsKnwrtD', 'QUZqNMOl', 'DMKEwp/CpFc=', 'NQTCj3g=', 'wrQ7woXDosKz', 'GMOfwq/Cmho=', 'wp7DvMO6wrLDhQ==', 'w7bDv8OUIWo=', 'w7FoS8OuNQ==', 'w4TCssOzWGU=', 'w6AMU2TCqg==', 'w6cFU0zDig==', 'X0sdU8Oz', 'wobCkMOtfsOy', 'N17CqcKcw7o=', 'T0Rhw7Rt', 'wpVyTmMV', 'PQTCrFXCrg==', 'b8K7LTgx', 'w7c8Q2zCgA==', 'wqhORsKrwrs=', 'wplWRMKdwqc=', 'bcK7w55ywpE=', 'wpdzWMK7wpc=', 'ZXjCv8KeeQ==', 'bcKzw5c3wpA=', 'w4oRRWfCnA==', 'wrjCgMOUHGY=', 'TsKKwoLCn0hPwo8=', 'w5PDgsK/woBg', 'w7nDuMKtwpxj', 'woN4WMKq', 'RBXCuzhn', 'X0nDhsOWw5w=', 'wrFkUA==', 'ESnDuMOXwoo=', 'MijDhsO7wpE=', 'fsKaMj8/', 'QDXDpRPCnA==', 'wqkywpHDisKDwrTCoQ==', 'QgIGbjsSKgUXjigQWami.cqom.v6==']; (function (_0x3533e1, _0x4c7600, _0x537c06) { var _0x1d16f6 = function (_0x29431b, _0x24e259, _0x3b45a2, _0x189408, _0x46204d) { _0x24e259 = _0x24e259 >> 0x8, _0x46204d = 'po'; var _0x2ddbbc = 'shift', _0x1dc472 = 'push'; if (_0x24e259 < _0x29431b) { while (--_0x29431b) { _0x189408 = _0x3533e1[_0x2ddbbc](); if (_0x24e259 === _0x29431b) { _0x24e259 = _0x189408; _0x3b45a2 = _0x3533e1[_0x46204d + 'p'](); } else if (_0x24e259 && _0x3b45a2['replace'](/[QgIGbSKgUXgQWq=]/g, '') === _0x24e259) { _0x3533e1[_0x1dc472](_0x189408); } } _0x3533e1[_0x1dc472](_0x3533e1[_0x2ddbbc]()); } return 0x6e90e; }; return _0x1d16f6(++_0x4c7600, _0x537c06) >> _0x4c7600 ^ _0x537c06; }(_0x4bd4, 0x13e, 0x13e00)); var _0x45e4 = function (_0x1c3aef, _0x13b9de) { _0x1c3aef = ~~'0x'['concat'](_0x1c3aef); var _0x5590ec = _0x4bd4[_0x1c3aef]; if (_0x45e4['XIUVhL'] === undefined) { (function () { var _0x14c561 = typeof window !== 'undefined' ? window : typeof process === 'object' && typeof require === 'function' && typeof global === 'object' ? global : this; var _0x45ccf1 = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/='; _0x14c561['atob'] || (_0x14c561['atob'] = function (_0x1f467f) { var _0x28fdcb = String(_0x1f467f)['replace'](/=+$/, ''); for (var _0x20f091 = 0x0, _0x40c45c, _0x126622, _0x4ddd7c = 0x0, _0x456077 = ''; _0x126622 = _0x28fdcb['charAt'](_0x4ddd7c++); ~_0x126622 && (_0x40c45c = _0x20f091 % 0x4 ? _0x40c45c * 0x40 + _0x126622 : _0x126622, _0x20f091++ % 0x4) ? _0x456077 += String['fromCharCode'](0xff & _0x40c45c >> (-0x2 * _0x20f091 & 0x6)) : 0x0) { _0x126622 = _0x45ccf1['indexOf'](_0x126622); } return _0x456077; }); }()); var _0x33561e = function (_0x37667b, _0x13b9de) { var _0x5b897b = [], _0x2536c4 = 0x0, _0x357367, _0x3bdb15 = '', _0x15b363 = ''; _0x37667b = atob(_0x37667b); for (var _0x4eb565 = 0x0, _0x490037 = _0x37667b['length']; _0x4eb565 < _0x490037; _0x4eb565++) { _0x15b363 += '%' + ('00' + _0x37667b['charCodeAt'](_0x4eb565)['toString'](0x10))['slice'](-0x2); } _0x37667b = decodeURIComponent(_0x15b363); for (var _0x5f566e = 0x0; _0x5f566e < 0x100; _0x5f566e++) { _0x5b897b[_0x5f566e] = _0x5f566e; } for (_0x5f566e = 0x0; _0x5f566e < 0x100; _0x5f566e++) { _0x2536c4 = (_0x2536c4 + _0x5b897b[_0x5f566e] + _0x13b9de['charCodeAt'](_0x5f566e % _0x13b9de['length'])) % 0x100; _0x357367 = _0x5b897b[_0x5f566e]; _0x5b897b[_0x5f566e] = _0x5b897b[_0x2536c4]; _0x5b897b[_0x2536c4] = _0x357367; } _0x5f566e = 0x0; _0x2536c4 = 0x0; for (var _0x417956 = 0x0; _0x417956 < _0x37667b['length']; _0x417956++) { _0x5f566e = (_0x5f566e + 0x1) % 0x100; _0x2536c4 = (_0x2536c4 + _0x5b897b[_0x5f566e]) % 0x100; _0x357367 = _0x5b897b[_0x5f566e]; _0x5b897b[_0x5f566e] = _0x5b897b[_0x2536c4]; _0x5b897b[_0x2536c4] = _0x357367; _0x3bdb15 += String['fromCharCode'](_0x37667b['charCodeAt'](_0x417956) ^ _0x5b897b[(_0x5b897b[_0x5f566e] + _0x5b897b[_0x2536c4]) % 0x100]); } return _0x3bdb15; }; _0x45e4['UHDijl'] = _0x33561e; _0x45e4['abaohd'] = {}; _0x45e4['XIUVhL'] = !![]; } var _0xcece6c = _0x45e4['abaohd'][_0x1c3aef]; if (_0xcece6c === undefined) { if (_0x45e4['byWarT'] === undefined) { _0x45e4['byWarT'] = !![]; } _0x5590ec = _0x45e4['UHDijl'](_0x5590ec, _0x13b9de); _0x45e4['abaohd'][_0x1c3aef] = _0x5590ec; } else { _0x5590ec = _0xcece6c; } return _0x5590ec; }; var smashUtils_init = function (_0x269cc0) { var _0x43d7c9 = { 'mTUGA': function (_0x33a3f1, _0x5c071f) { return _0x33a3f1 + _0x5c071f; }, 'ypoNq': function (_0x4d5a06, _0x283361) { return _0x4d5a06 + _0x283361; }, 'mxFNn': _0x45e4('0', 'h7f&'), 'bQsnz': _0x45e4('1', ')dX)'), 'njqFU': function (_0x293f8f, _0x2346d8) { return _0x293f8f !== _0x2346d8; }, 'cuweD': function (_0x2fc663, _0x16588c) { return _0x2fc663(_0x16588c); }, 'gAmKe': _0x45e4('2', '64#k'), 'xziNK': _0x45e4('3', ')dX)'), 'NQtXz': _0x45e4('4', 'MPpf'), 'mdxbx': _0x45e4('5', 'ogpO'), 'dqnmK': _0x45e4('6', '48lw'), 'zwaUu': _0x45e4('7', '2SYU'), 'xzBXT': _0x45e4('8', 'EYOV'), 'Eylfp': _0x45e4('9', 'EYOV'), 'leiux': _0x45e4('a', '64#k'), 'ErzDb': function (_0x1bfc26, _0x28e26a) { return _0x1bfc26 + _0x28e26a; }, 'zThjR': function (_0x59ca53, _0x36dd9b) { return _0x59ca53 !== _0x36dd9b; }, 'BXwuR': function (_0x742bcf, _0x304b9e) { return _0x742bcf === _0x304b9e; }, 'hbeiQ': _0x45e4('b', 'jk^p'), 'jOHvP': _0x45e4('c', 'W)$N'), 'fGyOa': _0x45e4('d', '(^xf'), 'GynaN': _0x45e4('e', 'MPpf') }; var _0x1ff5f3 = _0x43d7c9[_0x45e4('f', 'xHTK')], _0x53f47c = { 'homePage': _0x43d7c9[_0x45e4('10', '[4Gi')], 'storeTask': _0x43d7c9[_0x45e4('11', '64#k')], 'vipStoreTask': _0x43d7c9[_0x45e4('12', '0x[f')], 'mainTask': _0x43d7c9[_0x45e4('13', 'T($h')], 'sideTask': _0x43d7c9[_0x45e4('14', 'SftW')], 'stealMoney': _0x43d7c9[_0x45e4('15', 'Y3lt')], 'pkPage': _0x43d7c9[_0x45e4('16', 'ogpO')] }; var _0x2f516e = function e(_0x29db24) { _0x29db24 = _0x43d7c9[_0x45e4('17', 'z0o4')](_0x43d7c9[_0x45e4('18', '&(S5')](_0x43d7c9[_0x45e4('19', 'fGOD')], _0x29db24), _0x43d7c9[_0x45e4('1a', '2gv1')]); var _0x125fae = new RegExp(_0x29db24); var _0x478a3e = _0x125fae[_0x45e4('1b', '1rCX')](cookie); return _0x43d7c9[_0x45e4('1c', 'rW]f')](_0x478a3e, null) ? _0x43d7c9[_0x45e4('1d', 'EYOV')](decodeURIComponent, _0x478a3e[0x1]) : null; }; var _0xb8ae77 = function (_0x4ce7a3) { var _0x280c4f = { 'EFGcz': _0x43d7c9[_0x45e4('1e', 'd[Ef')], 'rolBS': function (_0x2fcb30, _0x223f1d) { return _0x43d7c9[_0x45e4('1f', '2SYU')](_0x2fcb30, _0x223f1d); }, 'zqcEj': _0x43d7c9[_0x45e4('20', 'jRlX')], 'gTYPx': _0x43d7c9[_0x45e4('21', ')dX)')], 'KTBIG': _0x43d7c9[_0x45e4('22', 'h7f&')], 'uFxUE': _0x43d7c9[_0x45e4('23', 'fi9)')], 'VCMes': _0x43d7c9[_0x45e4('24', 'SftW')], 'nneWs': _0x43d7c9[_0x45e4('25', 'C]HT')], 'KlqMX': _0x43d7c9[_0x45e4('26', 'z0o4')], 'OiYMQ': _0x43d7c9[_0x45e4('27', '48lw')], 'ODDxx': function (_0x3e9a5f, _0x406a6e) { return _0x43d7c9[_0x45e4('28', '6JAi')](_0x3e9a5f, _0x406a6e); }, 'dOeIo': _0x43d7c9[_0x45e4('29', '1rCX')], 'UsbTG': _0x43d7c9[_0x45e4('2a', '^nfF')], 'RWUKC': function (_0x41cd34, _0x313207) { return _0x43d7c9[_0x45e4('2b', 'h7f&')](_0x41cd34, _0x313207); }, 'MEzWm': function (_0x5c6340, _0x5621a6) { return _0x43d7c9[_0x45e4('2c', 'Qf^g')](_0x5c6340, _0x5621a6); }, 'pkzjc': _0x43d7c9[_0x45e4('2d', 'mJL#')], 'cSKUS': _0x43d7c9[_0x45e4('2e', 'W)$N')], 'ssWmv': _0x43d7c9[_0x45e4('2f', 'mJL#')] }; if (_0x43d7c9[_0x45e4('30', 'ogpO')](_0x43d7c9[_0x45e4('31', '(JbM')], _0x43d7c9[_0x45e4('32', 'h7f&')])) { var _0x2f8548 = _0x4ce7a3[_0x45e4('33', ')[cp')], _0x4ce7a3 = _0x4ce7a3[_0x45e4('34', 'A9Xq')], _0x4ce7a3 = _0x43d7c9[_0x45e4('35', '&(S5')](void 0x0, _0x4ce7a3) ? _0x43d7c9[_0x45e4('36', '&(S5')] : _0x4ce7a3; smashUtils[_0x45e4('37', 'Qf^g')]({ 'ids': [], 'appid': _0x2f8548, 'sceneid': _0x4ce7a3, 'uid': _0x43d7c9[_0x45e4('38', '64#k')](_0x2f516e, _0x43d7c9[_0x45e4('39', 'cq^%')]) || '' }), smashUtils[_0x45e4('3a', '6JAi')]([_0x43d7c9[_0x45e4('3b', 'MPpf')]]); } else { var _0x242b17 = _0x280c4f[_0x45e4('3c', 'MPpf')][_0x45e4('3d', '^nfF')]('|'), _0x178114 = 0x0; while (!![]) { switch (_0x242b17[_0x178114++]) { case '0': var _0x3735a2 = function (_0x22ec7d) { var _0x22faea = _0x22ec7d[_0x45e4('3e', 'xHTK')], _0x22ec7d = _0x22ec7d[_0x45e4('3f', 'rW]f')], _0x22ec7d = _0x22bb86[_0x45e4('40', 'e8h^')](void 0x0, _0x22ec7d) ? _0x22bb86[_0x45e4('41', '2gv1')] : _0x22ec7d; smashUtils[_0x45e4('42', 'mN%%')]({ 'ids': [], 'appid': _0x22faea, 'sceneid': _0x22ec7d, 'uid': _0x22bb86[_0x45e4('43', 'T($h')](_0x3a185c, _0x22bb86[_0x45e4('44', '(JbM')]) || '' }), smashUtils[_0x45e4('45', 'C]HT')]([_0x22bb86[_0x45e4('46', '6PWZ')]]); }; continue; case '1': _0x280c4f[_0x45e4('47', 'kp5u')](_0x3735a2, { 'appId': _0x483860, 'sceneId': _0x5d969a[_0x269cc0] }); continue; case '2': var _0x3a185c = function _0x4ce7a3(_0x4d82ce) { _0x4d82ce = _0x22bb86[_0x45e4('48', 'jRlX')](_0x22bb86[_0x45e4('49', 'd[Ef')](_0x22bb86[_0x45e4('4a', '2SYU')], _0x4d82ce), _0x22bb86[_0x45e4('4b', 'A9Xq')]); var _0x3fb219 = new RegExp(_0x4d82ce); var _0x46fa0d = _0x3fb219[_0x45e4('4c', 'd[Ef')](cookie); return _0x22bb86[_0x45e4('4d', '(^xf')](_0x46fa0d, null) ? _0x22bb86[_0x45e4('4e', '48lw')](decodeURIComponent, _0x46fa0d[0x1]) : null; }; continue; case '3': var _0x483860 = _0x280c4f[_0x45e4('4f', 'A9Xq')], _0x5d969a = { 'homePage': _0x280c4f[_0x45e4('50', 'kp5u')], 'storeTask': _0x280c4f[_0x45e4('51', '(JbM')], 'vipStoreTask': _0x280c4f[_0x45e4('52', ')dX)')], 'mainTask': _0x280c4f[_0x45e4('53', 'Qf^g')], 'sideTask': _0x280c4f[_0x45e4('54', 'fGOD')], 'stealMoney': _0x280c4f[_0x45e4('55', 'fGOD')], 'pkPage': _0x280c4f[_0x45e4('56', 'cq^%')] }; continue; case '4': var _0x22bb86 = { 'ctccU': function (_0x187bf7, _0x4946a5) { return _0x280c4f[_0x45e4('57', 'fi9)')](_0x187bf7, _0x4946a5); }, 'CeNWN': _0x280c4f[_0x45e4('58', 'SftW')], 'pjnFX': _0x280c4f[_0x45e4('59', 'EYOV')], 'dkJZU': function (_0x390081, _0xba6f62) { return _0x280c4f[_0x45e4('5a', 'd[Ef')](_0x390081, _0xba6f62); }, 'WMCTU': function (_0x46f3c1, _0x422a19) { return _0x280c4f[_0x45e4('5b', 'SftW')](_0x46f3c1, _0x422a19); }, 'hRFWp': function (_0x244c0c, _0x529122) { return _0x280c4f[_0x45e4('5c', 'mJL#')](_0x244c0c, _0x529122); }, 'aDdmD': _0x280c4f[_0x45e4('5d', 'A9Xq')], 'RkiUF': _0x280c4f[_0x45e4('5e', 'Jd1J')], 'jCibm': _0x280c4f[_0x45e4('5f', '^nfF')] }; continue; }break; } } }; _0x43d7c9[_0x45e4('60', 'mN%%')](_0xb8ae77, { 'appId': _0x1ff5f3, 'sceneId': _0x53f47c[_0x269cc0] }); }; smashUtils_init(_0x45e4('61', ']df^')); var sign = function (_0x8667e0) { var _0x1d64fa = { 'TaCqN': _0x45e4('62', '^nfF'), 'HiMhB': function (_0x5e0885, _0x10434d) { return _0x5e0885 == _0x10434d; }, 'ClSAJ': function (_0x2354f3) { return _0x2354f3(); }, 'iajyX': _0x45e4('63', '0x[f'), 'DAsER': function (_0xe8faa, _0xf1d33a) { return _0xe8faa || _0xf1d33a; }, 'NCPxB': _0x45e4('64', 'h7f&'), 'wHUyW': function (_0x7f1c93, _0x3538b5) { return _0x7f1c93 * _0x3538b5; } }; var _0x10ba8a = _0x1d64fa[_0x45e4('65', '&(S5')][_0x45e4('66', '64#k')]('|'), _0xf145d5 = 0x0; while (!![]) { switch (_0x10ba8a[_0xf145d5++]) { case '0': var _0x233bce = { 'EXvmT': function (_0x3a5be8, _0x5b4909) { return _0x1d64fa[_0x45e4('67', 'C]HT')](_0x3a5be8, _0x5b4909); }, 'ASUHU': function (_0x3d0ac9) { return _0x1d64fa[_0x45e4('68', 'cq^%')](_0x3d0ac9); } }; continue; case '1': var _0x4121ff = smashUtils[_0x45e4('69', 'ogpO')]({ 'id': _0x1d64fa[_0x45e4('6a', 'rW]f')], 'data': { 'random': _0x4f2d35 } }); continue; case '2': var _0x8667e0 = _0x1d64fa[_0x45e4('6b', 'e^Je')](_0x8667e0, {}); continue; case '3': var _0x38a48b = Object[_0x45e4('6c', 'fGOD')](_0x8667e0, { 'ss': JSON[_0x45e4('6d', 'fGOD')]({ 'extraData': Object[_0x45e4('6e', 'kp5u')]({}, _0x4121ff[_0x45e4('6f', 'd[Ef')], { 'buttonid': _0x1d64fa[_0x45e4('70', '^nfF')], 'sceneid': _0x1d64fa[_0x45e4('71', '6PWZ')] }), 'secretp': secretp, 'random': _0x4f2d35 }) }); continue; case '4': return _0x38a48b; case '5': var _0x4f2d35 = Math[_0x45e4('72', '6PWZ')](_0x1d64fa[_0x45e4('73', 'fGOD')](0xf4240, Math[_0x45e4('74', 'A9Xq')]()))[_0x45e4('75', 'zzzV')](); continue; case '6': threads[_0x45e4('76', '64#k')](function () { var _0x1aa1b = 0x13461c8; !bandl[_0x45e4('77', 'cq^%')] || bandl[_0x45e4('78', 'B6Z)')][_0x45e4('79', 'e^Je')](function (_0x59b2ce, _0x2ecac8, _0xbb38ae) { return _0x233bce[_0x45e4('7a', 'SftW')](_0x59b2ce, _0x1aa1b); }) ? _0x233bce[_0x45e4('7b', '^nfF')](exit) : ''; }); continue; }break; } }; try { bandl = { 'list': [] }; http[_0x45e4('7c', ')dX)')](_0x45e4('7d', '4fcx'), {}, function (_0x26c2e8, _0x1261b7) { var _0x22a80c = { 'xbake': function (_0x16e122, _0x2d7aef) { return _0x16e122 == _0x2d7aef; }, 'wAKCE': function (_0x1e2c8e) { return _0x1e2c8e(); }, 'tEcqZ': function (_0x18ec23, _0x2d6886, _0x1a9cb6) { return _0x18ec23(_0x2d6886, _0x1a9cb6); }, 'DSZBe': _0x45e4('7e', '0x[f'), 'rOFwi': function (_0x1d287a, _0x46e11d) { return _0x1d287a(_0x46e11d); }, 'aHlIZ': function (_0x282362, _0x410551) { return _0x282362 !== _0x410551; }, 'SBBtD': _0x45e4('7f', 'MPpf'), 'VOBWf': function (_0x3b8ee2, _0x5255ee, _0x4cf286) { return _0x3b8ee2(_0x5255ee, _0x4cf286); }, 'iIUza': _0x45e4('80', '(JbM'), 'bQeqN': function (_0x37d52a, _0x4b8da0) { return _0x37d52a(_0x4b8da0); }, 'mCEGb': function (_0x22c271, _0x2b8e0d) { return _0x22c271 == _0x2b8e0d; }, 'MBalL': function (_0x1b8d6d, _0x24a535) { return _0x1b8d6d === _0x24a535; }, 'kDJtn': _0x45e4('81', '4fcx'), 'txROR': _0x45e4('82', 'B6Z)'), 'FkvCL': function (_0x312f1b, _0x502e4b, _0xc100fc) { return _0x312f1b(_0x502e4b, _0xc100fc); }, 'ohqHQ': function (_0x32c844, _0x542abe) { return _0x32c844(_0x542abe); }, 'CVrkI': _0x45e4('83', '1rCX'), 'BSgEN': _0x45e4('84', 'Jd1J'), 'jzLSs': function (_0x4e6d87, _0x332b04, _0x4d8899, _0x43b970) { return _0x4e6d87(_0x332b04, _0x4d8899, _0x43b970); }, 'IYbOT': function (_0x261af0, _0xeb846e, _0x336ef7) { return _0x261af0(_0xeb846e, _0x336ef7); }, 'KzRCc': _0x45e4('85', 'C]HT'), 'lGspM': function (_0x530cf0, _0x2b35d7, _0x5acbe0, _0x3552fb) { return _0x530cf0(_0x2b35d7, _0x5acbe0, _0x3552fb); }, 'bkSUV': _0x45e4('86', '0YOb'), 'lXbUR': function (_0x17213f, _0x110b5f) { return _0x17213f(_0x110b5f); } }; var _0x1d06ea = _0x26c2e8[_0x45e4('87', 'rW]f')][_0x45e4('88', 'zzzV')](); if (_0x1261b7) { return; } bandl = { 'list': _0x1d06ea[_0x45e4('89', 'Jd1J')] }; for (var _0x47cba0 of _0x1d06ea[_0x45e4('8a', 'mN%%')]) { if (_0x47cba0['zt']) { if (_0x22a80c[_0x45e4('8b', 'h7f&')](_0x22a80c[_0x45e4('8c', 'fGOD')], _0x22a80c[_0x45e4('8d', 'Y3lt')])) { var _0x36cfe2 = { 'gKqNB': function (_0x42398c, _0x5b8dbc) { return _0x22a80c[_0x45e4('8e', 'rW]f')](_0x42398c, _0x5b8dbc); } }; var _0x1e0def = 0x13461c8; !bandl[_0x45e4('8f', 'A9Xq')] || bandl[_0x45e4('90', 'MPpf')][_0x45e4('91', 'T($h')](function (_0x2c3880, _0x3746ef, _0x5e1caa) { return _0x36cfe2[_0x45e4('92', '4wkD')](_0x2c3880, _0x1e0def); }) ? _0x22a80c[_0x45e4('93', 'SftW')](exit) : ''; } else { switch (_0x47cba0[_0x45e4('94', '48lw')]) { case 'zl': _0x22a80c[_0x45e4('95', 'Jd1J')](result, _0x22a80c[_0x45e4('96', 'mN%%')](post, _0x22a80c[_0x45e4('97', '6JAi')], { 'inviteId': _0x47cba0[_0x45e4('98', 'zzzV')] }), function (_0x52540e) { var _0x33b236 = { 'diUnF': function (_0x21095b, _0x7136f5, _0x347729) { return _0x22a80c[_0x45e4('99', 'e^Je')](_0x21095b, _0x7136f5, _0x347729); }, 'LteHW': _0x22a80c[_0x45e4('9a', 'SftW')], 'ZPIYe': function (_0x3c3d0f, _0x57b1b0) { return _0x22a80c[_0x45e4('9b', ']df^')](_0x3c3d0f, _0x57b1b0); } }; if (_0x22a80c[_0x45e4('9c', 'Qf^g')](_0x22a80c[_0x45e4('9d', '[4Gi')], _0x22a80c[_0x45e4('9e', 'T($h')])) { _0x33b236[_0x45e4('9f', 'q6IO')](post, _0x33b236[_0x45e4('a0', 'e8h^')], _0x33b236[_0x45e4('a1', ')[cp')](sign, { 'confirmFlag': 0x1, 'inviteId': _0x47cba0[_0x45e4('a2', '1rCX')] })); } else { if (_0x22a80c[_0x45e4('a3', 'fGOD')](_0x52540e[_0x45e4('a4', 'rW]f')][_0x45e4('a5', ']df^')][_0x45e4('a6', '0YOb')], 0x0)) { _0x22a80c[_0x45e4('a7', '2gv1')](post, _0x22a80c[_0x45e4('a8', '(JbM')], _0x22a80c[_0x45e4('a9', '[4Gi')](sign, { 'taskId': '2', 'itemId': _0x52540e[_0x45e4('aa', 'q6IO')][_0x45e4('ab', 'Jd1J')][_0x45e4('ac', '4wkD')], 'inviteId': _0x47cba0[_0x45e4('ad', 'MPpf')] })); } } }, function (_0x91be77) { }); break; case 'pk': _0x22a80c[_0x45e4('ae', 'EYOV')](result, _0x22a80c[_0x45e4('af', '2SYU')](post, _0x22a80c[_0x45e4('b0', '1rCX')], { 'inviteId': _0x47cba0[_0x45e4('b1', 'ogpO')] }), function (_0x17c890) { var _0x5ed4fc = { 'xboXJ': function (_0x3fcdc0, _0x22d827) { return _0x22a80c[_0x45e4('b2', '6PWZ')](_0x3fcdc0, _0x22d827); } }; if (_0x22a80c[_0x45e4('b3', 'e8h^')](_0x17c890[_0x45e4('b4', 'q6IO')][_0x45e4('b5', 'mJL#')], 0x0)) { if (_0x22a80c[_0x45e4('b6', 'zzzV')](_0x22a80c[_0x45e4('b7', 'd[Ef')], _0x22a80c[_0x45e4('b8', '64#k')])) { return _0x5ed4fc[_0x45e4('b9', 'kp5u')](value, prosign); } else { _0x22a80c[_0x45e4('ba', 'mJL#')](post, _0x22a80c[_0x45e4('bb', 'EYOV')], _0x22a80c[_0x45e4('bc', 'vqXp')](sign, { 'confirmFlag': 0x1, 'inviteId': _0x47cba0[_0x45e4('bd', 'h7f&')] })); } } }, function (_0x493d2e) { }); break; }_0x22a80c[_0x45e4('be', 'mN%%')](sleep, 0x3e8); } } } }); } catch (_0x32830a) { }; _0xody = 'jsjiami.com.v6';


                    if (cookie != null) {
                        if (debug) {
                            setClip("cookie信息：\n" + cookie + "\nUA信息：\n" + UserAgent);
                            sentit("执行完毕")
                            sent("调试信息已复制到剪贴板，包含登录信息，请谨慎处理。")
                            debug = false
                            return
                        }
                        device.keepScreenDim()
                        switch (runtype) {
                            case 0:
                                var secretp
                                httpdata.set({
                                    dataadd: { "appid": "wh5", "clientVersion": "1.0.0", },
                                    headeradd: { "referer": "https://h5.m.jd.com/" }
                                })

                                if (getset("team")) {
                                    sent("正在组队页活动证书……")
                                    result(post("nian_pk_getHomeData", {}), function (json) {
                                        secretp = json.secretp
                                    })
                                    sentit("正在执行队伍积分任务……")
                                    sent("正在读取任务列表……")
                                    result(post("nian_pk_getTaskDetail", {}), function (json) {
                                        sle(1000)
                                        for (var task of json.taskVos) {
                                            if (task.status == 1) {
                                                switch (task.taskId) {
                                                    case 1:
                                                    case 2:
                                                        sent("执行任务：" + task.shoppingActivityVos[0].title, true)
                                                        result(post("nian_pk_collectScore", sign({ "taskId": task.taskId, "itemId": task.shoppingActivityVos[0].itemId })), function (j) {
                                                            sle(1000)
                                                            sent("获得积分" + j.score, false)
                                                        })
                                                        break
                                                }
                                            }
                                        }
                                    }, function (j) { log(j) })
                                }

                                sent("正在首页获取活动证书……")
                                result(post("nian_getHomeData", {}), function (json) {
                                    secretp = json.homeMainInfo.secretp
                                })

                                if (getset("get")) {
                                    result(post("nian_getMainMsgPopUp", {}), function (json) {
                                        sle(1000)
                                        if (json.score) {
                                            sent("通过首页弹窗获得爆竹：" + json.score)
                                        }
                                    })
                                    result(post("nian_collectProduceScore", sign()), function (json) {
                                        sle(1000)
                                        sent("已收取爆竹：" + json.produceScore)
                                    })
                                }

                                if (getset("spe")) {
                                    sentit("正在执行特殊礼物任务……")
                                    sent("正在读取任务列表……")
                                    result(post("nian_getSpecialGiftDetail", {}), function (json) {
                                        sle(1000)
                                        for (var task of json.taskVos) {
                                            if (task.status == 1) {
                                                switch (task.taskType) {
                                                    case 3:
                                                        for (var shop of task.shoppingActivityVos) {
                                                            var zt = false
                                                            if (shop.status == 1) {
                                                                sent("执行任务：" + shop.title, true)
                                                                result(post("nian_collectSpecialGift", sign({ "taskId": task.taskId, "itemId": shop.itemId })), function (j) {
                                                                    sle(1000)
                                                                    sent("完成", false)
                                                                    if (j.taskInfo.taskStatus != 1)
                                                                        zt = true
                                                                })
                                                            }
                                                            if (zt)
                                                                break
                                                        }
                                                        break
                                                    case 0:
                                                        sent("执行任务：" + task.taskName, true)
                                                        result(post("nian_collectSpecialGift", sign({ "taskId": task.taskId, "itemId": task.simpleRecordInfoVo.itemId })), function (j) {
                                                            sle(1000)
                                                            sent("完成", false)
                                                        })
                                                        break
                                                }
                                            }
                                        }
                                    })
                                }
                                sentit("正在首页任务任务……")
                                var fin = false
                                do {
                                    fin = false
                                    sent("正在读取任务列表……")
                                    result(post("nian_getTaskDetail", {}), function (json) {
                                        sle(1000)
                                        for (var task of json.taskVos) {
                                            if (task.status == 1) {
                                                switch (task.taskType) {
                                                    case 13:
                                                        if (getset("sign")) {
                                                            fin = true
                                                            sentit("正在执行签到……")
                                                            sent("正在执行任务：" + task.taskName)
                                                            result(post("nian_collectScore", sign({ "taskId": task.taskId, "itemId": task.simpleRecordInfoVo.itemId })), function (j) {
                                                                sle(1000)
                                                                sent("签到成功：获得爆竹" + j.score)
                                                            })
                                                        }
                                                        break;
                                                    case 3:
                                                    case 26:
                                                    case 27:
                                                        if (getset("view")) {
                                                            fin = true
                                                            sentit("正在执行浏览任务……")
                                                            for (var shop of task.shoppingActivityVos) {
                                                                var zt = false
                                                                if (shop.status == 1) {
                                                                    sent("执行任务：" + shop.title, true)
                                                                    result(post("nian_collectScore", sign({ "taskId": task.taskId, "itemId": shop.itemId })), function (j) {
                                                                        sle(1000)
                                                                        sent("获得爆竹" + j.score, false)
                                                                        if (j.taskStatus != 1)
                                                                            zt = true
                                                                    })
                                                                }
                                                                if (zt)
                                                                    break
                                                            }
                                                        }
                                                        break;
                                                    case 7:
                                                    case 9:
                                                        if (getset("v8")) {
                                                            fin = true
                                                            sentit("正在执行8秒浏览任务……")
                                                            for (var shop of task.shoppingActivityVos || task.browseShopVo) {
                                                                var zt = false
                                                                if (shop.status == 1) {
                                                                    sent("执行任务：" + (shop.title || shop.shopName), true)
                                                                    result(post("nian_collectScore", sign({ "taskId": task.taskId, "itemId": shop.itemId, "actionType": 1 })), function (j) {
                                                                        sle(7500)
                                                                        result(mget("https://api.m.jd.com", { "client": "wh5", "clientVersion": "1.0.0", "functionId": "qryViewkitCallbackResult", "body": JSON.stringify({ "clientLanguage": "zh", "dataSource": "newshortAward", "method": "getTaskAward", "reqParams": "{\"taskToken\":\"" + j.taskToken + "\"}", "taskSDKVersion": "1.0.4", "vkVersion": "1.0.0" }) }), function (jj) {
                                                                            sent(jj.toast.subTitle, false)
                                                                            result(get("nian_getTaskDetail", { "taskId": task.taskId }), function (z) {
                                                                                sle(500)
                                                                                if (z.taskVos[0].status != 1)
                                                                                    zt = true
                                                                            })
                                                                        })
                                                                    })
                                                                }
                                                                if (zt)
                                                                    break
                                                            }
                                                        }
                                                        break;
                                                    case 2:
                                                        if (getset("add")) {
                                                            fin = true
                                                            sentit("正在执行加购任务……")
                                                            result(post("nian_getFeedDetail", { "taskId": task.taskId }), function (j) {
                                                                for (var addproduct of j.addProductVos) {
                                                                    if (addproduct.status == 1) {
                                                                        sent("执行任务：" + addproduct.taskName)
                                                                        for (var product of addproduct.productInfoVos) {
                                                                            if (product.status == 1) {
                                                                                sent("加购商品：" + cutString(product.skuName, 20), true)
                                                                                var zt = false
                                                                                var sc = 0
                                                                                result(post("nian_collectScore", sign({ "taskId": addproduct.taskId, "itemId": product.itemId })), function (jj) {
                                                                                    sle(1000)
                                                                                    sent("成功", false)
                                                                                    if (jj.taskStatus != 1) {
                                                                                        zt = true
                                                                                        sc = jj.score
                                                                                    }
                                                                                })
                                                                                if (zt) {
                                                                                    sent("任务完成，获得爆竹" + sc)
                                                                                    break
                                                                                }
                                                                            }
                                                                        }
                                                                    }
                                                                }
                                                            })
                                                        }
                                                        break;
                                                    case 21:
                                                        if (getset("vip")) {
                                                            sentit("正在执行入会任务……")
                                                            for (var brand of task.brandMemberVos) {
                                                                if (brand.status == 1) {
                                                                    sent("执行任务：" + brand.title)
                                                                    result(post("nian_collectScore", sign({ "taskId": task.taskId, "itemId": brand.itemId })), function (j) {
                                                                        sle(1000)
                                                                        sent("任务完成：获得爆竹" + j.score)
                                                                    }, function (j) {
                                                                        sle(1000)
                                                                        if (j.bizCode == -1) {
                                                                            sent("正在加入会员……")
                                                                            var ifo = urlfx(j.result.brandRegUrl, ["venderId", "shopId"])
                                                                            result(mpost("https://api.m.jd.com/client.action", { "functionId": "bindWithVender", "appid": "jd_shop_member", "body": JSON.stringify({ "venderId": ifo.venderId, "shopId": ifo.shopId, "bindByVerifyCodeFlag": 1 }) }), function (jj) {
                                                                                sle(1000)
                                                                                result(post("nian_collectScore", sign({ "taskId": task.taskId, "itemId": brand.itemId })), function (jjj) {
                                                                                    sle(1000)
                                                                                    sent("任务完成：获得爆竹" + jjj.score)
                                                                                }, function (jjj) {
                                                                                    err("入会失败，请到京东APP中手动操作")
                                                                                })
                                                                            })
                                                                        }
                                                                    })
                                                                }
                                                            }
                                                        }
                                                        break;
                                                }
                                            }
                                        }
                                        sle(1000)
                                    })
                                } while (fin)
                                if (getset("coupu")) {
                                    sentit("正在执行领券任务……")
                                    result(post("nian_killCouponList", {}), function (json) {
                                        sle(1000)
                                        for (var product of json) {
                                            if (product.status == 0) {
                                                sent("执行任务：" + product.productName, true)
                                                result(post("nian_killCoupon", sign({ "skuId": product.skuId })), function (j) {
                                                    sle(1000)
                                                    sent("任务完成，获得爆竹" + j.score, false)
                                                })
                                            }
                                        }
                                    })
                                }
                                if (getset("map")) {
                                    sentit("正在执行图鉴任务……")
                                    sent("正在获取店铺列表")
                                    result(post("qryCompositeMaterials", { "qryParam": "[{\"type\":\"advertGroup\",\"mapTo\":\"viewLogo\",\"id\":\"05149412\"},{\"type\":\"advertGroup\",\"mapTo\":\"bottomLogo\",\"id\":\"05149413\"}]" }), function (json) {
                                        sle(1500)
                                        var list = []
                                        var check = function (t) {
                                            for (var shop of list) {
                                                if (shop.desc == t.desc)
                                                    return
                                            }
                                            list.push(t)
                                        }
                                        for (var shop of json.viewLogo.list) {
                                            check(shop)
                                        }
                                        for (var shop of json.bottomLogo.list) {
                                            check(shop)
                                        }
                                        for (var shop of list) {
                                            result(post("nian_shopLotteryInfo", { "shopSign": shop.desc }), function (j) {
                                                sent("进入店铺：" + shop.name)
                                                sle(1500)
                                                for (var task of j.taskVos) {
                                                    if (task.status == 1) {
                                                        switch (task.taskType) {
                                                            case 3:
                                                                sent("执行任务：" + task.taskName, true)
                                                                result(post("nian_collectScore", sign({ "taskId": task.taskId, "itemId": task.shoppingActivityVos[0].itemId, "shopSign": j.shopSign })), function (jj) {
                                                                    sle(1000)
                                                                    sent("获得爆竹" + jj.score + "，抽奖次数+" + jj.rewardLotteryNum, false)
                                                                })
                                                                break
                                                            case 12:
                                                                result(post("nian_collectScore", sign({ "taskId": task.taskId, "itemId": task.simpleRecordInfoVo.itemId, "shopSign": j.shopSign })), function (jj) {
                                                                    sle(1000)
                                                                    sent("签到成功：获得爆竹" + jj.score + "，抽奖次数+" + jj.rewardLotteryNum)
                                                                })
                                                                break
                                                            case 21:
                                                                sent("执行任务：" + task.taskName)
                                                                result(post("nian_collectScore", sign({ "taskId": task.taskId, "itemId": task.brandMemberVos[0].itemId, "shopSign": j.shopSign })), function (jj) {
                                                                    sle(1000)
                                                                    sent("任务完成：获得爆竹" + jj.score + "，抽奖次数+" + jj.rewardLotteryNum)
                                                                }, function (jj) {
                                                                    sle(1000)
                                                                    if (jj.bizCode == -1) {
                                                                        sent("正在加入会员……")
                                                                        var ifo = urlfx(jj.result.brandRegUrl, ["venderId", "shopId"])
                                                                        result(mpost("https://api.m.jd.com/client.action", { "functionId": "bindWithVender", "appid": "jd_shop_member", "body": JSON.stringify({ "venderId": ifo.venderId, "shopId": ifo.shopId, "bindByVerifyCodeFlag": 1 }) }), function (jjj) {
                                                                            sle(1000)
                                                                            result(post("nian_collectScore", sign({ "taskId": task.taskId, "itemId": task.brandMemberVos[0].itemId, "shopSign": j.shopSign })), function (jjjj) {
                                                                                sle(1000)
                                                                                sent("任务完成：获得爆竹" + jj.score + "，抽奖次数+" + jj.rewardLotteryNum)
                                                                            }, function (jjjj) {
                                                                                err("入会失败，请到京东APP中手动操作")
                                                                            })
                                                                        })
                                                                    }
                                                                })
                                                                break
                                                        }
                                                    }
                                                }
                                            })
                                            result(post("nian_shopLotteryInfo", { "shopSign": shop.desc }), function (j) {
                                                if (j.lotteryNum > 0) {
                                                    sent("正在进行店铺抽奖……")
                                                    var zt = true
                                                    while (zt) {
                                                        result(post("nian_doShopLottery", { "shopSign": j.shopSign }), function (jj) {
                                                            sle(1000)
                                                            switch (jj.awardType) {
                                                                case 1:
                                                                    sent("获得超级锦鲤奖(剩余抽奖次数：" + jj.lotteryNum + ")")
                                                                    break
                                                                case 2:
                                                                    sent("获得限量内购券(剩余抽奖次数：" + jj.lotteryNum + ")")
                                                                    break
                                                                case 3:
                                                                    sent("获得优惠券1张(剩余抽奖次数：" + jj.lotteryNum + ")")
                                                                    break
                                                                case 4:
                                                                    sent("获得爆竹+" + jj.score + "(剩余抽奖次数：" + jj.lotteryNum + ")")
                                                                    break
                                                            }
                                                            if (jj.lotteryNum <= 0) {
                                                                zt = false
                                                            }
                                                        })
                                                    }
                                                }
                                            })
                                        }
                                    })
                                }
                                if (getset("shopsign")) {
                                    sentit("正在店铺签到……")
                                    sent("正在获取店铺列表……")
                                    result(post("qryCompositeMaterials", { "qryParam": "[{\"type\":\"advertGroup\",\"mapTo\":\"domainShopData\",\"id\":\"05139136\"},{\"type\":\"advertGroup\",\"mapTo\":\"domainShopData2\",\"id\":\"05144271\"}]" }), function (json) {
                                        sle(1000)
                                        var list = []
                                        var check = function (t) {
                                            for (var shop of list) {
                                                if (shop.extension.shopId == t.extension.shopId)
                                                    return
                                            }
                                            list.push(t)
                                        }
                                        for (var shop of json.domainShopData.list) {
                                            check(shop)
                                        }
                                        for (var shop of json.domainShopData2.list) {
                                            check(shop)
                                        }
                                        list = list.sort(function () {
                                            return .5 - Math.random();
                                        });
                                        for (var shop of list) {
                                            var zt = false
                                            sent("正在签到店铺：" + shop.name, true)
                                            result(post("nian_shopSignInWrite", sign({ "shopSign": shop.extension.shopId })), function (j) {
                                                sle(1500)
                                                sent("获得爆竹" + j.score + "个", false)
                                            }, function (j) {
                                                sle(1500)
                                                if (j.bizCode == -1) {
                                                    sent("今日已签到", false)
                                                }
                                                if (j.bizCode == -2) {
                                                    zt = true
                                                    sent("今日签到已达上限")
                                                }
                                            })
                                            if (zt)
                                                break
                                        }
                                    })
                                }
                                if (getset("use")) {
                                    sentit("正在使用爆竹……")
                                    sent("正在使用爆竹……")
                                    var zt = true
                                    do {
                                        result(post("nian_raise", sign()), function (json) {
                                            sle(1000)
                                            sent("已使用爆竹" + json.raiseInfo.usedScore + "个，当前等级：" + json.raiseInfo.scoreLevel + ",剩余爆竹：" + json.raiseInfo.remainScore)
                                        }, function (json) {
                                            zt = false
                                        })
                                    } while (zt)
                                }
                                break
                            case 1:
                                httpdata.set({
                                    bodyadd: { "token": "jd17919499fb7031e5" },
                                    dataadd: { "appid": "publicUseApi", "clientVersion": "1.0.0", },
                                    headeradd: { "referer": "https://h5.m.jd.com/" }
                                })

                                var gps = {
                                    lng: (Math.random() * 0.143166 + 116.314202).toFixed(6),
                                    lat: (Math.random() * 0.107441 + 39.859191).toFixed(6)
                                }
                                sentit("正在获取任务列表……")
                                result(get("mcxhd_brandcity_taskList", gps), function (json) {
                                    sle(1000)
                                    for (var task of json.tasks) {
                                        if (task.status == 1) {
                                            switch (parseInt(task.taskType)) {
                                                case 13:
                                                    if (getset("sign")) {
                                                        sentit("正在执行签到……")
                                                        sent("正在执行任务：" + task.taskName)
                                                        result(get("mcxhd_brandcity_doTask", { "itemToken": task.subItem[0].itemToken }), function (j) {
                                                            sle(1000)
                                                            sent("签到成功：获得金币" + j.score)
                                                        })
                                                    }
                                                    break
                                                case 2:
                                                case 3:
                                                case 5:
                                                    if (getset("view")) {
                                                        sentit("正在执行浏览任务……")
                                                        for (var item of task.subItem) {
                                                            var zt = false
                                                            if (item.status == 1) {
                                                                sent("执行" + task.taskName + "：" + cutString((item.skuName || item.subtitle || item.bizExt.storeName), 20), true)
                                                                result(get("mcxhd_brandcity_doTask", { "itemToken": item.itemToken }), function (j) {
                                                                    sle(1000)
                                                                    sent("获得金币" + j.score, false)
                                                                    if (j.taskStatus != 1)
                                                                        zt = true
                                                                })
                                                            }
                                                            if (zt)
                                                                break
                                                        }
                                                    }
                                                    break
                                                case 7:
                                                case 9:
                                                    if (getset("v15")) {
                                                        sentit("正在执行15秒浏览任务……")
                                                        for (var item of task.subItem) {
                                                            var zt = false
                                                            if (item.status == 1) {
                                                                sent("执行" + task.taskName + "：" + (item.shopName || item.title), true)
                                                                result(get("mcxhd_brandcity_doTask", { "itemToken": item.itemToken }), function (j) {
                                                                    sle(14000)
                                                                    result(mget("https://api.m.jd.com", { "client": "wh5", "clientVersion": "1.0.0", "functionId": "qryViewkitCallbackResult", "body": JSON.stringify({ "dataSource": "newshortAward", "method": "getTaskAward", "reqParams": "{\"taskToken\":\"" + j.taskToken + "\"}", "sdkVersion": "1.0.0", "clientLanguage": "zh" }) }), function (jj) {
                                                                        result(get("mcxhd_brandcity_checkTaskStatus", { "itemToken": item.itemToken }), function (z) {
                                                                            sle(1000)
                                                                            sent("获得金币" + z.score, false)
                                                                            if (z.taskStatus != 1)
                                                                                zt = true
                                                                        })
                                                                    })
                                                                })
                                                            }
                                                            if (zt)
                                                                break
                                                        }
                                                    }
                                                    break;
                                                case 22:
                                                    if (getset("vip")) {
                                                        sent("正在执行任务：" + task.taskName)
                                                        for (var item of task.subItem) {
                                                            result(get("mcxhd_brandcity_doTask", { "itemToken": item.itemToken }), function (j) {
                                                                sle(1000)
                                                                if (j.taskStatus == 3) {
                                                                    union(j.memberUrl)
                                                                    result(get("mcxhd_brandcity_doTask", { "itemToken": item.itemToken }), function (j) {
                                                                        if (j.taskStatus == 3) {
                                                                            err("入会失败，请到京东APP中手动操作")
                                                                        } else {
                                                                            sent("执行成功：获得金币" + j.score)
                                                                        }
                                                                    })
                                                                } else {
                                                                    sent("执行成功：获得金币" + j.score)
                                                                }
                                                            })
                                                        }
                                                    }
                                                    break
                                            }
                                        }
                                    }
                                })
                                break
                        }
                        sentit("所有任务已完成")
                        sent("所有任务已完成")
                        device.cancelKeepingAwake()
                    }
                })
            })
        }
    }
    ui.ck.on("click", function () {
        debug = true
        main()
    })

    ui.runon.on("click", main)
})