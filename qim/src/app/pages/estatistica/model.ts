export interface Historico {
    operador: string;
    origem: string;
    destino: string;
    quantidade: number;
    timestamp: number;
    operacao: string;
    produto: string;
}

export interface EstoqueMaximo {
    produto: string;
    quantidade: number;
    maximo: number;
}

export interface EstoqueMinimo {
    produto: string;
    quantidade: number;
    minimo: number;
}

export interface PontoReposicao {
    produto: string;
    quantidade: number;
    reposicao: number;
}

export interface OperacaoProduto {
    nome: string;
    quantidade: number
}

export interface Estatistica {
    totalProdutos: number;
    totalEstoque: number;
    totalPreco: number;
    historico: Historico[];
    estoqueMaximo: EstoqueMaximo[];
    estoqueMinimo: EstoqueMinimo[];
    pontoReposicao: PontoReposicao[];
    entradaProduto: OperacaoProduto[];
    saidaProduto: OperacaoProduto[];
}