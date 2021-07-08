import express from 'express';
import bodyParser from 'body-parser';
import fs from 'fs';

import * as binaryCompiler from './binaryCompiler';




export async function init(): Promise<void> {

}
export const server = express();
server.use(bodyParser.json());
server.post("/compile/", (req, res) => {
    const body = <any>req.body;
    console.log(body);
    try {
        const data = binaryCompiler.compile(body.data);
        console.log(data);
        fs.writeFileSync("../instructions.bin", data);
    } catch (e) {
        console.log(e);
    }
    res.writeHead(200).end();
});
server.listen(9753)