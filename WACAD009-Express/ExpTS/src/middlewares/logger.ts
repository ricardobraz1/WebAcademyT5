import { Request, Response, NextFunction } from "express";
import fs from 'fs/promises';
type LoggerType = 'complete' | 'simple';
const LOGS_PATH = process.env.LOGS_PATH ?? 'logs'

function logger(type: LoggerType){
    if(type === 'simple'){
        return async (req: Request, res:Response, next: NextFunction) =>{
            await fs.writeFile(`${process.cwd()}/${LOGS_PATH}/logs.log`, `${new Date().toISOString()} ${req.url} ${req.method}\n`, {flag: 'a'})
            next()
        }
    }else{
        return async (req: Request, res:Response, next: NextFunction) =>{
            await fs.writeFile(`${process.cwd()}/${LOGS_PATH}/logs.log`, `${new Date().toISOString()} ${req.url} ${req.method} ${req.httpVersion} ${req.get('User-Agent')}\n`, {flag: 'a'})
            next()
        }
    }
}

export default logger