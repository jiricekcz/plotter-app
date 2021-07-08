import bigintBuffer from 'bigint-buffer';
//@ts-ignore
bigintBuffer = require("bigint-buffer");
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
                let x = BigInt.asUintN(32, BigInt(Math.round(Number(inst.split(" ")[1]) * 10000)));
                let y = BigInt.asUintN(32, BigInt(Math.round(Number(inst.split(" ")[2]) * 10000)));
                if (Number.isNaN(x + y)) throw new Error("Invalid goto statement.");
                const xB = bigintBuffer.toBufferLE(x, 4);
                const yB = bigintBuffer.toBufferLE(y, 4);
                arr.push(xB[0], xB[1], xB[2], xB[3], yB[0], yB[1], yB[2], yB[3]);
                break;
        }
    }
    return Buffer.from(arr);
}