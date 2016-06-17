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

    Block.prototype.init = function (width, height, coordinateX, coordinateY, left, top, text, blockContainer, selector) {
        this.coordinateX = coordinateX;
        this.coordinateY = coordinateY;
        this.width = width;
        this.height = height;
        this.left = left;
        this.top = top;
        this.blockContainer = blockContainer;
        this.selector = selector || 'cell';
        this.unit = 'rem';
        this.stateClassPrefix = 'state-';

        this.setText(text);
        this.setState(text ? 1 : 0);
    };

    Block.prototype._getDOMNode = function () {
        var node = document.createElement('div');
        var className = [this.selector].concat(!this.state ? void 0 : this.stateClassPrefix + this.text).join(' ');
        var cssText = this._getCSSText();

        node.setAttribute('class', className);
        node.style.cssText = cssText;

        if (this.text) node.innerHTML = this.text;

        return node;
    };

    Block.prototype._getCSSText = function () {
        var cssTexts = [
            'left:' + this.left + this.unit,
            'top:' + this.top + this.unit,
            'width:' + this.width + this.unit,
            'height:' + this.height + this.unit,
            'line-height:'+ this.height + this.unit
        ];

        return cssTexts.join(';');
    };

    Block.prototype.setState = function (state) {
        this.state = state;
    };

    Block.prototype.setText = function (text) {
        this.text = text || '';
    };

    Block.prototype.move = function (xPixel, yPi) {

    };

    Block.prototype.render = function () {
        this.blockContainer.el.appendChild(this._getDOMNode());
    };

    return Block;
});