// 画布
// 曾文彬
// 2016-6-17
// 461153861

'use strict';

(function (win, factory) {
    var backgroundColorMap = {
        0: '#ccc0b3',
        2: '#f2b179',
        4: '#f59563',
        8: '#f67c5f',
        16: '#f65e3b',
        32: '#edcf72',
        64: '#edcc61',
        128: '#9c0',
        256: '#33b5e5',
        512: '#09c',
        1024: '#a6c',
        2048: '#93c'
    };
    win.Canvas = factory(backgroundColorMap, win.document);
})(window, function (backgroundColorMap, doc) {
    function Canvas () {
        this.init.apply(this, arguments);
    }

    /**
     * @param {String} selector 选择器
     * @constructor
     */
    Canvas.prototype.init = function (selector) {
        this.element = doc.querySelector(selector);
        this.numberSquares = [];
        this.rowMaximum = 4;
        this.columnMaximum = 4;
        this.squareWidth = 1;
        this.squareHeight = 1;
        this.squareGap = 0.2;
        this.layoutSquareClassName = 'layout-square';
        this.numberSquareClassName = 'number-square';

        // 绑定滑动事件
        this.bindTouchEvents('touchstart,touchend', {
            touchstart: {
                element: doc,
                listen: this._touchstartListener.bind(this)
            },
            touchend: {
                element: doc,
                listen: this._touchendListener.bind(this)
            }
        });
    };

    /**
     * 绑定事件
     */
    Canvas.prototype.bindTouchEvents = function (eventNames, eventRela) {
        eventListener(eventNames, eventRela);
    };

    /**
     * 设置事件监听器
     */
    Canvas.prototype._touchstartListener = function (e) {
        var touch = e.touches[0];
        this.touchStartX = touch.pageX;
        this.touchStartY = touch.pageY;
    };

    Canvas.prototype._touchendListener = function (e) {
        var touch = e.changedTouches[0];
        var touchEndX = touch.pageX;
        var touchEndY = touch.pageY;
        var deltaHorizontal = touchEndX - this.touchStartX;
        var deltaVertical = touchEndY - this.touchStartY;

        // 过滤点击动作
        if (!swipe.detectSwipe(deltaHorizontal, deltaVertical))
            return;

        var touchDirection = swipe.detectSwipeDirection(deltaHorizontal, deltaVertical);

        touchDirection === 'left' ?
            this._moveLeft() : touchDirection === 'right' ?
            this._moveRight() : touchDirection === 'top' ?
            this._moveTop() : this._moveBottom();
    };

    /**
     * 产生随机坐标
     */
    Canvas.prototype._generateRandomXY = function () {
        return {
            randX: parseInt(Math.random() * this.rowMaximum),
            randY: parseInt(Math.random() * this.rowMaximum)
        };
    };

    /**
     * 产生随机数字方块
     */
    Canvas.prototype.generateRandomNumberSquare = function () {
        if (!this._Space())
            return false;

        var randXY = this._generateRandomXY();
        var currentSquare = null;

        // 检测该随机坐标是否存在数字方块
        while (true) {
            if (!(currentSquare = this.numberSquares[randXY['randX']][randXY['randY']]).state)
                break;

            randXY = this._generateRandomXY();
        }

        currentSquare.setState(1);
        currentSquare.showWithText('2', backgroundColorMap['2'], true);
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
     * 是否有数字方块可以向左移动
     */
    Canvas.prototype._canMoveLeft = function () {
        for (var i = 0; i < this.rowMaximum; i++) {
            for (var j = 1; j < this.columnMaximum; j++) {
                if (this.numberSquares[i][j].state) {
                    if (!this.numberSquares[i][j - 1].state)
                        return true;
                }
            }
        }

        return false;
    };

    /**
     * 数字方块向左移动
     */
    Canvas.prototype._moveLeft = function () {
        if (!this._canMoveLeft())
            return;

        var currentSquare = null;
        var staySquare = null;

        for (var i = 0; i < this.rowMaximum; i++) {
            for (var j = 1; j < this.columnMaximum; j++) {
                if ((currentSquare = this.numberSquares[i][j]).state) {

                    for (var k = 0; k < j; k++) {

                        // 找到最近的落脚方块
                        if (!(staySquare = this.numberSquares[i][k]).state) {
                            currentSquare.setState(0);
                            currentSquare.setPerformance();

                            staySquare.setState(1);
                            staySquare.setPerformance();

                            // 随机生成数字方块
                            this._generateRandomNumberSquare();

                            // 清空所有数字方块
                            this.clearAllNumberSquare();

                            // 画布重新渲染数字方块
                            this.
                        }
                    }

                }
            }
        }
    };

    /**
     * 是否有数字方块可以向右移动
     */
    Canvas.prototype._canMoveRight = function () {
        for (var i = 0; i < this.rowMaximum; i++) {
            for (var j = this.columnMaximum - 2; j >= 0; j--) {
                if (this.numberSquares[i][j].state) {
                    if (!this.numberSquares[i][j + 1].state)
                        return true;
                }
            }
        }

        return false;
    };

    /**
     * 是否有数字方块可以向上移动
     */
    Canvas.prototype._canMoveTop = function () {
        for (var i = 1; i < this.rowMaximum; i++) {
            for (var j = 0; j < this.columnMaximum; j++) {
                if (this.numberSquares[i][j].state) {
                    if (!this.numberSquares[i - 1][j].state)
                        return true;
                }
            }
        }

        return false;
    };

    /**
     * 是否有数字方块可以向下移动
     */
    Canvas.prototype._canMoveBottom = function () {
        for (var i = this.rowMaximum - 2; i >= 0; i--) {
            for (var j = 0; j < this.columnMaximum; j++) {
                if (this.numberSquares[i][j].state) {
                    if (!this.numberSquares[i + 1][j].state)
                        return true;
                }
            }
        }

        return false;
    };

    /**
     * 画布是否填满数字方块
     */
    Canvas.prototype._Space = Canvas.prototype._iteratee(function (i, j) {
        if (!this.numberSquares[i][j].state)
            return true;
    });

    /**
     * 渲染所有布局方块DOM
     */
    Canvas.prototype.renderLayoutSquareDOM = Canvas.prototype._iteratee(function (i, j) {
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

    /**
     * 创建数字方块
     */
    Canvas.prototype._generateNumberSquare = function () {
        for (var i = 0; i < this.rowMaximum; i++) {
            this.numberSquares[i] = new Array();

            for (var j = 0; j < this.columnMaximum; j++) {
                var x = j * this.squareHeight + (j + 1) * this.squareGap;
                var y = i * this.squareWidth + (i + 1) * this.squareGap;

                this.numberSquares[i][j] = new NumberSquare(
                    x,
                    y,
                    this.squareWidth,
                    this.squareHeight,
                    this.numberSquareClassName,
                    this.element
                );
            }
        }
    };

    /**
     * 显示所有数字方块
     */
    Canvas.prototype._showNumberSquare = Canvas.prototype._iteratee(function (i, j) {
        var currentNumberSquare = this.numberSquares[i][j];

    });

    /**
     * 渲染所有数字方块DOM
     */
    Canvas.prototype.renderNumberSquareDOM = function () {
        this._generateNumberSquare();
        this._iteratee(function (i, j) {
            this.numberSquares[i][j].render();
        }).call(this);
    };

    /*
    * 清空所有数字方块DOM
    * */
    Canvas.prototype.clearAllNumberSquare = function () {
        $('.' + this.numberSquareClassName).remove();
    };

    return Canvas;
});