import Joi from "joi";

export const changeLanguageSchema = Joi.object().keys({
    lang: Joi.string().valid("pt-BR", "en-US").required(),
});
