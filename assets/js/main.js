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

    // 渲染布局方块
    canvas.renderLayoutSquareDOM();

    // 生成数字方块
    canvas.generateNumberSquare();

    // 渲染数字方块
    canvas.renderNumberSquareDOM();

    // 生成随机数字方块
    canvas.generateRandomNumberSquare();
    canvas.generateRandomNumberSquare();

}

document.addEventListener('DOMContentLoaded', function () {
    main();
}, false);