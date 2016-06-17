// 滑动处理模块
// 曾文彬
// 2016-6-17
// 461153861

'use strict';

(function (win, factory) {
    win.swipe = factory(win.document.documentElement);
})(window, function (docElement) {
    // 定义手指滑动预值，从而判断滑动还是点击
    var __PRESET_DELTA_HORIZONTAL__ = docElement.clientWidth * 0.3;
    var __PRESET_DELTA_VERTICAL__ = docElement.clientHeight * 0.3;

    var swipe = {
        /**
         * 检测是否滑动
         *
         * @param {Number} deltaHorizontal 水平滑动距离
         * @param {Number} deltaVertical 垂直滑动距离
         * @return {Boolean}
         */
        detectSwipe: function (deltaHorizontal, deltaVertical) {
            return Math.abs(deltaHorizontal) >= __PRESET_DELTA_HORIZONTAL__ || Math.abs(deltaVertical) >= __PRESET_DELTA_VERTICAL__;
        },

        /*
        * 检测滑动方向
        * */
        detectSwipeDirection: function (deltaHorizontal, deltaVertical) {
            if (Math.abs(deltaHorizontal) >= Math.abs(deltaVertical)) {
                // horizontal
                return deltaHorizontal > 0 ? 'right' : 'left';
            } else {
                // vertical
                return deltaVertical > 0 ? 'bottom' : 'top';
            }
        }
    };

    return swipe;
});