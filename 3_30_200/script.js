toastLog('脚本开始--》》  ')

//话术用|分成两段
话术 = 配置.UI配置.input_0.split('|')
延迟 = 配置.UI配置.input_1

toastLog(话术)

main();

function main() {
    // do {
    //     enterStra();
    // }while(!strangerMessage())
    enterStra();
    strangerMessage(话术,延迟)
}

function enterStra() {
    var id_ecd = id("ecd").findOne(); //列表
    //回到到列表顶部
    do {
        var tmp_top = false; //顶flag
        let id_fy = id("fy").findOne(500); //顶部
        if (id_fy) {
            if (id_fy.visibleToUser()) {
                log("到达顶部")
                tmp_top = true;
            } else {
                id_ecd.scrollBackward(); //向上滑动
            }
        }else{
            id_ecd.scrollBackward(); //向上滑动
        }

    } while (!tmp_top);
    
    //判断陌生人消息
    do {
        var stra_find = false; //陌生人flag
        let tmp_stra = text("陌生人消息").findOne(1000); //陌生人消息
        if (tmp_stra) {
            if (tmp_stra.visibleToUser()) {
                log("找到");
                (tmp_stra.parent().parent().parent()).click();
                stra_find = true;
                break;
            } else {
                log("不可见");
                id_ecd.scrollForward()
            }
        } else {
            log(id_ecd);
            log(id_ecd.scrollForward());
        }
    } while (!stra_find); 
}

//读取未读消息
function strangerMessage2(text,delay) {
    // stranger = className("android.support.v7.widget.RecyclerView").findOne();
    toast("准备...")
    sleep(3*1000)
    let stranger = className("android.widget.LinearLayout").clickable().find();
    // let c = stranger.size()-2
    let c = stranger.length-2
    toast("陌生人消息"+c+"条");
    sleep(1000)
    let i = 1
    stranger.forEach(e => {
        toast("开始回复第" + i + "条信息");
        onkey_butn = className("android.widget.LinearLayout").desc("一键已读").findOne()
        if(!e.desc()){
            let x= e.bounds().centerX()
            let y= e.bounds().centerY()
            click(x,y)

            text.forEach((textContent) => {

                edit = className("EditText").findOne();
                edit.setText(textContent);
                send_btn = className("android.widget.ImageView").desc("发送").findOne()
                send_btn.click()
                sleep(1000)

            })

            sleep(延迟)
            back_btn = className("android.widget.LinearLayout").desc("返回").findOne()
            back_btn.click()
        }       
    });
}


function strangerMessage(text, delay) {
    let i = 2
    let send = 1
    toast("准备...")
    sleep(delay)
    while (1) {
        onkey_btn = className("android.widget.LinearLayout").desc("一键已读").findOne(delay);
        let stranger = className("android.widget.LinearLayout").clickable().findOnce(i);
        sleep(delay)  
        if(stranger){
            log(stranger.id());  
            let x= stranger.bounds().centerX();
            let y= stranger.bounds().centerY();
            click(x,y);

            //；两段话术
            text.forEach((textContent) => {

                edit = className("EditText").findOne();
                edit.setText(textContent);
                send_btn = className("android.widget.ImageView").desc("发送").findOne()
                send_btn.click()
                sleep(1000)
                
            })

            sleep(delay)
            stra_success=textContains("已送达").findOne(delay)
            if(stra_success){
                toast("开始回复第" + send + "条信息");
                send++
            }else{
                log("发送异常");
                i++
            }
            if (i>=12){
                i=2;
                className("android.support.v7.widget.RecyclerView").findOne().scrollBackward();
            }
            back_btn = className("android.widget.LinearLayout").desc("返回").findOne()
            back_btn.click()
        }else{
            className("android.support.v7.widget.RecyclerView").findOne().scrollBackward();
        }
    }
}