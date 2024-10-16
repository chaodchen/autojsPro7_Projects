
"ui";

var resource = context.getResources();
ui.layout(
  <vertical>
        <com.stardust.autojs.core.console.ConsoleView
      id="console"
      background="#7f000000"
      h="*" />
  </vertical>
);
ui.console.setConsole(runtime.console);

let c = new android.util.SparseArray();
let Log = android.util.Log;
c.put(Log.VERBOSE, new java.lang.Integer(colors.parseColor("#dfc0c0c0")));
c.put(Log.DEBUG, new java.lang.Integer(colors.parseColor("#cc000000")));
c.put(Log.INFO, new java.lang.Integer(colors.parseColor("#ff64dd17")));
c.put(Log.WARN, new java.lang.Integer(colors.parseColor("#ff2962ff")));
c.put(Log.ERROR, new java.lang.Integer(colors.parseColor("#ffd50000")));
c.put(Log.ASSERT, new java.lang.Integer(colors.parseColor("#ffff534e")));
ui.console.setColors(c);

//隐藏日志输入框和按钮
input_container = activity.findViewById(getResourceID("input_container", "id"));
input_container.attr("visibility", "gone");


/**
 * 获取资源文件ID
 * @param {*} name 资源名
 * @param {*} defType 类名 如drawable id string等
 */

function getResourceID(name, defType) {
  return resource.getIdentifier(name, defType, context.getPackageName());
};


//测试输出
var items = ["log", "verbose", "info", "warn", "error"]
setInterval(() => {
  for (key in items) console[items[key]](items[key]);
}, 2000);

