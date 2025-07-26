import axios from "axios";
import { Produto } from "@/types/produto";

export const fetchProdutos = async (): Promise<Produto[]> => {
    const { data } = await axios.get<Produto[]>("https://ranekapi.origamid.dev/json/api/produto");
    return data;
  };
  
