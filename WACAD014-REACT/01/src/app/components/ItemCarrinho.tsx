import React from "react";
import { ItemCarrinho as ItemCarrinhoType } from "../../types/itemCarrinho";

interface ItemCarrinhoProps {
  item: ItemCarrinhoType;
  removerDoCarrinho: (produtoId: string) => void;
}

export default function ItemCarrinho({ item, removerDoCarrinho }: ItemCarrinhoProps) {
  return (
    <div className="card mb-3">
      <div className="card-body d-flex justify-content-between align-items-center">
        <h5 className="card-title">{item.nome}</h5>
        <p className="card-text text-secondary">R$ {item.preco}</p>
        <p className="card-text text-secondary">Quantidade: {item.quantidade}</p>
        <button
          className="btn btn-danger"
          onClick={() => removerDoCarrinho(item.id)} // Chama a função para remover
        >
          Remover
        </button>
      </div>
    </div>
  );
}
