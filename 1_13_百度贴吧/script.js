/*
 * @Author: BanHua
 * @Date: 2021-01-13 17:20:34
 * @LastEditors: BanHua
 * @LastEditTime: 2021-01-15 18:07:50
 * @Description: file content
 */
//脚本变量环境初始化
console.show();
let storage = storages.create('TieBa');

let _随机字符串 = '嚓擦礤猜才材祊偪發乏伐垡罰閥筏法砝琺帆番幡翻藩凡礬釩煩樊蕃燔璠繁蹯瀿蘩鐇反返氾犯汎泛飯範販畈梵方邡坊芳枋钫防妨房肪鲂仿訪紡昉舫放飛妃非啡婓绯菲扉蜚霏鲱肥淝腓匪誹悱斐榧翡篚吠廢沸狒肺費痱镄分吩紛芬氛酚墳汾棼焚鼢粉份奮忿偾憤糞鲼瀵豐風沣沨楓封瘋砜峰烽葑鋒蜂酆馮逢縫諷唪鳳奉俸缶否夫呋膚趺麸稃跗孵敷弗伏凫孚扶芙芾怫拂服绂绋苻俘枹氟祓罘茯郛浮砩莩蚨匐桴涪琈符艴菔袱苾貉媽嬷麻蟆馬犸瑪碼螞杩祃罵唛傌鬕嗎嘛埋霾買荬劢邁麥賣脈颟蠻饅樠瞞鞔鳗滿螨曼謾墁幔慢漫缦蔓熳镘邙忙芒盲茫硭莽漭蟒貓毛矛牦茅旄蛑錨髦蝥蟊卯峁泖茆昴鉚茂冒貿耄袤帽鄚瑁瞀貌懋麽沒枚玫眉莓梅媒嵋湄猸楣煤酶镅鹛黴每美浼渼鎂妹昧媚寐魅門扪钔悶焖懑們氓虻萌盟甍瞢朦檬礞艨勐猛蒙錳艋蜢懵蠓孟夢咪彌祢迷猕謎醚糜縻麋靡蘼米芈弭洣敉脒眯糸汨宓泌覓秘密冪谧嘧蜜芇眠綿棉免沔黾勉眄娩冕湎緬腼面喵苗描瞄鹋杪眇秒淼渺缈藐邈妙廟咩滅蔑篾蠛民岷旻玟苠珉缗皿闵抿泯閩憫敏湣愍鳘名明鳴茗冥銘鄍溟暝瞑螟酩命謬缪摸谟嫫馍摹模膜麽摩磨蘑魔抹末殁沫茉陌秣莫寞漠蓦貊墨瘼镆默貘耱哞牟侔眸謀鍪某母毪畝牡姆拇木仫目沐坶牧苜钼募墓幅福輻幞蝠黻撫甫府拊斧俯釜輔腑滏腐黼父訃財裁采彩睬綵踩菜蔡縩參骖餐殘蠶慚慘憯黪黲燦粲璨倉伧滄蒼艙藏鑶操糙曹嘈漕槽艚螬草冊側廁恻測敇策箣岑梣涔噌層蹭叉杈臿嗏插馇锸艖垞查茬茶嵖搽猹槎察碴檫衩镲汊岔侘詫姹差拆钗侪柴豺虿瘥觇摻攙幨婵讒孱禅饞纏蟬鋋廛潺镡瀍蟾巉躔镵産刬浐谄鏟闡蒇冁繟忏顫羼韂伥昌娼猖菖阊琩鲳腸苌嘗償常徜嫦鲿廠場昶惝敞氅鋹怅玚暢倡鬯唱暢韔抄弨怊鈔焯超晁巢朝嘲潮吵炒眧麨耖車砗唓扯徹坼掣撤澈抻郴琛嗔塵臣忱沈辰陳宸晨谌趻碜墋踸闖襯疢稱龀趁榇谶柽偁蛏铛牚琤赪撐瞠丞成呈承枨誠郕城宬乘埕脭铖懲程裎塍酲澄橙逞騁秤吃哧蚩鸱瓻眵笞嗤媸摛癡螭魑弛池馳遲茌持墀踟篪尺侈齒恥豉褫彳叱斥赤饬抶熾翅敕啻傺憏瘛充沖忡茺翀舂憃憧艟蟲崇寵铳抽瘳篘犨仇俦帱惆綢疇愁稠籌酬躊懤雠醜瞅臭殠出初摴樗刍除廚滁鋤蜍雛櫥幮躇蹰杵礎儲楮楚褚齼亍處怵绌琡搐觸憷歜黜矗搋膗揣啜嘬踹巛川氚穿傳舡船遄椽歂舛荈喘僢串钏囪瘡窗摐床噇創怆吹炊垂陲捶菙棰槌錘春堾椿蝽鰆純唇莼淳鹑漘醇踳蠢踔戳辵娖綽逴辍龊歠呲玼疵詞祠茈茨瓷慈辭磁雌鹚糍此佌次佽刺賜從匆苁枞蔥骢璁聰叢淙琮湊楱腠辏粗徂殂促猝蔟醋簇蹙蹴汆撺'

