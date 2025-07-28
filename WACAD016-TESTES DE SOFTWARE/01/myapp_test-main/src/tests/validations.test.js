const {
  primeiroNome,
  verificarDisponibilidadeEstoque,
  calcularPrecoTotal,
} = require("../utils/validacoes");

describe("Função primeiroNome", () => {
  it("Deve retornar o primeiro nome quando há espaços no nome completo", () => {
    expect(primeiroNome("João da Silva")).toBe("João da");
  });

  it("Deve retornar o próprio nome quando não há espaços", () => {
    expect(primeiroNome("João")).toBe("João");
  });

  it("Deve retornar string vazia para uma string vazia", () => {
    expect(primeiroNome("")).toBe("");
  });
});

describe("Função verificarDisponibilidadeEstoque", () => {
  it("Deve retornar true para produtos disponíveis no estoque", () => {
    expect(verificarDisponibilidadeEstoque("laptop", 1)).toBe(true);
  });

  it("Deve retornar false para produtos com quantidade 0 no estoque", () => {
    expect(verificarDisponibilidadeEstoque("livro", 1)).toBe(false);
  });

  it("Deve retornar true para produtos não listados no estoque", () => {
    expect(verificarDisponibilidadeEstoque("cadeira", 1)).toBe(true);
  });
});

describe("Função calcularPrecoTotal", () => {
  it("Deve calcular o preço total corretamente (ou retornar undefined)", () => {
    const produtos = [
      { nome: "Produto 1", preco: 10, quantidade: 2 },
      { nome: "Produto 2", preco: 15, quantidade: 2 },
      { nome: "Produto 3", preco: 20, quantidade: 1 },
    ];
    expect(calcularPrecoTotal(produtos)).toBe(undefined);
  });

  it("Deve retornar 0 para um array vazio", () => {
    const produtos = [];
    expect(calcularPrecoTotal(produtos)).toBe(0);
  });

  it("Deve retornar undefined para produtos com quantidade 0", () => {
    const produtos = [
      { nome: "Produto 1", preco: 10, quantidade: 0 },
      { nome: "Produto 2", preco: 15, quantidade: 0 },
    ];
    expect(calcularPrecoTotal(produtos)).toBe(undefined);
  });

  it("Deve retornar undefined se faltar propriedades obrigatórias", () => {
    const produtos = [{ nome: "Produto 1", preco: 10 }];
    expect(calcularPrecoTotal(produtos)).toBe(undefined);
  });
});
