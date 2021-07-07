import express from 'express';
import bodyParser from 'body-parser';
import * as binaryCompiler from './binaryCompiler';




export async function init(): Promise<void> {

}
export const server = express();
server.use(bodyParser.json());
server.post("/compile/", (req, res) => {
    const body = <any>req.body;
    console.log(body);
    try {
        console.log(binaryCompiler.compile(body.data));
    } catch (e) {
        console.log(e);
    }
    res.writeHead(200).end();
});
server.listen(9753)