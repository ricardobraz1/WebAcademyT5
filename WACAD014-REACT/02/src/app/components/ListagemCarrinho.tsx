"use client";

import React from "react";
import { ItemCarrinho as ItemCarrinhoType } from "../../types/itemCarrinho";
import ItemCarrinho from "./ItemCarrinho";

interface ListagemCarrinhoProps {
  itens: ItemCarrinhoType[];
  removerDoCarrinho: (produtoId: string) => void;
}

export default function ListagemCarrinho({ itens, removerDoCarrinho }: ListagemCarrinhoProps) {
  return (
    <div>
      {itens.map(item => (
        <ItemCarrinho
          key={item.id}
          item={item}
          removerDoCarrinho={removerDoCarrinho} 
        />
      ))}
    </div>
  );
}
