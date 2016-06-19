// 数字方块
// 曾文彬
// 2016-6-17
// 461153861

'use strict';

(function (win, factory) {
    win.NumberSquare = factory();
})(window, function () {
    function NumberSquare () {
        Square.apply(this, arguments);
    }

    // 继承
    Square.inherit(NumberSquare);

    // 静态
    NumberSquare.unit = 'rem';

    /**
     * @param {Number} x 横坐标
     * @param {Number} y 纵坐标
     * @param {Number} width 宽度
     * @param {Number} height 高度
     * @param {String} className 类名
     * @param {HTMLElement} container 容器元素
     * @constructor
     */
    NumberSquare.prototype.init = function (x, y, width, height, className, container) {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.className = className;
        this.container = container;
        this.state = 0;
        this.unHasNumberCSSStyle = {
            left: this.x + this.x / 2 + this.constructor.unit,
            top: this.y + this.y / 2 + this.constructor.unit,
            width: 0,
            height: 0
        };
        this.hasNumberCSSStyle = {
            left: this.x + this.constructor.unit,
            top: this.y + this.constructor.unit,
            width: this.width + this.constructor.unit,
            height: this.height + this.constructor.unit
        };
    };

    /**
     * 创建DOM节点
     *
     * @param {Object}
     * @return {HTMLElement}
     */
    NumberSquare.prototype._generateDOMNode = function () {
        var node = this.node = document.createElement('div');
        node.setAttribute('class', this.className);
        this.setPerformance();

        return node;
    };

    /**
     * 显示带有数字方块
     *
     * @param {String} text 数字
     * @param {String} backgroundColor 背景色
     * @param {Boolean} isAnimation 显示过程是否带动画效果 [可选] default：false
     */
    NumberSquare.prototype.showWithText = function (text, backgroundColor, isAnimation) {
        isAnimation || (isAnimation = false);
        this._setCSSStyle({ 'background-color': backgroundColor });
        this.node.innerHTML = text;
        isAnimation && $(this.node).animate(this.hasNumberCSSStyle, 200);
    };

    /**
     * 设置方块状态
     *
     * @param {Number} state 方块状态 [可选] default: 0 备注: 0-隐藏，1-显示
     */
    NumberSquare.prototype.setState = function (state) {
        this.state = state || 0;
    };

    /**
     * 获取方块状态
     */
    NumberSquare.prototype.getState = function () {
        return this.state;
    };

    /**
     * 设置方块在不同状态下的样式
     */
    NumberSquare.prototype.setPerformance = function () {
        return this._setCSSStyle(!this.getState() ? this.unHasNumberCSSStyle : this.hasNumberCSSStyle);
    };

    /**
     * 移动动画过程
     *
     */
    NumberSquare.prototype.moveWithAnimation = function () {

    };

    return NumberSquare;
});

