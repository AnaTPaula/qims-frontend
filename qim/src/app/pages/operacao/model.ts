export interface Operacao {
    tipoOperacao: string;
    empresaId: number;
    produtoId: any;
    estoqueId: any;
    loteId?: number;
    quantidade?: number;
    codigoLote?: string;
    dataEntrada: Date;
    dataValidade?: Date;
    localizacao?: number;
}