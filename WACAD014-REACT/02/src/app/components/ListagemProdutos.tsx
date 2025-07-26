"use client";

import React from "react";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import CardProduto from "./CardProduto";
import { Produto } from "../../types/produto";

interface ListagemProdutosProps {
  produtos: Produto[];
  adicionarAoCarrinho: (produto: Produto) => void;
}

// Função para buscar produtos
const fetchProdutos = async (): Promise<Produto[]> => {
  const { data } = await axios.get<Produto[]>("https://ranekapi.origamid.dev/json/api/produto");
  return data;
};

export default function ListagemProdutos({ adicionarAoCarrinho }: ListagemProdutosProps) {
  const { data: produtos, isLoading, isError } = useQuery<Produto[], Error>({
    queryKey: ["produtos"], 
    queryFn: fetchProdutos,
  });

  if (isLoading) return <p>Carregando produtos...</p>;
  if (isError) return <p>Erro ao carregar produtos.</p>;

  return (
    <div className="row row-cols-1 row-cols-md-2 row-cols-lg-4 g-3">
      {produtos?.map((produto: Produto) => (
        <CardProduto
          key={produto.id}
          produto={produto}
          adicionarAoCarrinho={adicionarAoCarrinho}
          onExcluir={() => {}} 
        />
      ))}
    </div>
  );
}