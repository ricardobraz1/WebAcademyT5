import express from 'express';
import dotenv from 'dotenv';
import logger from './middlewares/logger'
import validateEnv from './utils/validateEnv';
import router from './router/router';
import { engine } from 'express-handlebars';

dotenv.config();
validateEnv();

const PORT = process.env.PORT ?? 4455;
const app = express();

app.engine("handlebars", engine({ helpers: require(`${__dirname}/views/helpers/helpers.ts`) }));
app.set("view engine", "handlebars");

//__dirname é uma variavel que refere ao diretorio do documento que eu estou escrevendo. no caso é o index.js, ou seha, nao é necessario faer process.cwd()/src/views
app.set("views", `${__dirname}/views`);

app.use(logger('simple'));

app.use("/css", express.static(`${process.cwd()}/public/css`))
app.use("/js", express.static(`${process.cwd()}/public/js`))
app.use("/img", express.static(`${process.cwd()}/public/img`))
app.use(express.urlencoded({ extended: false }))

app.use(router)

app.listen(PORT, () => {
  console.log(`Express app iniciada na porta ${PORT}.`);
});
