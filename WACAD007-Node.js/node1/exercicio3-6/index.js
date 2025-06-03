const http = require('http');
const fs = require('fs');
const path = require('path');
const dotenv = require('dotenv');
const { createLink } = require('./util');


dotenv.config({ path: `.env.${process.env.NODE_ENV}` });

const PORT = process.env.PORT ?? 3333;

process.argv.forEach((val, index) => {
  console.log(`${index}: ${val}`);
});

const dir = process.argv[2];

if (!dir) {
  console.error("Erro: você precisa passar o nome de um diretório como argumento.");
  process.exit(1);
}

const server = http.createServer((req, res) => {
  const url = decodeURIComponent(req.url);

  if (url === '/' || url === '') {
    fs.readdir(dir, (err, files) => {
      if (err) {
        res.writeHead(500, { 'Content-Type': 'text/plain' });
        res.end('Erro ao ler o diretório.');
        return;
      }

      res.writeHead(200, { "Content-Type": "text/html; charset=utf-8" });
      files.forEach(file => {
        res.write(createLink(file)); 
      });
      res.end();
    });
  } else {

    const filePath = path.join(dir, url);
    
    fs.readFile(filePath, 'utf-8', (err, content) => {
      if (err) {
        res.writeHead(404, { 'Content-Type': 'text/plain' });
        res.end('Arquivo não encontrado.');
        return;
      }

      res.writeHead(200, { "Content-Type": "text/html; charset=utf-8" });
      res.write(`<a href="/">Voltar</a><br><br>`);
      res.write(`<pre>${content}</pre>`);
      res.end();
    });
  }
});

server.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});