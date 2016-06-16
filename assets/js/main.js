// 入口文件
// 曾文彬
// 2016-6-17
// 461153861

'use strict';

// 方块
var blocks = [];

// 分数
var score = 0;

function main () {
    // 跨终端适配
    viewport();

    // 初始化游戏
    initGame();
}

function initGame () {
    game.init();
}

document.addEventListener('DOMContentLoaded', function () {
    main();
}, false);