import axios from "axios";
import { Produto } from "../../types/produto";

export async function addProdutoFavorito(produto: Produto) {
  await new Promise((resolve) => setTimeout(resolve, 1000));

  return axios
    .post<Produto>("https://bronzed-fearless-thimbleberry.glitch.me/favoritos", produto)
    .then((response) => response.data);
}
