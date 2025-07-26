import React from "react";
import { Produto } from "../../types/produto";
import Image from "next/image";

interface CardProdutoProps {
  produto: Produto;
  adicionarAoCarrinho: (produto: Produto) => void;
}

export default function CardProduto({ produto, adicionarAoCarrinho }: CardProdutoProps) {
  const precoFormatado = parseFloat(produto.preco);

  return (
    <div className="col">
      <div className="card">
      <Image
          src={produto.fotos[0]?.src} 
          alt={produto.nome}
          className="card-img-top"
          width={500} 
          height={300}
        />
        <div className="card-body">
          <h5 className="card-title">{produto.nome}</h5>
          <p className="card-text">Preço: R${precoFormatado.toFixed(2)}</p>
          <button 
            className="btn btn-primary"
            onClick={() => adicionarAoCarrinho(produto)} 
          >
            Adicionar ao Carrinho
          </button>
        </div>
      </div>
    </div>
  );
}
