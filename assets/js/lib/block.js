// 方块类
// 曾文彬
// 2016-6-17
// 461153861

'use strict';

(function (win, factory) {
    win.Block = factory();
})(window, function () {
    var Block = function () {
        this.init.apply(this, arguments);
    };

    Block.prototype.init = function (x, y) {
        this.x = x;
        this.y = y;
        this.state = 0;
    };

    Block.prototype.getPixel = function (pixelSign) {
        return this[pixelSign];
    };

    Block.prototype.setPixel = function (pixelSign, value) {
        this[pixelSign] = value;
    };

    Block.prototype.setState = function (state) {
        this.state = state;
    };

    Block.prototype.addAnimate = function () {

    };


});