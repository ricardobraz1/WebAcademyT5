import { calculaValorComPorcentagemDeDesconto } from "@/app/helpers";
import ItemFavorito from "../ItemFavorito/ItemFavorito";
import { useCalcularValorTotalFavoritos, useFavoritosContext } from "@/app/context/FavoritosProvider";


export default function ListagemFavoritos() {

const {favoritos, setFavoritos} = useFavoritosContext();
  console.log(favoritos)
  
  const valorTotalFavoritos = useCalcularValorTotalFavoritos()

  return (
    <div className="card mb-4">
      <div className="row card-body">
        <h5 className="card-title mb-4 fw-bold">Lista de favoritos:</h5>

        {favoritos.length > 0 ? (
          <div className="table-responsive">
            <table className="table table-borderless">
              <thead>
                <tr>
                  <th>Produto</th>
                  <th>Preço</th>
                  <th>Desconto</th>
                  <th>Opções</th>
                </tr>
              </thead>
              <tbody>
                {favoritos.map((item) => (
                  <ItemFavorito
                    key={item.id}
                    itemFavorito={item}
                    setFavoritos={setFavoritos}
                  />
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <p>Sua lista de favoritos está vazia.</p>
        )}
      </div>
      <div className="card-footer d-flex flex-column">
        <small className="text-muted">
          Quantidade de produtos: {favoritos.length}
        </small>

        <small className="text-muted">
          Valor total: R$ {valorTotalFavoritos}
        </small>
      </div>
    </div>
  );
}
