export function compile(pssCode: string): Buffer {
    const instructions = pssCode.toLowerCase().split("\n").map(v => v.trim());
    const arr: Array<number> = [];
    for (const inst of instructions) {
        var name = inst.split(" ")[0];
        switch (name) {
            case "home":
                arr.push(0x1F);
                break;
            case "push":
                arr.push(0xF0);
                break;
            case "pull":
                arr.push(0xF1);
                break;
            case "end":
                arr.push(0xAA);
                break;
            case "speed":
                arr.push(0xB0);
                let speed = Number(inst.split(" ")[1]);
                if (Number.isNaN(speed) || speed < 0.01 || speed > 2.5) throw new Error("Invalid speed value. Values between 0.01 and 2.5");
                arr.push(Math.round(speed * 100));
                break;
            case "goto":
                arr.push(0x20);
                let x = Math.round(Number(inst.split(" ")[1]) * 10000);
                let y = Math.round(Number(inst.split(" ")[2]) * 10000);
                if (Number.isNaN(x + y)) throw new Error("Invalid goto statement.");
                const xa: Array<number> = [];
                const ya: Array<number> = [];
                for (var i = 0; i < 4; i++) {
                    xa.push(x % 256);
                    x -= 256; x /= 256;
                }
                for (var i = 0; i < 4; i++) {
                    ya.push(y % 256);
                    y -= 256; y /= 256;
                }
                for (var i = 3; i >= 0; i--) arr.push(xa[i]);
                for (var i = 3; i >= 0; i--) arr.push(ya[i]);
                break;
        }
    }
    return Buffer.from(arr);
}