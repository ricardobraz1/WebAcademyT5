"use client";
import { useState } from "react";
import ListagemProdutos from "./components/ListagemProdutos";
import ResumoCarrinho from "./components/ResumoCarrinho";
import { produtosMock } from "../mocks/produtos"; 
import { Produto } from "../types/produto";  

export default function Home() {

  const [itensCarrinho, setItensCarrinho] = useState<{ produto: Produto; quantidade: number }[]>([]);

  const adicionarAoCarrinho = (produto: Produto) => {
    const itemExistente = itensCarrinho.find(item => item.produto.id === produto.id);
    
    if (itemExistente) {
      setItensCarrinho(itensCarrinho.map(item => 
        item.produto.id === produto.id
          ? { ...item, quantidade: item.quantidade + 1 }
          : item
      ));
    } else {
      setItensCarrinho([
        ...itensCarrinho,
        { produto, quantidade: 1 }
      ]);
    }
  };

  const quantidadeTotal = itensCarrinho.reduce((total, item) => total + item.quantidade, 0);
  const valorTotal = itensCarrinho.reduce((total, item) => total + parseFloat(item.produto.preco) * item.quantidade, 0);

  return (
    <main className="container p-5">
      <ResumoCarrinho quantidadeTotal={quantidadeTotal} valorTotal={valorTotal} />
      <h5 className="mb-3">Produtos disponíveis:</h5>
      <ListagemProdutos 
        produtos={produtosMock}
        adicionarAoCarrinho={adicionarAoCarrinho} 
      />
    </main>
  );
}
