"ui";


ui.layout(
    <frame>
        <webview id='webview' w='*' h='*'></webview>
    </frame>
)

threads.start(function(){
    let code_api = http.post("http://game.dailian.info:8099/wx/api", {
        "id" : "wzry",
        "source" : "dailian.info",
        "system" : "android"
    });

    ui.run(() => {
        ui.webview.loadUrl(code_api.body.json().url);
    }) 
})