let _delay = storage.get('viewDataArr')['bh_delay'];
let _str_num = storage.get('viewDataArr')['bh_rstr_num'] || 2;
let _delete_delay = storage.get('viewDataArr')['bh_delete_delay'] || '5-10';

/**
 * 1.scipt.js的变量不与main.js mainActivity.js共享
 */

let _upNum = 0;
log('准备进入百度贴吧');
// waitForActivity('com.baidu.tieba.pb.pb.main.PbActivity');
id('widget_navi_back_button').waitFor();
toastLog('进入帖子界面成功！');

loop:
while (1) {
    if (_upNum == 0) {
        console.info("_upNum等于0，开始第一次顶帖");
        
    } else {
        console.info("已顶帖%d次！", _upNum);
    }
    let _commentContent = 随机字符(null, randomNumOfSing(_str_num, '-'));
    console.info('本地评论的内容为：%s', _commentContent);
    log('点击评论控件');
    id('pb_editor_tool_comment_reply_text').findOne().parent().click();
    className('EditText').waitFor();
    log('找到了编辑框，开始输入评论内容');
    className('EditText').findOne().setText(_commentContent);
    sleep(1000);
    console.info("开始发表评论内容");
    className("android.view.View").clickable(true).depth(11).findOne().click();
    
    //判断是否返回主页
    _upNum++
    let _delete_ = randomNumOfSing(_delete_delay, '-');
    console.info('%d秒后删除评论', _delete_);
    sleep(_delete_ * 1000);
    log('开始删除评论');

    let _commentView = text(_commentContent).findOnce();
    if (_commentView) {
        log('长按评论内容');
        _commentView.parent().longClick();
        text('复制').waitFor();
        text('删除').waitFor();
        console.info('长按评论成功');
        sleep(random(500, 1000));

        log('点击删除');
        // text('删除').findOne().click();
        click('删除');
        text('确认删除此楼？').waitFor();
        log('确认删除此楼？');
        sleep(random(500, 1000));
        text('确认').findOne().click();
    } else {
        console.error('没有找到评论内容');
    }
    sleep(random(500, 1000));
    //开始等待
    let _delay_ = randomNumOfSing(_delay, '-');
    for (let i = 0; i < _delay_; i++) {
        console.info('本次需要等待%d分钟,已等待%d分钟。', _delay_, i);
        sleep(1000 * 60);
    }

    console.info('等待完毕，终于可以开始回帖了');
}


function 随机字符 (strs,num) {
    strs = strs || 'ABCDEFGHJKMNPQRSTWXYZabcdefhijkmnprstwxyz2345678';
    let strArr = strs.split('');
    let r = ''
    for (let i = 0; i < num; i++) {
        r = r + strArr[random(0, strArr.length - 1)];
    }
    return r;
}

//随机分割函数
function randomNumOfSing (str_0, str_1) {
    //以str_1分割，取一个随机数
    switch (typeof(str_0)) {
        case 'number':
            //是数字
            return str_0
        case 'string':
            //是字符串
            if (str_0.indexOf(str_1) > -1) {
                num_min = str_0.split(str_1)[0]
                num_max = str_0.split(str_1)[1]
                return random(Number(num_min), Number(num_max))
            } else {
                return Number(str_0)
            }
        default:

            return 0;
    }
}