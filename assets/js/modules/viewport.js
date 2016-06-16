// 入口文件
// 曾文彬
// 2016-6-17

'use strict';

;(function (win, factory) {
    win.viewport = factory(win.document);
})(window, function (doc) {
    return function () {
        // 获取viewport宽度
        var clientWidth = doc.documentElement.clientWidth;

        // 获取相对于640设计稿下字体大小100px的最终字体大小
        var fontSize = clientWidth / 6.4;

        // 设置html fontsize
        doc.style.fontSize = fontSize + 'px';
    }
});