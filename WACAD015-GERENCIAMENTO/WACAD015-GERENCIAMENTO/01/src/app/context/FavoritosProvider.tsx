"use client"

import { createContext, ReactNode, useState } from "react";

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
    const [favoritos, setFavoritos] = useState<Produto[]>([]);

    const value = {favoritos, setFavoritos}

    return (
    <FavoritosContext.Provider value={value}>
        {children}
    </FavoritosContext.Provider>
    )

}