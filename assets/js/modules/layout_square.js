// 布局方块
// 曾文彬
// 2016-6-17
// 461153861

'use strict';

(function (win, factory) {
    win.LayoutSquare = factory();
})(window, function () {
    function LayoutSquare () {
        Square.apply(this, arguments);
    }

    // 继承
    Square.inherit(LayoutSquare);

    // 静态
    LayoutSquare.unit = 'rem';

    /**
     * @param {Number} x 横坐标
     * @param {Number} y 纵坐标
     * @param {Number} width 宽度
     * @param {Number} height 高度
     * @param {String} className 类名
     * @param {HTMLElement} container 容器元素
     * @constructor
     */
    LayoutSquare.prototype.init = function (x, y, width, height, className, container) {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.className = className;
        this.container = container;
    };

    /**
     * 创建DOM节点
     *
     * @param {Object}
     * @return {HTMLElement}
     */
    LayoutSquare.prototype._generateDOMNode = function () {
        var node = this.node = document.createElement('div');

        node.setAttribute('class', this.className);

        this._setCSSStyle({
            left: this.x + this.constructor.unit,
            top: this.y + this.constructor.unit,
            width: this.width + this.constructor.unit,
            height: this.height + this.constructor.unit
        });

        return node;
    };

    return LayoutSquare;
});