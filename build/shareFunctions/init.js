"use strict";

// ゲームの開始を知らせる
let gameStart = false;

// ミノを構成する一つのブロックのサイズ
const blockSize = 30;

// テトロミノのサイズ
const tetroSize = 4;

// 画面の準備 ----------------------------------------------------------------

const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

const fieldCol = 10;
const fieldRow = 20;

canvas.width = blockSize * fieldCol;
canvas.height = blockSize * fieldRow;

const left = document.getElementById("left");
const right = document.getElementById("right");
const rotateLeft = document.getElementById("rotate-left");
const rotateRight = document.getElementById("rotate-right");
const drop = document.getElementById("drop");

const body = document.querySelector("body");
// canvas.style.marginLeft = (body.clientWidth / 2) - (canvas.width / 2) + 'px';

// 次のミノの表示画面
const next = document.getElementById("next");
const ntx = next.getContext("2d");

next.width = blockSize * 4;
next.height = blockSize * 4;

let score = 0;
const scoreView = document.getElementById("score");
scoreView.innerText = `SCORE : ${score} P`;

// ホールド画面の表示
const holdView = document.getElementById("hold");
const htx = holdView.getContext("2d");

holdView.width = blockSize * 4;
holdView.height = blockSize * 4;

// フィールドの色関連
const fieldColor = "rgb(206, 230, 163)";
canvas.style.backgroundColor = fieldColor;
canvas.style.outline = "4px solid #555";

const tetroColors = [
  fieldColor,
  "green",
  "yellow",
  "rgb(116, 143, 231)", //blue,
  "skyblue",
  "gray",
  "orange",
  "pink",
];

// フィールドの宣言
let field = [];

// ゲームオーバーフラグ
let gameOver = false;

// 現在ホールドしているかどうか
let hold = false;

// ホールドしているテトリミノ
let holdTetro;

// ホールドしているテトリミノのタイプ
let holdType;

//ホールドして良いかどうか
let toggleHold = true;

// テトロミノの宣言
const tetroTypes = [
  [], //0, 空っぽ -> 着地点用
  [
    //1, I
    [1, 1, 1, 1],
    [0, 0, 0, 0],
    [0, 0, 0, 0],
    [0, 0, 0, 0],
  ],
  [
    //2, L
    [0, 1, 0, 0],
    [0, 1, 0, 0],
    [0, 1, 1, 0],
    [0, 0, 0, 0],
  ],
  [
    //3, J
    [0, 0, 1, 0],
    [0, 0, 1, 0],
    [0, 1, 1, 0],
    [0, 0, 0, 0],
  ],
  [
    //4, T
    [0, 1, 0, 0],
    [0, 1, 1, 0],
    [0, 1, 0, 0],
    [0, 0, 0, 0],
  ],
  [
    //5, O
    [0, 0, 0, 0],
    [0, 1, 1, 0],
    [0, 1, 1, 0],
    [0, 0, 0, 0],
  ],
  [
    //6, Z
    [0, 0, 0, 0],
    [1, 1, 0, 0],
    [0, 1, 1, 0],
    [0, 0, 0, 0],
  ],
  [
    //7, S
    [0, 0, 0, 0],
    [0, 1, 1, 0],
    [1, 1, 0, 0],
    [0, 0, 0, 0],
  ],
];
const tetroTypesObject = {
  1: "I",
  2: "L",
  3: "J",
  4: "T",
  5: "O",
  6: "Z",
  7: "S",
};
// テトロミノの初期地点　ー＞　画面中央の上から出現する
const startX = fieldCol / 2 - tetroSize / 2;
const startY = 0;

// テトロミノの座標
let tetroX = startX;
let tetroY = startY;

// テトロミノの落ちるスピード -> dropSpeed (ミリ秒)に１ブロック分落ちる (1000ミリ秒で1秒)
const dropSpeed = 800;

// キーボード操作
document.onkeydown = (e) => {
  gameController(e);
};

document.onkeydown = (e) => {
  gameController(e.keyCode);
};

// ntx.fillRect(0, 0, blockSize, blockSize);
// ゲームの実行処理
let Ttype = getRandomNum(1, tetroTypes.length - 1);
let newTtype = getRandomNum(1, tetroTypes.length - 1);

// console.log("now : " + Ttype + " new : " + newTtype);

let newTetro = tetroTypes[newTtype];
let tetro = tetroTypes[Ttype];

init();
let gameInterval = setInterval(dropBlock, dropSpeed);
