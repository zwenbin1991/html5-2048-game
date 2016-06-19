// 方块基类
// 曾文彬
// 2016-6-17
// 461153861

'use strict';

(function (win, factory) {
    win.Square = factory();
})(window, function () {
    function Square () {
        this.init.apply(this, arguments);
    }

    /**
     * 继承原型方法
     *
     * @param {Function} Child 子类
     */
    Square.inherit = function (Child) {
        var proto = this.prototype;

        Object.keys(proto).forEach(function (name) {
            Child.prototype[name] = proto[name];
        });
    };

    /**
     * 设置css样式
     *
     * @param {Object} styles 样式对象
     */
    Square.prototype._setCSSStyle = function (styles) {
        Object.keys(styles).forEach((function (style) {
            this.node.style[style] = styles[style];
        }).bind(this));
    };

    /**
     * 渲染
     */
    Square.prototype.render = function (extendCSSStyle) {
        this.container.appendChild(this._generateDOMNode(extendCSSStyle));
    };

    return Square;
});