// 方块容器类
// 曾文彬
// 2016-6-17
// 461153861

'use strict';

(function (win, factory) {
    win.BlockContainer = factory();
})(window, function () {
    var BlockContainer = function () {
        this.init.apply(this, arguments);
    };

    BlockContainer.prototype.init = function (selector, cellClassName) {
        this.blocks = [];
        this.score = 0;
        this.blockRowTotal = 4;
        this.blockCellTotal = 4;
        this.blockWidth = 1;
        this.blockHeight = 1;
        this.el = document.querySelector(selector);
        this.cellClassName = cellClassName;
        this.startLeft = 0;
        this.startTop = 0;
        this.endLeft = 0;
        this.endTop = 0;

        // 滑动事件绑定
        this._bindTouchEvent();

        // 渲染所有方块
        this.renderBlocks();

        // 渲染容器
        this.renderGrid();
    };

    BlockContainer.prototype._bindTouchEvent = function () {
        eventListener('touchstart,touchend', {
            touchstart: {
                el: document,
                listen: this._touchStartListener.bind(this)
            },
            touchend: {
                el: document,
                listen: this._touchEndListener.bind(this)
            }
        });
    };

    BlockContainer.prototype._touchStartListener = function (e) {
        e.preventDefault();

        var touch = e.touches[0];
        this.startLeft = touch.pageX;
        this.startTop = touch.pageY;
    };

    BlockContainer.prototype._touchEndListener = function (e) {
        e.preventDefault();

        var touch, deltaHorizontal, deltaVertical, direction;

        touch = e.changedTouches[0];

        this.endLeft = touch.pageX;
        this.endTop = touch.pageY;

        deltaHorizontal = this.endLeft - this.startLeft;
        deltaVertical = this.endTop - this.startTop;

        // 如果滑动距离小于预定值，则试做点击
        if (!swipe.detectSwipe(deltaHorizontal, deltaVertical)) return;

        direction = swipe.detectSwipeDirection(deltaHorizontal, deltaVertical);
        
    };

    BlockContainer.prototype._generateBlockRandomCoordinate = function () {
        var coordinateX = parseInt(Math.random() * this.blockRowTotal);
        var coordinateY = parseInt(Math.random() * this.blockCellTotal);

        return {
            coordinateX: coordinateX,
            coordinateY: coordinateY
        };
    };

    BlockContainer.prototype._matchCoordinate = function (coordinates, coordinateX, coordinateY) {
        for (var i = 0, coordinate, length = coordinates.length; i < length; i++) {
            coordinate = coordinates[i];

            if (coordinate.coordinateX === coordinateX && coordinate.coordinateY === coordinateY) return true;
        }

        return false;
    };

    BlockContainer.prototype._generateOffsetPosition = function (coordinateX, coordinateY) {
        var left = coordinateX * this.blockWidth + (coordinateX + 1) * 0.2;
        var top = coordinateY * this.blockHeight + (coordinateY + 1) * 0.2;

        return {
            left: left,
            top: top
        };
    };

    BlockContainer.prototype.renderGrid = function () {
        this.blocks.forEach(function (block) {
            block.render();
        });
    };

    BlockContainer.prototype.renderBlocks = function () {
        var randomCoordinates = [this._generateBlockRandomCoordinate(), this._generateBlockRandomCoordinate()], offsetPosition, isTextExist;

        for (var coordinateX = 0; coordinateX < this.blockRowTotal; coordinateX++) {
            for (var coordinateY = 0; coordinateY < this.blockCellTotal; coordinateY++) {
                offsetPosition = this._generateOffsetPosition(coordinateX, coordinateY);
                isTextExist = this._matchCoordinate(randomCoordinates, coordinateX, coordinateY);

                this.blocks.push(
                    new Block(
                        this.blockWidth,
                        this.blockHeight,
                        coordinateX,
                        coordinateY,
                        offsetPosition.left,
                        offsetPosition.top,
                        isTextExist ? '2' : void 0,
                        this,
                        this.cellClassName
                    )
                );
            }
        }
    };

    return BlockContainer;
});