let leftStickAngle = 0;
let leftSpeed = 0;

let rightStickAngle = 0;
let rightSpeed = 0;

function updateGamepad() {
    const gp = navigator.getGamepads()[0];
    if (!gp) return;

    // ---------- 左スティック ----------
    const lx = gp.axes[0] ?? 0; // undefinedなら0
    const ly = gp.axes[1] ?? 0;
    const lMag = Math.sqrt(lx*lx + ly*ly);

    if(lMag < 0.1){
        leftSpeed = 0;
        leftStickAngle = 0;
    } else if(lMag < 0.4){
        leftSpeed = 1;
        leftStickAngle = Math.atan2(-ly, lx);
    } else if(lMag < 0.7){
        leftSpeed = 2;
        leftStickAngle = Math.atan2(-ly, lx);
    } else {
        leftSpeed = 3;
        leftStickAngle = Math.atan2(-ly, lx);
    }

    // ---------- 右スティック ----------
    // Joy-Con片方の時は axes[2] や axes[3] が存在しないことがある
    if(gp.axes.length >= 4){
        const rx = gp.axes[2] ?? 0;
        const ry = gp.axes[3] ?? 0;
        const rMag = Math.sqrt(rx*rx + ry*ry);

        if(rMag < 0.1){
            rightSpeed = 0;
            rightStickAngle = 0;
        } else if(rMag < 0.4){
            rightSpeed = 1;
            rightStickAngle = Math.atan2(-ry, rx);
        } else if(rMag < 0.7){
            rightSpeed = 2;
            rightStickAngle = Math.atan2(-ry, rx);
        } else {
            rightSpeed = 3;
            rightStickAngle = Math.atan2(-ry, rx);
        }
    } else {
        rightSpeed = 0;       // 右スティックなしの場合
        rightStickAngle = 0;
    }
}

// 毎フレーム更新
function gameLoop() {
    updateGamepad();
    requestAnimationFrame(gameLoop);
}

window.addEventListener("gamepadconnected", () => {
    console.log("Gamepad connected!");
    gameLoop();
});

