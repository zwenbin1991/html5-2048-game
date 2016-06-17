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

    BlockContainer.prototype.init = function () {
        this.blocks = [];
        this.score = 0;
        this.blockRowTotal = 4;
        this.blockCellTotal = 4;
        this.blockWidth = 1;
        this.blockHeight = 1;

        // 渲染所有方块
        this.renderBlocks();

        // 渲染容器
        this.renderGrid();
    };

    BlockContainer.prototype.generateBlockRandomCoordinate = function () {
        var coordinateX = parseInt(Math.random() * this.blockRowTotal);
        var coordinateY = parseInt(Math.random() * this.blockCellTotal);

        return {
            coordinateX: coordinateX,
            coordinateY: coordinateY
        };
    };

    BlockContainer.prototype.generateOffsetPosition = function (coordinateX, coordinateY) {
        var left = coordinateX * this.blockWidth + (coordinateX + 1) * 0.2;
        var top = coordinateY * this.blockHeight + (coordinateY + 1) * 0.2;

        return {
            left: left,
            top: top
        };
    };

    BlockContainer.prototype.renderGrid = function () {
        this.blocks.forEach(function (block) {
            block.renderOrMove();
        });
    };

    BlockContainer.prototype.renderBlocks = function () {
        for (var coordinateX = 0; coordinateX < this.blockRowTotal; coordinateX++) {
            for (var coordinateY = 0; coordinateY < this.blockCellTotal; coordinateY++) {
                var offsetPosition = this.generateOffsetPosition(coordinateX, coordinateY);
                this.blocks.push(new Block(this.blockWidth, this.blockHeight, coordinateX, coordinateY, offsetPosition.left, offsetPosition.top, this));
            }
        }
    };
});
