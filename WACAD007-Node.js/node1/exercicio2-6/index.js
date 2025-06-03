/*const http = require("http");

const server = http.createServer((req, res) => {
    res.writeHead(200, { "Content-Type": "text/html;charset=utf-8"}); // cabeçalho da resp
    res.write("Web Academy"); // conteudo da resp
    res.end(); // finaliza

}) // cria um servidor web , recebe c parametros funcao req(requisicao usuario),res(resp a usuario)



server.listen(5555, () => {
    console.log("Servidor rodando na porta 5555")
}) 
*/ 

/*const fs = require("fs")

fs.rename("arquivo2.txt", "arquivo1.txt", (err) => {
    console.log("Tentativa de renomeaçao feita.")
    if(err) console.log(err);
}) // esse callback so vai ser executado depois de a renomecao ter sido concluida , ai a linha 18 vai ser executada
//mas a linha 25 e executada primeiro.

console.log("oiiiiiii"); */



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
