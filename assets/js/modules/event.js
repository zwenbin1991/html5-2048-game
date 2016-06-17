// 事件监听模块
// 曾文彬
// 2016-6-17
// 461153861

'use strict';

(function (win, factory) {
    win.eventListener = factory();
})(window, function () {

    /**
     * 事件设置监听器
     *
     * @param {Array} eventNames 事件名数组
     * @param {Object} listeners 监听对象
     */
    return function (eventNames, listeners) {
        var listener = null;

        (Array.isArray(eventNames) ? eventNames : eventNames.split(',')).forEach(function (eventName) {
            (listener = listeners[eventName]).el.addEventListener(eventName, listener.listen, false);
        });
    };
});