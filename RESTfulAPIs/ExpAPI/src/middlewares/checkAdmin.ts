import { Request, Response, NextFunction } from "express";

const checkAdmin = (req: Request & { session?: { uid?: string; tipoUsuario?: string } }, res: Response, next: NextFunction) => {
    if (req.session && req.session.uid && req.session.tipoUsuario === "admin") {
        next();
    } else {
        res.status(403).send("Acesso restrito a administradores.");
    }
};


export default checkAdmin;
