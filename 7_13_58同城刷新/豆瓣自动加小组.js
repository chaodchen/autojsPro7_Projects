//变量初始化
var group = [];
var ck = 'm5wm';
var headers = {
    'Cookie':'ll="118183"; bid=8gAetcmKItg; __utmc=30149280; __utmz=30149280.1596998510.1.1.utmcsr=baidu|utmccn=(organic)|utmcmd=organic; __yadk_uid=wo2VC1QSnwYrAbLQ1gI4fM14mVyhjVui; push_doumail_num=0; __gads=ID=df1011e86959d17a:T=1596998582:S=ALNI_MaojHREg5tWlmWc10SizlYG2eAfng; douban-fav-remind=1; ps=y; push_noty_num=0; _pk_ref.100001.8cb4=%5B%22%22%2C%22%22%2C1597040088%2C%22https%3A%2F%2Fwww.baidu.com%2Flink%3Furl%3D3xvU8jjqA2McnNL07G_5X0g0GSfFur0tJFB7HomIk3fQbgezi_9d8NEyI48kpXLx%26wd%3D%26eqid%3Df0caceb10011174c000000065f30435b%22%5D; _pk_ses.100001.8cb4=*; dbcl2="173041198:wpy4M7JpNiU"; ck=m5wm; ap_v=0,6.0; _pk_id.100001.8cb4=a7b027d4eff5e6e7.1596998508.3.1597040120.1597011381.; __utma=30149280.508478965.1596998510.1597009580.1597040124.3; __utmt=1; __utmv=30149280.17304; __utmb=30149280.7.5.1597040124'
};

自动加小组(爬取小组号('摄影'), 1000);
function 爬取小组号 (groupName) {
    let api = 'https://www.douban.com/group/search?cat=1019&q='+encodeURI(groupName);
    let res = http.get(api, {
        'headers':this.headers
    });
    let bodyString = res.body.string();
    let keyArr = bodyString.match(/from: \'group_search\', sid: \d{3,}/g)
    keyArr = keyArr.map((value, index) => {
        let r = value.match(/\d+/g)[0];
        return r;
    })
    // log(keyArr)
    return keyArr;
}

function 自动加小组 (groups, delay) {
    log('开始自动加小组函数', this.ck)
    for (let i = 0; i < groups.length; i++) {
        let api = 'https://www.douban.com/group/'+groups[i]+'/?action=join&ck='+this.ck;

        let res = http.get(api, {
            'headers':this.headers
        });

        res.statusCode == 200 ? console.info('加入成功!') : console.error('加入失败！');

        // log(res.body.string());
        sleep(delay)
    }
}