//定义脚本函数
console.show();

(function(){
    this.斗技 = function () {

    }
    this.御魂 = function () {

    }
    this.妖气 = function () {
        //下载图片
        let imgArr = ['fu.jpg', 'pipei.jpg', 'tiaozhan.jpg', 'zhunbei.jpg', 'zudui.jpg'];
        imgArr.forEach((imgName) => {
            let path = '/TaoBao/1_8_阴阳师脚本/static/imgs/'+分辨率+'/'+imgName;
            Config.f_getJgyFileBytes
            
        });

        
    }
    this.showWindow = function () {

    }
    this.分辨率 = (function () {
        let ss = '1920*1080|1280*720'.split('|')
        switch (getViewContent('bh_fenbianlv')) {
            case 0:
                return ss[0];
            case 1:
                return ss[1];

            default :
                log("未知分辨率");
                return null;
        }
    });

    this.main = function () {
        //下载图片资源

    }
})();

