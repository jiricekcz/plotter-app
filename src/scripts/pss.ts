let pen = false;

export function draw(context: CanvasRenderingContext2D, pssScript: string): void {
    context.clearRect(0, 0, 230, 400);
    const inst = pssScript.split("\n").map(v => v.trim());
    inst.forEach(v => instruction(context, v));
    context.closePath();
    context.stroke();
    context.beginPath();
}
export function instruction(context: CanvasRenderingContext2D, instruction: string): void {
    const ins = instruction.split(" ")[0];
    const res = instruction.replace(ins + " ", "").split(" ").map(v => v.trim());
    (<any>window).c = context;
    switch (ins) {
        case "goto":
            console.log("aha")
            if (pen) {
                console.log(Number(res[0]), Number(res[1]));
                context.lineTo(Number(res[0]), Number(res[1]))
                context.stroke();
                return;
            }
            return context.moveTo(Number(res[0]), Number(res[1]));
        case "push":
            return void (pen = true);
        case "pull":
            return void (pen = false);
    }

}