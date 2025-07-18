import { Request, Response, NextFunction } from "express";

export const checkAuth = (req: Request, res: Response, next: NextFunction) => {
    if (req.session && req.session.uid) {
        next();
    } else {
        res.status(403).send("Acesso negado. É necessário estar autenticado.");
    }
};


