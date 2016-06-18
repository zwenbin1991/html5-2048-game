// 入口文件
// 曾文彬
// 2016-6-17
// 461153861

'use strict';

// 画布
var canvas = null;

function main () {
    // 跨终端适配
    viewport();

    // 初始化游戏
    initGame();
}

function initGame () {
    canvas = new Canvas('#box2048 .grid');

    // 渲染普通方块
    canvas.renderLayoutSquare();
    //scoreElement.innerHTML = blockContainer.score;
}

document.addEventListener('DOMContentLoaded', function () {
    main();
}, false);