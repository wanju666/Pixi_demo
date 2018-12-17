// ************//
// 碰撞检测函数 //
// ************//

export default function hitTest(r1, r2) {

    // 定义我们需要计算的变量
    let hit, combinedHalfWidths, combinedHalfHeights, vx, vy;

    // 命中将决定是否有冲突
    hit = false;

    // 找到每个精灵的中心点
    r1.centerX = r1.x + r1.width / 2;
    r1.centerY = r1.y + r1.height / 2;
    r2.centerX = r2.x + r2.width / 2;
    r2.centerY = r2.y + r2.height / 2;

    // 找到每个精灵的半宽半高
    r1.halfWidth = r1.width / 2;
    r1.halfHeight = r1.height / 2;
    r2.halfWidth = r2.width / 2;
    r2.halfHeight = r2.height / 2;

    // 计算精灵之间的距离向量
    vx = r1.centerX - r2.centerX;
    vy = r1.centerY - r2.centerY;

    // 求出组合的半宽半高
    combinedHalfWidths = r1.halfWidth + r2.halfWidth;
    combinedHalfHeights = r1.halfHeight + r2.halfHeight;

    // 检查x轴上是否有碰撞
    if (Math.abs(vx) < combinedHalfWidths) {

        // 可能会发生碰撞。检查在y轴上的碰撞
        if (Math.abs(vy) < combinedHalfHeights) {

            // 发生了碰撞
            hit = true;
        } else {

            // 在y轴上没有碰撞
            hit = false;
        }
    } else {

        // x轴上没有碰撞
        hit = false;
    }

    // 要么是真，要么是假
    return hit;
}