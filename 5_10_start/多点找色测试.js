
if (!requestScreenCapture(true)) {
    alert("请求截图权限失败");
    exit();
}
 
const none = -1; //定义常量
const left = 0;
const center = 1;
const right = 2;


// runtime.unloadDex("./scriptlib.dex")
runtime.loadDex("./scriptlib.dex")
importClass(com.scriptlib.AnchorGraphicHelper);

print("版本号: " + AnchorGraphicHelper.Version()); //静态方法
var helper = new AnchorGraphicHelper(runtime, 1280, 720, 0, 0, device.height, device.width);


let 结界突破 = [1280,720,
    [[left,297,650,0xa86614],
    [left,326,650,0xb03434],
    [left,310,671,0x6a221f]]
]
let 十一 = [1280,720,
    [[right,1110,452,0xf6f1de],
    [right,1109,459,0xf7f2df],
    [right,1108,473,0xf8f3e0],
    [right,1126,460,0xc7c0b0],
    [right,1145,460,0xbab4a4],
    [right,1137,452,0xf8f3e0],
    [right,1136,467,0xf8f3e0],
    [right,1165,468,0x45322c],
    [right,1153,461,0xf8f3e0],
    [right,1169,459,0xf0ebd8],
    [right,1191,451,0xf6f1de],
    [right,1190,474,0xf1ecd9],
    [right,1190,468,0xf8f3e0]]
    ]
let 六 = [1280,720,
    [[center,1117,384,0xe8e3d0],
    [center,1120,386,0xb4ae9e],
    [center,1122,390,0xf6f1de],
    [center,1122,398,0xf7f2df],
    [center,1122,405,0xf7f2df],
    [center,1148,387,0xf8f3e0],
    [center,1150,392,0xf8f3e0],
    [center,1140,393,0xdfdac8],
    [center,1158,393,0xccc5b5],
    [center,1144,399,0x847c6f],
    [center,1144,402,0xe0dac8],
    [center,1142,406,0x6f675a],
    [center,1156,401,0xe1dbc9],
    [center,1157,405,0xf8f3e0],
    [center,1168,392,0xf0ebd8],
    [center,1188,390,0xf0ebd9],
    [center,1173,404,0xf8f3e0],
    [center,1183,402,0xf2edda],
    [center,1177,403,0xf8f3e0],
    [center,1177,406,0xf8f3e0],
    [center,1176,384,0xe1dbc9],
    [center,1174,385,0x9d9687],
    [center,1181,385,0xefe9d7]]
    ]
let 十八 = [1280,720,
    [[center,1103,383,0xf5efdd],
    [center,1115,383,0xe3ddcb],
    [center,1110,396,0xe0dac8],
    [center,1102,403,0xefead7],
    [center,1109,405,0xd6d0be],
    [center,1114,401,0xf3eddb],
    [center,1118,394,0xefe9d7],
    [center,1129,393,0xf8f3e0],
    [center,1137,392,0xf7f2df],
    [center,1146,391,0xf8f3e0],
    [center,1137,384,0xf8f3e0],
    [center,1137,402,0xefead7],
    [center,1157,391,0xf2edda],
    [center,1153,398,0xc6c0af],
    [center,1164,388,0xf8f3e0],
    [center,1171,398,0xf8f3e0],
    [center,1128,401,0x45322c],
    [center,1143,397,0x45322c],
    [center,1161,398,0x45322c],
    [center,1148,383,0x45322c],
    [center,1170,387,0x45322c]]
]

let 其= [1280,720,
    [[center,1116,612,0xf6f1de],
    [center,1128,612,0xf6f0de],
    [center,1122,617,0xf8f3e0],
    [center,1122,626,0xf6f1de],
    [center,1122,634,0xf8f3e0],
    [center,1132,626,0xf8f3e0],
    [center,1141,624,0xf4efdc],
    [center,1149,622,0xf8f3e0],
    [center,1159,621,0xf8f3e0],
    [center,1149,614,0xf2edda],
    [center,1148,621,0xe7e2d0],
    [center,1149,623,0xf8f3e0],
    [center,1149,630,0xe3decc],
    [center,1152,631,0xf4efdc],
    [center,1156,632,0xf7f2df]]
]

let aj找色 = ["#f6f1de",[[12,0,"#f6f0de"],[6,5,"#f8f3e0"],[6,14,"#f6f1de"],[6,22,"#f8f3e0"],[16,14,"#f8f3e0"],[25,12,"#f4efdc"],[33,10,"#f8f3e0"],[43,9,"#f8f3e0"],[33,2,"#f2edda"],[32,9,"#e7e2d0"],[33,11,"#f8f3e0"],[33,18,"#e3decc"],[36,19,"#f4efdc"],[40,20,"#f7f2df"]]]



let bliu =[1280,720,
    [[center,1116,494,0xf6f1de],
    [center,1129,494,0xd0cab9],
    [center,1123,506,0xf2ecda],
    [center,1149,495,0xdfdac8],
    [center,1143,502,0xf5f0dd],
    [center,1157,501,0xdad4c2],
    [center,1143,510,0xe0dac8],
    [center,1156,511,0xf8f3e0]]
]

print("获取截图数据到数组: " + helper.KeepScreen(true));


// log(转换颜色数组(aj找色))
// log(helper.KeepScreen.toString());

var findColorArray = helper.GetFindColorArray(其[0], 其[1], 其[2]);

// let bise = helper.GetCmpColorArray(bliu[0], bliu[1], bliu[2]);
let 截屏 = images.captureScreen();

let 新数组 = 转换颜色数组(aj找色)
// while (1) {
//     print("多点找色: " + helper.FindMultiColor(0, 0, device.height, device.width, findColorArray, 95, 3));
//     // print(images.findMultiColors(截屏, 新数组[0], 新数组[1], {
//     //     threshold : 10
//     // }));
// }


print("多点找色: " + helper.FindMultiColor(0, 0, device.height, device.width, findColorArray, 95, 3).x);

// print("多点比色: " + helper.CompareColorEx(bise, 95, 0));







function 转换颜色数组  (c) {
    let op = {
        w : 720,
        h : 1280
    }
    let bl = device.width / op.w;
    // log(bl);
    c[1] = c[1].map((cs) => {
        // log(cs)
        return cs.map((mcs) => {
            if (typeof(mcs) == 'number') {
                return mcs * bl;
            } else {
                return mcs;

            }
        })

    });
    return c;
}


