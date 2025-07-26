'use client'
import { useParams } from 'next/navigation'
import { useQuery } from '@tanstack/react-query'
import { produtosApi } from '../../services/api'

export default function DetalhesProduto() {
  const { produto } = useParams()
  const { data, isLoading, error } = useQuery({
    queryKey: ['produto', produto],
    queryFn: () => produtosApi.get(`/produto/${produto}`).then(res => res.data)
  })

  if (isLoading) return <p>Carregando produto...</p>
  if (error || !data) return <p>Produto não encontrado.</p>

  return (
    <main className="container mt-4">
      <h2>{data.nome}</h2>
      <img src={data.fotos?.[0]} className="img-fluid" />
      <p>{data.descricao}</p>
      <p><strong>Preço:</strong> R$ {data.preco}</p>
    </main>
  )
}