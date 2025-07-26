"use client"

import { createContext, ReactNode, useContext, useState, useEffect} from "react";

interface FavoritosProviderProps{
    children: ReactNode
}

interface IFavoritosContext {
    favoritos: Produto[];
    setFavoritos: React.Dispatch<React.SetStateAction<Produto[]>>;
}

export const FavoritosContext = createContext<IFavoritosContext>({
    favoritos: [],
    setFavoritos: () => {},
})

export const FavoritosProvider = ({children} : FavoritosProviderProps) => {
    const [favoritos, setFavoritos] = useState<Produto[] | []>([]);
    useCarregarFavoritosDoLocalStorage()

    const value = {favoritos, setFavoritos}

    return (
    <FavoritosContext.Provider value={value}>
        {children}
    </FavoritosContext.Provider>
    )

}

//Hook personalizado para favoritos
export const useFavoritosContext =() => {
    const favoritosContext = useContext(FavoritosContext);
    return favoritosContext
}

// Hook para verificar se um produto está favoritado
export const useProdutoFavorito = (id: string): boolean => {
    const { favoritos } = useFavoritosContext();
    useCarregarFavoritosDoLocalStorage()
    return favoritos.some((produto) => produto.id === id);
};

// Hook para adicionar um produto aos favoritos
export const useAdicionarFavorito = () => {
    const { favoritos, setFavoritos } = useFavoritosContext();
    return (produto: Produto) => {
        if (!favoritos.some((item) => item.id === produto.id)) {
            const novosFavoritos = [...favoritos, produto];
            setFavoritos(novosFavoritos);
            localStorage.setItem("favoritos", JSON.stringify(novosFavoritos));
        }
    };
};

// Hook para remover um produto dos favoritos
export const useRemoverFavorito = () => {
    const { favoritos, setFavoritos } = useFavoritosContext();
    return (id: string) => {
        const novosFavoritos = favoritos.filter((produto) => produto.id !== id);
        setFavoritos(novosFavoritos);
        localStorage.setItem("favoritos", JSON.stringify(novosFavoritos));
    };
};

// Hook para calcular o valor total dos produtos favoritados
export const useCalcularValorTotalFavoritos = () => {
    const { favoritos } = useFavoritosContext();
    useCarregarFavoritosDoLocalStorage()
    return favoritos.reduce((total, produto) => total + Number(produto.preco), 0);
};

// Hook para carregar os favoritos do localStorage
export const useCarregarFavoritosDoLocalStorage = () => {
    const { setFavoritos } = useFavoritosContext();
    useEffect(() => {
        const favoritosSalvos = localStorage.getItem("favoritos");
        if (favoritosSalvos) {
            setFavoritos(JSON.parse(favoritosSalvos));
        }
    }, [setFavoritos]);
};