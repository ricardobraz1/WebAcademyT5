import express from 'express';
import { engine } from 'express-handlebars';  // Certifique-se de usar essa função de engine
import path from 'path';
import produtoRoutes from '../src/routes/produtoRoutes';  // Suas rotas de produto

const app = express();
const PORT = 3333;

app.use('/css', express.static(path.join(__dirname, 'node_modules/bootstrap/dist/css')));
app.use('/js', express.static(path.join(__dirname, 'node_modules/bootstrap/dist/js')));

// Configuração do Handlebars
app.engine('handlebars', engine({
  layoutsDir: path.join(__dirname, 'views'),  // Diretório de layouts
  defaultLayout: 'main',  // Define 'main' como layout padrão
}));
app.set('view engine', 'handlebars');
app.set('views', path.join(__dirname, 'views'));

// Middleware para arquivos estáticos
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({ extended: true }));

// Usar as rotas dos produtos
app.use('/', produtoRoutes);

// Inicia o servidor
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
