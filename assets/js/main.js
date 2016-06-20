// 入口文件
// 曾文彬
// 2016-6-17
// 461153861

'use strict';

// 画布
var canvas = null;

// 跨终端适配
viewport();

function initGame () {
    canvas = new Canvas('#box2048 .grid', '.score');
    canvas.initNewGame();
}

document.addEventListener('DOMContentLoaded', function () {
    initGame();

    document.querySelector('.new-game').addEventListener('touchstart', function (e) {
        initGame();
        e.preventDefault();
    }, false);
}, false);