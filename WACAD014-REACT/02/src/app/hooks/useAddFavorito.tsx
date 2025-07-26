import { useMutation } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { addProdutoFavorito } from "../services/addProdutoFavorito";

export function useAddFavorito() {
  const { mutate, isPending } = useMutation({
    mutationFn: addProdutoFavorito,
    onSuccess: () => toast.success("Produto favoritado com sucesso!"),
    onError: () => toast.error("Algo deu errado!"),
  });

  return {
    addFavorito: mutate,
    isPending,
  };
}
