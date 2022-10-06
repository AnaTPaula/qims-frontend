export interface Operacao {
    tipoOperacao: string;
    empresaId: number;
    produtoId: number;
    estoqueId: number;
    loteId?: number;
    quantidade?: number;
    codigoLote?: string;
    dataEntrada: Date;
    dataValidade?: Date;
    localizacao?: number;
}