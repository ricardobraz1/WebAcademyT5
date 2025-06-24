"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const validateEnv_1 = __importDefault(require("./utils/validateEnv"));
dotenv_1.default.config();
(0, validateEnv_1.default)();
const PORT = process.env.PORT ?? 4455;
const app = (0, express_1.default)();
app.use('/', (req, res) => {
    console.log("Executado por toda requisição");
});
app.get('/about', (req, res) => {
    res.send('Hello world');
});
app.listen(PORT, () => {
    console.log(`Express app iniciada na porta ${PORT}.`);
});
