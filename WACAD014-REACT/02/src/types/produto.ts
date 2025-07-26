export interface Foto {
    titulo: string;
    src: string;
  }
  
export interface Produto {
    id: string;
    nome: string;
    preco: string;  
    descricao: string;
    fotos: Foto[];
    vendido: string;  
    usuario_id: string;
  }