export interface Produto {
    id?: number;
    nome: string;
    descricao: string;
    preco: number;
    unidade: string;
    empresaId: number;
    quantidade?: number;
}

export interface ProdutoEstoque {
    produtoId: number;
    nomeProduto: string;
    empresaId: number;
    quantidade: number;
    localizacao: string;
    nomeEstoque: string;
}