export interface Historico {
    operador: string;
    nomeProduto: string ;
    estoque: string;
    estoqueDestino?: string;
    quantidade: number;
    empresaId: number;
    operacao: string;
    dataHora: number;
}