export interface Historico {
    historicoId: number;
    operador: string;
    nomeProduto: string ;
    estoque: string;
    estoqueDestino?: string;
    quantidade: number;
    empresaId: number;
    operacao: string;
    dataHora: number;
}


export interface Estorno {
    tipoOperacao: string;
    historicoId: number;
    empresaId: number;
}