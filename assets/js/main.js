// 入口文件
// 曾文彬
// 2016-6-17
// 461153861

'use strict';

// 方块容器实例
var blockContainer = null;

var scoreElement = document.querySelector('.score');

function main () {
    // 跨终端适配
    viewport();

    // 初始化游戏
    initGame();
}

function initGame () {
    blockContainer = new BlockContainer('#box2048 .grid');
    scoreElement.innerHTML = blockContainer.score;
}

document.addEventListener('DOMContentLoaded', function () {
    main();
}, false);