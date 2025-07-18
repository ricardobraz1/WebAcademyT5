import { Request, Response } from "express";
import { StatusCodes, ReasonPhrases } from "http-status-codes";
import { ChangeLanguageDto } from "./types";

export const changeLanguage = (req: Request, res: Response) => {
    const { lang } = req.body as ChangeLanguageDto;
    res.cookie("lang", lang);
    res.status(StatusCodes.ACCEPTED).send(ReasonPhrases.ACCEPTED);
};
