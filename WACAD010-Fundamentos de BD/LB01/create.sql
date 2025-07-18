CREATE TABLE cliente (
    id_cliente INT AUTO_INCREMENT PRIMARY KEY,
    nome_completo VARCHAR(255),
    cpf VARCHAR(11) UNIQUE,
    celular VARCHAR(20),
    email VARCHAR(255),
    data_nascimento DATE
);

CREATE TABLE endereco (
    id_endereco INT AUTO_INCREMENT PRIMARY KEY,
    id_cliente INT,
    logradouro VARCHAR(255),
    cidade VARCHAR(100),
    estado VARCHAR(50),
    cep VARCHAR(20),
    FOREIGN KEY (id_cliente) REFERENCES cliente(id_cliente)
);

CREATE TABLE categoria (
    id_categoria INT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(100)
);

CREATE TABLE subcategoria (
    id_subcategoria INT AUTO_INCREMENT PRIMARY KEY,
    id_categoria INT,
    nome VARCHAR(100),
    FOREIGN KEY (id_categoria) REFERENCES categoria(id_categoria)
);

CREATE TABLE produto (
    id_produto INT AUTO_INCREMENT PRIMARY KEY,
    id_subcategoria INT,
    modelo VARCHAR(255),
    fabricante VARCHAR(255),
    preco_base DECIMAL(10, 2),
    quantidade_disponivel INT,
    FOREIGN KEY (id_subcategoria) REFERENCES subcategoria(id_subcategoria)
);

CREATE TABLE numero_serie (
    id_numero_serie INT AUTO_INCREMENT PRIMARY KEY,
    id_produto INT,
    numero_serie VARCHAR(255),
    FOREIGN KEY (id_produto) REFERENCES produto(id_produto)
);

CREATE TABLE forma_pagamento (
    id_forma_pagamento INT AUTO_INCREMENT PRIMARY KEY,
    metodo VARCHAR(50)
);

CREATE TABLE compra (
    id_compra INT AUTO_INCREMENT PRIMARY KEY,
    id_cliente INT,
    data_hora DATETIME,
    desconto DECIMAL(5, 2),
    total DECIMAL(10, 2),
    id_endereco INT,
    id_forma_pagamento INT,
    FOREIGN KEY (id_cliente) REFERENCES cliente(id_cliente),
    FOREIGN KEY (id_endereco) REFERENCES endereco(id_endereco),
    FOREIGN KEY (id_forma_pagamento) REFERENCES forma_pagamento(id_forma_pagamento)
);

-- Tabela associativa para relação N:M entre Compra e Produto
CREATE TABLE compra_produto (
    id_compra INT,
    id_produto INT,
    quantidade INT,
    PRIMARY KEY (id_compra, id_produto),
    FOREIGN KEY (id_compra) REFERENCES compra(id_compra),
    FOREIGN KEY (id_produto) REFERENCES produto(id_produto)
);
