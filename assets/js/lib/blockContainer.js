// 方块容器类
// 曾文彬
// 2016-6-17
// 461153861

'use strict';

(function (win, factory) {
    win.BlockContainer = factory([].slice, /(left|top)/i, /(right|bottom)/i);
})(window, function (nativeSlice, reverseExp, forwardExp) {
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

        // 得到滑动方向
        direction = swipe.detectSwipeDirection(deltaHorizontal, deltaVertical);

        this._moveBlocks(this._getUnNullBlocks(), direction);
    };

    BlockContainer.prototype._detectNullBlockExist = function () {
        var blocks = this.blocks;

        for (var i = 0, length = blocks.length; i < length; i++) {
            if (!blocks[i].state) return true;
        }

        return false;
    };

    BlockContainer.prototype._detectSingleNullBlockExist = function (block, direction, isForward, isReverse) {
        //var coordinateIndex = Math.floor(block[sign] / this.blockCellTotal);
        var coordinate = isForward.test(direction) ?
            (RegExp.$1 === 'right' ? 'coordinateX' : 'coordinateY') :
            (RegExp.$1 === 'left' ? 'coordinateX' : 'coordinateY');

        var blocks = this._getBlocksByCoordinate(coordinate, block)
        //var startPos = rowIndex * this.blockCellTotal;
        //var endPos = startPos + this.blockCellTotal;
        //
        //for (; startPos < endPos; startPos++) {
        //    if (!blocks[startPos].state) return true;
        //}

        return false;
    };

    BlockContainer.prototype._getBlocksByCoordinate = function (coordinate, block) {
        var blocks = this.blocks;
        var coordinateX = coordinate === 'coordinateX' ? block[coordinate] : 0;
        var coordinateY = coordinate === 'coordinateY' ? block[coordinate] : 0;

        return blocks.filter(function (currentBlock) {
            if (coordinate === 'coordinateX') return currentBlock.coordinateX === coordinateX;
            else return currentBlock.coordinateY === coordinateY;
        });
    };


    BlockContainer.prototype._getRecentlyBlocksByDirection = function (canMoveBlocks, isForward, isReverse) {
        var blocks = this.blocks;
        var startPos, endPos, blockIndex, rowIndex;

        return canMoveBlocks.map(function (canMoveBlock) {
            blockIndex = blocks.indexOf(canMoveBlock);
            rowIndex = Math.floor(blockIndex / this.blockCellTotal);
            startPos = isForward ? rowIndex * this.blockCellTotal :

        });
    };

    BlockContainer.prototype._getUnNullBlocks = function () {
        return this.blocks.filter(function (block) {
            return block.state;
        });
    };

    BlockContainer.prototype._iterateBlocks = function (callback) {
        return function () {
            var blocks = this.blocks;
            var self = this;
            var args = nativeSlice.call(arguments);

            blocks.forEach(function (block) {
                callback.apply(self, [block].concat(args))
            });
        }
    };

    BlockContainer.prototype._moveBlocks = function (unNullBlocks, direction) {
        // 如果容器里没有空的方块
        if (!this._detectNullBlockExist()) {
            alert('全满了');
            return;
        }

        // 是否是正方向
        var isForward = forwardExp.test(direction);
        // 是否是反方向
        var isReverse = reverseExp.test(direction);

        // 得到符合条件的可移动的方块
        var canMoveBlocks = unNullBlocks.filter((function (unNullBlock) {
            return this._detectSingleNullBlockExist(unNullBlock, direction, isForward, isReverse);
        }).bind(this));

        if (canMoveBlocks.length) {
            var recentlyBlocks = this._getRecentlyBlocksByDirection(canMoveBlocks, isForward, isReverse).map(function (pos) {

            });
        }

        //this._iterateBlocks(function (unNullblock) {}, unNullBlocks)();
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

    BlockContainer.prototype.renderGrid = BlockContainer.prototype._iterateBlocks(function (block) {
        block.render();
    });

    BlockContainer.prototype.renderBlocks = function () {
        var randomCoordinates = [this._generateBlockRandomCoordinate(), this._generateBlockRandomCoordinate()], offsetPosition, isTextExist;

        for (var coordinateY = 0; coordinateY < this.blockCellTotal; coordinateY++) {
            for (var coordinateX = 0; coordinateX < this.blockRowTotal; coordinateX++) {
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