CREATE DATABASE IF NOT EXISTS webacademy;
USE webacademy;

CREATE TABLE IF NOT EXISTS webacademy_alunos (
  id BIGINT PRIMARY KEY AUTO_INCREMENT,
  nome VARCHAR(180) NOT NULL
);

INSERT INTO webacademy_alunos (nome) VALUES
('João da Silva'),
('Maria Oliveira'),
('Pedro Santos');
