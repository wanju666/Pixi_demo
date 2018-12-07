// test PIXI.JS //
(function () {
    let type = "WebGL";

    if (!PIXI.utils.isWebGLSupported()) {
        type = "canvas";
    }

    PIXI.utils.sayHello(type)
})()


import randomInt from './randomInt';
import keyboard from './keyboard';


let Application = PIXI.Application,
    Container = PIXI.Container,
    loader = PIXI.loader,
    TextureCache = PIXI.utils.TextureCache,
    resources = PIXI.loader.resources,
    Sprite = PIXI.Sprite,
    Rectangle = PIXI.Rectangle;


// new PIXI实例 //
let app = new Application({
    width: 512,
    height: 512
});

document.body.appendChild(app.view);

// app.renderer.backgroundColor = 0x061639;

loader
    .add("images/treasureHunter.json")
    .load(setup);

let dungeon,
    explorer,
    treasure,
    door,
    id,
    state;

function setup () {
    // dungeon //
    let dungeonTexture = TextureCache["dungeon.png"];
    dungeon = new Sprite(dungeonTexture);
    app.stage.addChild(dungeon);

    // explorer //
    explorer = new Sprite(
        resources["images/treasureHunter.json"].textures["explorer.png"]
    );
    explorer.x = 68;
    explorer.y = app.stage.height/2 - explorer.height/2;
    // 给精灵创建 vx 和 vy 属性,然后给他们初始值 //
    explorer.vx = 0;
    explorer.vy = 0;
    app.stage.addChild(explorer);

    // 捕获键盘 箭头 键 //
    let left = keyboard(37),
        up = keyboard(38),
        right = keyboard(39),
        down = keyboard(40);

    // 左箭头 press方法 //
    left.press = ()=>{
        explorer.vx = -5;
        explorer.vy = 0;
    }
    // 左箭头 release方法 //
    left.release = ()=>{
        // 如果左箭头已经松开，而右箭头没有向下，explorer也没有垂直移动就停止 //
        if (!right.isDown && explorer.vy === 0) {
            explorer.vx = 0;
        }
    }

    // 上箭头 press方法 //
    up.press = ()=>{
        explorer.vx = 0;
        explorer.vy = -5;
    }
    // 上箭头 release方法 //
    up.release = ()=>{
        if (!down.isDown && explorer.vx === 0) {
            explorer.vy =0;
        }
    }

    // 右箭头 press方法 //
    right.press = ()=>{
        explorer.vx = 5;
        explorer.vy = 0;
    }
    // 右箭头 release方法 //
    right.release = ()=>{
        if (!left.isDown && explorer.vy === 0) {
            explorer.vx = 0;
        }
    }

    // 下箭头 press方法 //
    down.press = ()=>{
        explorer.vx = 0;
        explorer.vy = 5;
    }
    // 下箭头 release方法 //
    down.release = ()=>{
        if (!up.isDown && explorer.vx === 0) {
            explorer.vy =0;
        }
    }

    // 设置游戏状态 //
    state = play;

    // 开始游戏循环 //
    app.ticker.add(delta => gameLoop(delta));
    
    // 定义id使用与多个函数 //
    id = resources["images/treasureHunter.json"].textures;
    
    // treasure //
    treasure = new Sprite(
        id["treasure.png"]
    );
    treasure.position.set(app.stage.width - treasure.width - 48, app.stage.height/2 - treasure.height/2);
    app.stage.addChild(treasure);

    // door //
    door = new Sprite(
        id["door.png"]
    )
    door.position.set(32, 0);
    app.stage.addChild(door);

    // blobs //
    let numberOfBlobs = 6,
        spacing = 48,
        xOffset = 150;
    for (let i=0; i<numberOfBlobs; i++) {
        let blob = new Sprite(id["blob.png"]);
        let x = spacing * i + xOffset;
        let y = randomInt(32, app.stage.height - blob.height - 32);
        blob.x = x;
        blob.y = y;
        app.stage.addChild(blob);
    }
    
}

function gameLoop (delta) {
    state(delta);
}

function play (delta) {
    explorer.x += explorer.vx;
    explorer.y += explorer.vy;
}





































