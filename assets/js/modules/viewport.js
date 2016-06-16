// 自适应屏幕模块
// 曾文彬
// 2016-6-17
// 461153861

'use strict';

(function (win, factory) {
    win.viewport = factory(win.document);
})(window, function (doc) {
    return function () {
        // 获取html dom
        var docElement = doc.documentElement;

        // 获取viewport宽度
        var clientWidth = docElement.clientWidth;

        // 获取相对于640设计稿下字体大小100px的最终字体大小
        var fontSize = clientWidth / 6.4;

        // 设置html fontsize
        docElement.style.fontSize = fontSize + 'px';
    }
});