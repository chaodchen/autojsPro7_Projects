// input("6793")

// click("我知道了");
// click("杭州万控电器成套有限公司");

// click("去支持");

// click(929, 910);

// input("9");

// let ta = textContains("杭州万控电器成套有限公司").findOne();
// log(ta.bounds());
// let 支持ta = ta.parent().findOne(text("支持ta"));

// click(支持ta.bounds().centerX(), 支持ta.bounds().centerY());


while (1) {
    text("商品收藏").waitFor();
    let kv8s = id("kv8").find();
    if (kv8s.length > 0) {
        kv8s[0].click();
        id("eiq").findOne().click();
    }
}
