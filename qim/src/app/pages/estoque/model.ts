export interface Estoque {
    id?: number;
    nome: string;
    descricao: string;
    quantidade?: number;
    empresaId: number;
}

export interface EstoqueProduto {
    estoqueId: number;
    nomeProduto: string;
    empresaId: number;
    quantidade: number;
    localizacao: string;
    nomeEstoque: string;
}