let 帖子代码数组 = [
    '188554281',
    '188554246',
    '188554252',
    '188554266',
    '188554274',
    '188554236'
]

let head = {
    'Cookie':'ll="118183"; bid=8gAetcmKItg; __utmc=30149280; __utmz=30149280.1596998510.1.1.utmcsr=baidu|utmccn=(organic)|utmcmd=organic; __yadk_uid=wo2VC1QSnwYrAbLQ1gI4fM14mVyhjVui; push_doumail_num=0; __gads=ID=df1011e86959d17a:T=1596998582:S=ALNI_MaojHREg5tWlmWc10SizlYG2eAfng; douban-fav-remind=1; ps=y; push_noty_num=0; _pk_ref.100001.8cb4=%5B%22%22%2C%22%22%2C1597040088%2C%22https%3A%2F%2Fwww.baidu.com%2Flink%3Furl%3D3xvU8jjqA2McnNL07G_5X0g0GSfFur0tJFB7HomIk3fQbgezi_9d8NEyI48kpXLx%26wd%3D%26eqid%3Df0caceb10011174c000000065f30435b%22%5D; _pk_ses.100001.8cb4=*; dbcl2="173041198:wpy4M7JpNiU"; ck=m5wm; ap_v=0,6.0; _pk_id.100001.8cb4=a7b027d4eff5e6e7.1596998508.3.1597040120.1597011381.; __utma=30149280.508478965.1596998510.1597009580.1597040124.3; __utmt=1; __utmv=30149280.17304; __utmb=30149280.7.5.1597040124',
    'User-Agent':'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_5) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/13.1.1 Safari/605.1.1',
    'Referer':'https://www.douban.com/group/topic/186002530',
    'Accept-Language':'zh-Hans-CN,en-GB;q=0.8,en-US;q=0.6'
}

let 顶贴次数 = 1

while (1) {
    for (let i = 0; i < 帖子代码数组.length; i++) {

        let form = {
            'ck':'m5wm',
            'rv_comment':randomStr(),
            'img':'(binary)',
            'start':'0',
            'submit_btn':'发送'
        }

        let api = 'https://www.douban.com/group/topic/'+帖子代码数组[i]+'/add_comment'
        // log(api)

        res = http.post(api, form, {
            'headers':head
        })
        
        if (res.statusCode >= 200 && res.statusCode < 300) {
            log('第%d次顶贴成功\nhttps://www.douban.com/group/topic/'+帖子代码数组[i]+'/?dt_dapp=1', 顶贴次数)
            顶贴次数++
        } else {
            log('第%d次顶贴失败\nhttps://www.douban.com/group/topic/'+帖子代码数组[i]+'/?dt_dapp=1', 顶贴次数)
        }
        log('开始等待')
        sleep(random(1800, 3600) * 1000)
    }
}
// log(randomStr())

function randomStr() {
    let strs = 'qwertyuiopasdfghjklzcbnm1爱上阿斯顿阿斯顿阿拉山口简单阿克苏叫大声点撒开了家期望而且我得破了没呢期望请问共商国是分234567890_-'
    let str = strs.split('')
    return str[random(0, str.length - 1)]
}