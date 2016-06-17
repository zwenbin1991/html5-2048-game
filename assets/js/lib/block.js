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

    Block.prototype.init = function (width, height, coordinateX, coordinateY, left, top, blockContainer) {
        this.coordinateX = coordinateX;
        this.coordinateY = coordinateY;
        this.width = width;
        this.height = height;
        this.left = left;
        this.top = top;
        this.blockContainer = blockContainer;
        this.unit = 'rem';
        this.state = 0;
    };

    Block.prototype._getDOMNode = function (text) {
        var node = document.createElement('div');
        var className = !this.state && !text ? 'two' : text;
        var cssText = this._getCSSText();

        node.setAttribute('class', className);
        node.style.cssText = cssText;

        return node;
    };

    Block.prototype._getCSSText = function () {
        var cssTexts = [
            'left:' + this.left + this.unit,
            'top:' + this.top + this.unit,
            'width:' + this.width + this.unit,
            'height:' + this.height + this.unit
        ];

        return cssTexts.join(';');
    };

    Block.prototype.getCoordinate = function (name) {
        return this[name];
    };

    Block.prototype.setCoordinate = function (name, value) {
        this[name] = value;
    };

    Block.prototype.setState = function (state) {
        this.state = state;
    };

    Block.prototype._move = function (xPixel, yPi) {

    };

    Block.prototype._render = function () {
        this.blockContainer.append(this._getDOMNode());
    };

    Block.prototype.renderOrMove = function () {
        !this.state ? this._render() : this._move();
    };
});