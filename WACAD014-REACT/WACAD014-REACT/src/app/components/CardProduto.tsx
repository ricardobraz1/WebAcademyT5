'use client'
import { useMutation } from '@tanstack/react-query'
import { favoritosApi } from '../services/api'
import { toast } from 'react-toastify'

export default function CardProduto({ produto }: { produto: any }) {
  const { mutate } = useMutation({
    mutationFn: (produto: any) => favoritosApi.post('/favoritos', produto),
    onSuccess: () => toast.success('Produto salvo nos favoritos!'),
    onError: () => toast.error('Erro ao salvar favorito!')
  })

  return (
    <div className="card m-2" style={{ width: '18rem' }}>
      <img src={produto.fotos?.[0]} className="card-img-top" alt={produto.nome} />
      <div className="card-body">
        <h5 className="card-title">{produto.nome}</h5>
        <p className="card-text">{produto.descricao}</p>
        <button onClick={() => mutate(produto)} className="btn btn-outline-primary">Favoritar</button>
      </div>
    </div>
  )
}