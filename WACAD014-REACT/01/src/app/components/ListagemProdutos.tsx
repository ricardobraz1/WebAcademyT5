"use client";

import React from "react";
import CardProduto from "./CardProduto";
import { Produto } from "../../types/produto";


interface ListagemProdutosProps {
  produtos: Produto[];
  adicionarAoCarrinho: (produto: Produto) => void; 
}

export default function ListagemProdutos({ produtos, adicionarAoCarrinho }: ListagemProdutosProps) {
  return (
    <div className="row row-cols-1 row-cols-md-2 row-cols-lg-4 g-3">
      {produtos.map((produto) => (
        <CardProduto 
          key={produto.id} 
          produto={produto} 
          adicionarAoCarrinho={adicionarAoCarrinho} 
        />
      ))}
    </div>
  );
}
