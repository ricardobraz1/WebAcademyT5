import expressSession from 'express-session';
import {v4 as uuidv4} from "uuid"

export function session(){
    return expressSession({
        genid: () => uuidv4(),
        secret: process.env.SESSION_SECRET_KEY!,
        resave: true,
        saveUninitialized: true,
    })
}