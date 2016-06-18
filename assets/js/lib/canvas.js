// 画布
// 曾文彬
// 2016-6-17
// 461153861

'use strict';

(function (win, factory) {
    win.Canvas = factory(win);
})(window, function (win) {
    function Canvas () {
        this.init.apply(this, arguments);
    }

    /**
     * @param {String} selector 选择器
     * @constructor
     */
    Canvas.prototype.init = function (selector) {
        this.element = document.querySelector(selector);
        this.numberSquares = [];
        this.rowMaximum = 4;
        this.columnMaximum = 4;
        this.squareWidth = 1;
        this.squareHeight = 1;
        this.squareGap = 0.2;
        this.layoutSquareClassName = 'layout-square';
    };

    /**
     * 坐标迭代器
     *
     * @param {Function} dispose 处理函数
     */
    Canvas.prototype._iteratee = function (dispose) {
        return function () {
            for (var i = 0; i < this.rowMaximum; i++) {
                for (var j = 0; j < this.columnMaximum; j++) {
                    dispose.call(this, i, j);
                }
            }
        };
    };

    /**
     * 渲染普通方块
     */
    Canvas.prototype.renderLayoutSquare = Canvas.prototype._iteratee(function (i, j) {
        var x = j * this.squareHeight + (j + 1) * this.squareGap;
        var y = i * this.squareWidth + (i + 1) * this.squareGap;

        new LayoutSquare(
            x,
            y,
            this.squareWidth,
            this.squareHeight,
            this.layoutSquareClassName,
            this.element
        ).render();
    });

    return Canvas;
});