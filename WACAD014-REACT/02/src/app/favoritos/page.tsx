"use client";

import { useQuery, useMutation, useQueryClient } from "react-query";
import axios from "axios";
import { Produto } from "@/types/produto";
import { toast } from "react-toastify";
import CardProduto from "../components/CardProduto"; 

const fetchFavoritos = async () => {
  const response = await axios.get("https://bronzed-fearless-thimbleberry.glitch.me/favoritos");
  return response.data;
};

const excluirFavorito = async (id: string) => {
  const response = await axios.delete(`https://bronzed-fearless-thimbleberry.glitch.me/favoritos/${id}`);
  return response.data;
};

export default function Favoritos() {
    const queryClient = useQueryClient();
    const { data, isLoading, isError, error } = useQuery<Produto[], Error>("favoritos", fetchFavoritos);
    const mutation = useMutation(excluirFavorito, {
      onSuccess: () => {
        queryClient.invalidateQueries("favoritos");
        toast.success("Produto excluído com sucesso!");
      },
      onError: () => {
        toast.error("Erro ao excluir produto!");
      },
    });
  
    if (isLoading) {
      return <div>Carregando...</div>;
    }
  
    if (isError) {
      return <div>Erro: {error?.message}</div>;
    }
  
    return (
      <main className="container p-5">
        <h2>Produtos Favoritos</h2>
        <div className="row">
          {data?.map(produto => (
            <CardProduto 
              key={produto.id} 
              produto={produto} 
              adicionarAoCarrinho={() => {}}  
              onExcluir={() => mutation.mutate(produto.id)} 
            />
          ))}
        </div>
      </main>
    );
  }