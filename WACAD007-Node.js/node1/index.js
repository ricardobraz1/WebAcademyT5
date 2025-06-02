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


const http = require("http");
const { allowedNodeEnvironmentFlags } = require("process");

const arquivos = ['commonJs.txt', 'esModules.txt', 'libuv.txt', 'nodejs.txt', 'nodemon.txt'];

const server = http.createServer((req, res) => {
    res.writeHead(200, { "Content-Type": "text/html; charset=utf-8" });
    arquivos.forEach(arquivo => {
        res.write(`${arquivo}<br>`);
    });
    res.end();
});

server.listen(5555, () => {
    console.log("Servidor rodando na porta 5555");
});
