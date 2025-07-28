import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import ItemFavorito from "../ItemFavorito";
import { calculaValorComPorcentagemDeDesconto } from "../../../helpers";

jest.mock("../../../helpers", () => ({
  calculaValorComPorcentagemDeDesconto: jest.fn(),
}));

describe("ItemFavorito", () => {
  const mockProduto = {
    id: "notebook-3",
    fotos: [
      {
        titulo: "notebook-4",
        src: "https://ranekapi.origamid.dev/wp-content/uploads/2019/03/notebook-2.jpg",
      },
      {
        titulo: "smartwatch-3",
        src: "https://ranekapi.origamid.dev/wp-content/uploads/2019/03/smartwatch-2.jpg",
      },
    ],
    nome: "Notebook",
    preco: "2300",
    desconto: 15,
    descricao: "descrição legal",
    vendido: "false",
    usuario_id: "lobo@origamid.com",
  };

  const setFavoritosMock = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
    (calculaValorComPorcentagemDeDesconto as jest.Mock).mockReturnValue(80); // Mock do cálculo
  });

  it("deve renderizar corretamente as informações do item favorito", () => {
    render(
      <table>
        <tbody>
          <ItemFavorito itemFavorito={mockProduto} setFavoritos={setFavoritosMock} />
        </tbody>
      </table>
    );

    expect(screen.getByText("Notebook")).toBeInTheDocument(); // Verifica o nome do produto
    expect(screen.getByText("descrição legal")).toBeInTheDocument(); // Verifica a descrição
    expect(screen.getByText("R$ 80.00")).toBeInTheDocument(); // Verifica o valor com desconto
    expect(screen.getByText("15%")).toBeInTheDocument(); // Verifica o percentual de desconto
    expect(screen.getByAltText("notebook-4")).toBeInTheDocument(); // Verifica a imagem do produto
  });

  it("deve chamar a função de remoção ao clicar no botão 'Remover'", async () => {
    render(
      <table>
        <tbody>
          <ItemFavorito itemFavorito={mockProduto} setFavoritos={setFavoritosMock} />
        </tbody>
      </table>
    );

    const botaoRemover = screen.getByRole("button", { name: /Remover/i });
    await userEvent.click(botaoRemover);

    expect(setFavoritosMock).toHaveBeenCalledTimes(1);
    expect(setFavoritosMock).toHaveBeenCalledWith(expect.any(Function));
  });

  it("deve atualizar o valor corretamente com base no cálculo do desconto", () => {
    (calculaValorComPorcentagemDeDesconto as jest.Mock).mockReturnValue(75); 

    render(
      <table>
        <tbody>
          <ItemFavorito itemFavorito={mockProduto} setFavoritos={setFavoritosMock} />
        </tbody>
      </table>
    );

    expect(screen.getByText("R$ 75.00")).toBeInTheDocument(); 
  });
});
