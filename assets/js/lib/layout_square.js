// 布局方块
// 曾文彬
// 2016-6-17
// 461153861

'use strict';

(function (win, factory) {
    win.LayoutSquare = factory();
})(window, function () {
    function LayoutSquare () {
        this.init.apply(this, arguments);
    }

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
        this.unit = 'rem';
    };

    /**
     * 创建DOM节点
     *
     * @return {HTMLElement}
     */
    LayoutSquare.prototype._generateDOMNode = function () {
        var node = this.node = document.createElement('div');

        node.setAttribute('class', this.className);

        this._setCSSStyle({
            left: this.x + this.unit,
            top: this.y + this.unit,
            width: this.width + this.unit,
            height: this.height + this.unit
        });

        return node;
    };

    /**
     * 设置css样式
     *
     * @param {Object} styles 样式对象
     */
    LayoutSquare.prototype._setCSSStyle = function (styles) {
        Object.keys(styles).forEach((function (style) {
            this.node.style[style] = styles[style];
        }).bind(this));
    };

    /**
     * 渲染
     */
    LayoutSquare.prototype.render = function () {
        this.container.appendChild(this._generateDOMNode());
    };

    return LayoutSquare;
});