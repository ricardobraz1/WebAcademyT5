import React from "react";
import { Produto } from "../../types/produto";
import Image from "next/image";
import { useAddFavorito } from "../hooks/useAddFavorito";

interface CardProdutoProps {
  produto: Produto;
  adicionarAoCarrinho: (produto: Produto) => void;
  onExcluir: () => void;  
}


export default function CardProduto({ produto, adicionarAoCarrinho }: CardProdutoProps) {
  const { addFavorito, isPending } = useAddFavorito();
  const precoFormatado = parseFloat(produto.preco);

  return (
    <div className="col">
      <div className="card shadow-sm h-100">
        <Image
          src={produto.fotos[0]?.src || "/placeholder.png"}
          alt={produto.nome}
          className="card-img-top"
          width={500}
          height={320}
        />
        <div className="card-body bg-light">
          <h5 className="card-title">{produto.nome}</h5>
          <p className="card-text text-secondary">R${precoFormatado.toFixed(2)}</p>
          <div className="d-flex gap-2">
            <button
              className="btn btn-primary"
              onClick={() => adicionarAoCarrinho(produto)}
            >
              Adicionar ao Carrinho
            </button>
            <button
              className="btn btn-light"
              onClick={() => addFavorito(produto)} 
              disabled={isPending}
            >
              {isPending ? "Favoritando..." : "Favoritar"}
            </button>
            
          </div>
        </div>
      </div>
    </div>
  );
}
