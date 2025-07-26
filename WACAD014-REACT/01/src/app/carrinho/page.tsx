"use client";

import React, { useState } from "react";
import ListagemCarrinho from "../components/ListagemCarrinho";
import ResumoCarrinho from "../components/ResumoCarrinho";
import { itensCarrinhoMock } from "../../mocks/itensCarrino";

export default function Carrinho() {
  // Estado para armazenar os itens no carrinho
  const [itensCarrinho, setItensCarrinho] = useState(itensCarrinhoMock); // Usando o mock como valor inicial

  // Função para remover um item do carrinho
  const removerDoCarrinho = (produtoId: string) => {
    setItensCarrinho((itensAnteriores) =>
      itensAnteriores.filter(item => item.id !== produtoId)
    );
  };

  // Calcular a quantidade total e o valor total
  const quantidadeTotal = itensCarrinho.reduce((total, item) => total + item.quantidade, 0);
  const valorTotal = itensCarrinho.reduce((total, item) => total + item.preco * item.quantidade, 0);

  return (
    <main className="container p-5">
      <h5 className="mb-3">Seu Carrinho:</h5>
      <ResumoCarrinho quantidadeTotal={quantidadeTotal} valorTotal={valorTotal} />
      <ListagemCarrinho itens={itensCarrinho} removerDoCarrinho={removerDoCarrinho} />
    </main>
  );
}
