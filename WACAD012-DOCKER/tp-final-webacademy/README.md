# Aplicação de Biblioteca de Livros - Web Academy

Este repositório contém a configuração Docker para a aplicação de listagem de livros do Web Academy. A aplicação é composta por um backend (Node.js com TypeScript), um frontend (React com Vite), um banco de dados MySQL e uma interface de gerenciamento (PHPMyAdmin).

## Instruções para Executar

1. Clone o repositório e navegue até a pasta do projeto.
2. Execute `docker-compose up -d` para iniciar todos os contêineres.
3. Acesse:

   - **Frontend**: [http://localhost:3000](http://localhost:3000)
   - **Backend API**: [http://localhost:4444](http://localhost:4444)
   - **PHPMyAdmin**: [http://localhost:8080](http://localhost:8080)

4. Para parar os contêineres, execute `docker-compose down`.

## Notas Importantes

- O banco de dados e os logs do backend são persistidos em volumes.
- As variáveis de ambiente para conexão ao banco estão configuradas no arquivo `.env` no backend.
