'use client'
import { useQuery, useMutation } from '@tanstack/react-query'
import { favoritosApi } from '../services/api'
import { toast } from 'react-toastify'

export default function Favoritos() {
  const { data, isLoading, error, refetch } = useQuery({
    queryKey: ['favoritos'],
    queryFn: () => favoritosApi.get('/favoritos').then(res => res.data)
  })

  const { mutate } = useMutation({
    mutationFn: (id: number) => favoritosApi.delete(`/favoritos/${id}`),
    onSuccess: () => {
      toast.success('Removido com sucesso')
      refetch()
    },
    onError: () => toast.error('Erro ao remover')
  })

  if (isLoading) return <p>Carregando favoritos...</p>
  if (error) return <p>Erro ao carregar favoritos</p>

  return (
    <main className="container">
      <h2>Meus Favoritos</h2>
      <div className="row">
        {data.map((item: any) => (
          <div className="col-md-4" key={item.id}>
            <div className="card m-2">
              <img src={item.fotos?.[0]} className="card-img-top" />
              <div className="card-body">
                <h5>{item.nome}</h5>
                <p>{item.descricao}</p>
                <button onClick={() => mutate(item.id)} className="btn btn-danger">Remover</button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </main>
  )
}