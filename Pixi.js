import { Container } from "pixi.js";

/******************/
// 随机数函数工具 //
/****************/
function randomInt (min, max) {
    return Math.floor(Math.random()*(max - min + 1) + min);
}

/****************/
// sprite的位置 //
/***************/
sprite.x = x;
sprite.y = y;
sprite.position.set(x, y);


/****************/
// sprite的大小 //
/***************/
sprite.width = width;
sprite.height = height;
sprite.scale.x = 2;     // 宽为2倍
sprite.scale.y = 2;     // 高为2倍
cat.scale.set(2, 2);


/********************/
// sprite的旋转角度 //
/******************/
sprite.rotation = Number;


/****************/
// sprite的锚点 //
/***************/
sprite.anchor.x(0-1);
sprite.anchor.y(0-1);
sprite.anchor.set(0-1, 0-1);
sprite.pivot.set(x, y);


/**************/
// 删除sprite //
/*************/
app.stage.removeChild(sprite);


/**************/
// 隐藏sprite //
/*************/
sprite.visible = false;


/************/
// 定义别名 //
/**********/
let Application = PIXI.Application,
    loader = PIXI.loader,
    resources = PIXI.loader.resources,
    TextureCache = PIXI.utils.TextureCache,
    Sprite = PIXI.Sprite,
    Rectangle = PIXI.Rectangle;


/****************/
// 创建PIXI应用 //
/***************/
let app = new Application();


/*********************************/
// 把PIXI应用的 视图 渲染到body中 //
/********************************/
document.body.appendChild(app.view);


/***************/
// 更换画布颜色 //
/**************/
app.renderer.backgroundColor = 0x061639;


/*******************/
// 加载单个整个图片 //
/******************/
PIXI.loader
    // 加载图像 //
    .add(["images/cat.png"])
    // 调用setup方法,并为加载的图像创建一个精灵 //
    .load(setup);

function setup () {
    // 连接loader的resources对象 //
    let cat = new PIXI.Sprite(PIXI.loader.resources["images/cat.png"].texture);  

    // 把精灵放到app.stage(舞台)上
    app.stage.addChild(cat); 
};


/*********************/
// 加载雪碧图中的部分 //
/********************/
PIXI.loader
    // 加载图像 //
    .add(["./images/10.png","./images/cat.png"])
    .load(setup);

function setup () {
    // 从纹理中创建"10"精灵 //
    let texture = PIXI.loader.resources["./images/10.png"].texture;

    // 创建一个矩形对象并且设置矩形的位置和大小 //
    let rectangle = new PIXI.Rectangle(21, 55, 39, 40);
    // 告诉纹理使用"10"精灵的矩形部分 //
    texture.frame = rectangle;

    // 从纹理创建"tiger"精灵 //
    let tiger = new PIXI.Sprite(texture);
    tiger.position.set(100, 100);

    // 从纹理创建"cat"精灵 //
    let cat = new PIXI.Sprite(PIXI.loader.resources["./images/cat.png"].texture);
    cat.position.set(200, 200);

    // 将"tiger, cat"精灵放到舞台上 //
    app.stage.addChild(tiger, cat);
}


/*************************/
// 三种方法加载纹理贴图集 //
/***********************/
loader
    .add(["images/package.json"])
    .load(setup);

let id;

function setup () {

    // 第一种方法 //
    /* let texture = TextureCache["armor.png"],
        armor = new Sprite(texture); */

    // 第二种方法 //
    /* let armor = new Sprite(
        resources["images/package.json"].textures["armor.png"]
    ); */

    // 第三种方法 //
    id = resources["images/package.json"].textures;

    let armor = new Sprite(
        id["armor.png"]
    );

    app.stage.addChild(armor);
}


/************/
// 移动精灵 //
/***********/

// 游戏循环 //
let sprite, id, state;

function setup () {
    id = resources["**/**.**"].textures;
    
    sprite = new Sprite(id["**.**"]);
    
    sprite.y = 96;
    
    // 初始化vx, vy属性 //
    sprite.vx = 0;
    sprite.vy = 0;

    app.stage.addChild(sprite);
    
    // 设置游戏状态 //
    state = play;

    // 开始游戏循环 //
    app.ticker.add(delta => gameLoop(delta));
}

// 更新当前游戏状态 //
function gameLoop (delta) {
    state(delta);
}

// 每帧向右下移动 1px //
function play (delta) {
    sprite.vx = 1;
    sprite.vy = 1;
    sprite.x = sprite.vx + delta;
    sprite.y = sprite.vy + delta;
}
/* 
    每当开始 游戏循环 的时候,都会为 cat 增加1px的x轴位移;
    每一个放进 ticker 的函数每秒都会执行 60 次;
    delta 的值代表帧的部分延迟,当把它添加到 cat 的位置时,让 cat 的速度和帧率无关;
*/


/************/
// 精灵分组 //
/***********/
loader
    .add("images/animals.json")
    .load(setup);

let id;

function setup(){
    id = resources["images/animals.json"].texture;

    let cat = new Sprite(id["cat.png"]);
    let tiger = new Sprite(id["tiger.png"]);
    

    let animals = new Container();
    /* 高性能精灵组
    let superFastSprites = new PIXI.particles.ParticleContainer();
    可用属性: x, y, width, height, scale, pivot, alpha, visible;
    它包含的精灵不能再嵌套自己的孩子精灵 */
    animals.addChild(cat);
    animals.addChild(tiger);
    
    app.stage.addChild(animals);
    
    // 三种获取精灵兔全局位置的方式 //
    // tiger.parent === animals //
    console.log(animals.toGlobal(tiger.position));
    console.log(tiger.parent.toGlobal(tiger.position));
    // 以上两种方式返回一个对象 //
    // 以下方式返回Number //
    console.log(tiger.getGlobalPosition().x);
}


// *********//
// 绘制图形 //
// ********//
let graphics = new PIXI.Graphics;

graphics.beginFill(0xff0000);
graphics.lineStyle(4, 0x00ff00);
// graphics.drawRect(x, y, width, height);   // 矩形
// graphics.drawRoundedRect(x, y, width, height, cornerRadius);     // 圆角矩形
// graphics.drawCircle(x, y, radius);   // 圆形
// graphics.drawEllipse(x, y, width, height);    // 椭圆
graphics.endFill();
// graphics.position.set(x, y);

app.stage.addChild(graphics);

// 绘制线段 //
let line = new PIXI.Graphics;
line.lineStyle(4, 0xff0000);
line.moveTo(x, y);  // 起点
line.lineTo(x, y);  // 终点
// line.position.set(x, y);
app.stage.addChild(line);

// 绘制多边形 //
let triangle = new PIXI.Graphics;
triangle.beginFill(0xff0000);
triangle.lineStyle(4, 0x00ff00);
triangle.drawPolygon([
    x, y,
    x, y,
    x, y,
    x, y
]);
triangle.endFill();
// triangle.position.set(x, y);
app.stage.addChild(triangle);




















































































