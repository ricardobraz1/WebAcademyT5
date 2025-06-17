import { Request, Response, NextFunction } from 'express';
import * as fs from 'fs';
import * as path from 'path';
import 'dotenv/config';

type LogFormat = 'simples' | 'completo';

export function logMiddleware(format: LogFormat) {
  return (req: Request, res: Response, next: NextFunction): void => {

    const timeStamp = new Date().toISOString();
    const logFolder = process.env.LOG_FOLDER || './logs';

    if (!fs.existsSync(logFolder)) {
      fs.mkdirSync(logFolder);
    }
    let logMessage: string = '';
    if (format === 'simples') {
      logMessage = `${timeStamp} - ${req.url} - ${req.method}\n`;
    } else if (format === 'completo') {
      logMessage = `${timeStamp} - ${req.url} - ${req.method} - ${req.httpVersion} - ${req.get('User-Agent')}\n`;
    }

    const logFilePath = path.join(logFolder, 'access.log');

    fs.appendFile(logFilePath, logMessage, (err) => {
      if (err) {
        console.error('Erro ao escrever o log:', err);
      }
    });

    next();
  };
}
