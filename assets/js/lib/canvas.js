// 画布
// 曾文彬
// 2016-6-17
// 461153861

'use strict';

(function (win, factory) {
    var backgroundColorMap = {
        2: '#ede0c8',
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

    /*
    * 初始化新游戏
    * */
    Canvas.prototype.initNewGame = function () {
        // 清空布局方块
        canvas.clearAllSquareDOM(canvas.layoutSquareClassName);

        // 渲染布局方块
        canvas.renderLayoutSquareDOM();

        // 清空数字方块
        canvas.clearAllSquareDOM(canvas.numberSquareClassName);

        // 生成数字方块
        canvas.generateNumberSquare();

        // 渲染数字方块
        canvas.renderNumberSquareDOM();

        // 生成随机数字方块
        canvas.generateRandomNumberSquare();
        canvas.generateRandomNumberSquare();
    };

    /**
     * @param {String} selector 画布选择器
     * @param {String} scoreSelector 分数选择器
     * @constructor
     */
    Canvas.prototype.init = function (selector, scoreSelector) {
        this.element = doc.querySelector(selector);
        this.scoreElement = doc.querySelector(scoreSelector);
        this.score = 0;
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

        // 初始化分数
        this._updateScore(0);
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
        e.preventDefault();

        var touch = e.touches[0];
        this.touchStartX = touch.pageX;
        this.touchStartY = touch.pageY;
    };

    Canvas.prototype._touchendListener = function (e) {
        e.preventDefault();

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
        if (!this._Space()) {
            alert('空');
            return false;
        }

        var randXY = this._generateRandomXY();
        var currentSquare = null;

        // 检测该随机坐标是否存在数字方块
        while (true) {
            if (!(currentSquare = this.numberSquares[randXY['randX']][randXY['randY']]).state)
                break;

            randXY = this._generateRandomXY();
        }

        currentSquare.setState(1);
        currentSquare.setText('2');
        currentSquare.showWithText(backgroundColorMap[currentSquare.getText()], this._getNumberSquareFontColor(2), true);
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
                    if (dispose.call(this, i, j) === true)
                        return true;
                }
            }
        };
    };

    /**
     * 画布更新
     */
    Canvas.prototype._update = function () {
        // 清空所有数字方块DOM
        this.clearAllSquareDOM(this.numberSquareClassName);

        // 画布重新渲染数字方块
        this.renderNumberSquareDOM();

        // 显示随机数字方块
        this.generateRandomNumberSquare();

        // 显示带有数字方块
        this._showNumberSquare();
    };

    /**
     * 数字方块更新
     *
     * @param {Number} i 坐标索引
     */
    Canvas.prototype._updateNumberSquare = function (numberSquare, state, text) {
        numberSquare.setState(state);
        numberSquare.setText(text);
    };

    /**
     * 更新分数
     *
     * @param {Number} score 分数
     */
    Canvas.prototype._updateScore = function (score) {
        this.score += score;
        this.scoreElement.innerHTML = '' + this.score;
    };

    /**
     * 数字方块坐标迭代
     *
     * @param {Function} dispose 处理函数
     * @return {Function}
     */
    Canvas.prototype._iterateeAxis = function (dispose) {
        return function () {
            for (var i = 0; i < this.rowMaximum; i++)
                dispose.call(this, i);

            // 更新画布
            setTimeout((function () {
                this._update();
            }).bind(this), 200);
        };
    };

    /**
     * 检测left方向当前方块和目标方块之间是否存在空的方块
     */
    Canvas.prototype._detectLeftSequareBetween = function (row, nextColumn, prevColumn) {
        for (var amount = prevColumn + 1; amount < nextColumn; amount++) {
            if (this.numberSquares[row][amount].state)
                return false;
        }

        return true;
    };

    /**
     * 检测right方向当前方块和目标方块之间是否存在空的方块
     */
    Canvas.prototype._detectRightSequareBetween = function (row, nextColumn, prevColumn) {
        for (var amount = prevColumn - 1; amount > nextColumn; amount--) {
            if (this.numberSquares[row][amount].state)
                return false;
        }

        return true;
    };

    /**
     * 检测top方向当前方块和目标方块之间是否存在空的方块
     */
    Canvas.prototype._detectTopSequareBetween = function (row, column, nextRow) {
        for (var amount = nextRow + 1; amount < row; amount++) {
            if (this.numberSquares[amount][column].state)
                return false;
        }

        return true;
    };

    /**
     * 检测bottom方向当前方块和目标方块之间是否存在空的方块
     */
    Canvas.prototype._detectBottomSequareBetween = function (row, column, nextRow) {
        for (var amount = nextRow - 1; amount > row; amount--) {
            if (this.numberSquares[amount][column].state)
                return false;
        }

        return true;
    };

    /**
     * 数字方块一系列操作
     *
     * @param {Number} i 横坐标迭代量
     * @param {Number} j 纵坐标迭代量
     * @param {Number} k 当前坐标当前元素的下一个元素的迭代量
     * @param {Object} currentSquare 当前存在数字的方块
     * @param {Object} staySquare 目标方块
     * @param {Function} detectDisponse 检测方法
     * @param {Number} sign 方向标识 [可选] default: 0-水平 1-垂直
     */
    Canvas.prototype._numberSquareSeriesOption = function (i, j, k, currentSquare, staySquare, detectDispose, sign) {
        var number = 0;
        var axis = {};
        sign || (sign = 0);

        if (!staySquare.state && detectDispose.call(this, i, j, k)) { // 如果找到第一个为空的数字方块，则判断为最近的落脚点
            number = currentSquare.text;

            // 当前数字方块状态更新为0
            this._updateNumberSquare(currentSquare);

            // 目标数字方块状态更新为1，并设置数字为2
            this._updateNumberSquare(staySquare, 1, number);

            // 移动当前数字方块
            if (!sign) {
                axis.left = this._getPosition(k);
                axis.top = this._getPosition(i);
            } else {
                axis.left = this._getPosition(j);
                axis.top = this._getPosition(k);
            }

            currentSquare.moveWithAnimation(axis);

            return true;
        } else if (staySquare.text === currentSquare.text && detectDispose.call(this, i, j, k)) { // 如果找到第一个数字相同的数字方块，则判断为最近的落脚点
            // 求和
            number = parseInt(currentSquare.text) + parseInt(staySquare.text);

            // 当前数字方块状态更新为0
            this._updateNumberSquare(currentSquare);

            // 目标数字方块状态更新为1，并设置数字为两者总和
            this._updateNumberSquare(staySquare, 1, number);

            // 更新分数
            this._updateScore(number);

            // 移动当前数字方块
            if (!sign) {
                axis.left = this._getPosition(k);
                axis.top = this._getPosition(i);
            } else {
                axis.left = this._getPosition(j);
                axis.top = this._getPosition(k);
            }

            currentSquare.moveWithAnimation(axis);

            return true;
        }
    };

    /**
     * 数字方块向左移动
     */
    Canvas.prototype._moveLeft = Canvas.prototype._iterateeAxis(function (i) {
        for (var j = 1; j < this.columnMaximum; j++) {
            if (this.numberSquares[i][j].state) {
                for (var k = 0; k < j; k++) {
                    if (this._numberSquareSeriesOption(i, j, k, this.numberSquares[i][j], this.numberSquares[i][k], this._detectLeftSequareBetween, 0))
                        break;
                }
            }
        }
    });

    /**
     * 数字方块向右移动
     */
    Canvas.prototype._moveRight = Canvas.prototype._iterateeAxis(function (i) {
        for (var j = this.columnMaximum - 2; j >= 0; j--) {
            if (this.numberSquares[i][j].state) {
                for (var k = this.columnMaximum - 1; k > j; k--) {
                    if (this._numberSquareSeriesOption(i, j, k, this.numberSquares[i][j], this.numberSquares[i][k], this._detectRightSequareBetween, 0))
                        break;
                }
            }
        }
    });

    /**
     * 数字方块向上移动
     */
    Canvas.prototype._moveTop = Canvas.prototype._iterateeAxis(function (i) {
        for (var j = 1; j < this.columnMaximum; j++) {
            if (this.numberSquares[j][i].state) {
                for (var k = 0; k < j; k++) {
                    if (this._numberSquareSeriesOption(j, i, k, this.numberSquares[j][i], this.numberSquares[k][i], this._detectTopSequareBetween, 1))
                        break;
                }
            }
        }
    });

    /**
     * 数字方块向下移动
     */
    Canvas.prototype._moveBottom = Canvas.prototype._iterateeAxis(function (i) {
        for (var j = this.columnMaximum - 2; j >= 0; j--) {
            if (this.numberSquares[j][i].state) {
                for (var k = this.columnMaximum - 1; k > j; k--) {
                    if (this._numberSquareSeriesOption(j, i, k, this.numberSquares[j][i], this.numberSquares[k][i], this._detectBottomSequareBetween, 1))
                        break;
                }
            }
        }
    });


    /**
     * 计算位置
     *
     * @param {Number} i 坐标索引
     * @return {Number}
     */
    Canvas.prototype._getPosition = function (i) {
        return this.squareGap + i * (this.squareHeight + this.squareGap);
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
        var x = this._getPosition(j);
        var y = this._getPosition(i);

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
     * 显示数字方块
     */
    Canvas.prototype._showNumberSquare = Canvas.prototype._iteratee(function (i, j) {
        var currentNumberSquare = this.numberSquares[i][j];

        if (currentNumberSquare.getState()) {
            currentNumberSquare.showWithText(
                backgroundColorMap[currentNumberSquare.getText()],
                this._getNumberSquareFontColor(currentNumberSquare.getText())
            );
        }
    });

    /**
     * 创建数字方块
     */
    Canvas.prototype.generateNumberSquare = function () {
        for (var i = 0; i < this.rowMaximum; i++) {
            this.numberSquares[i] = new Array();

            for (var j = 0; j < this.columnMaximum; j++) {
                var x = this._getPosition(j);
                var y = this._getPosition(i);

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
     * 渲染所有数字方块DOM
     */
    Canvas.prototype.renderNumberSquareDOM = Canvas.prototype._iteratee(function (i, j) {
        this.numberSquares[i][j].render();
    });

    /**
     * 获取数字方块字体颜色
     */
    Canvas.prototype._getNumberSquareFontColor = function (number) {
        return number < 4 ? '#776e65' : '#fff';
    };

    /**
     * 清空所有DOM
     */
    Canvas.prototype.clearAllSquareDOM = function (squareClassName) {
        $('.' + squareClassName).remove();
    };

    return Canvas;
});