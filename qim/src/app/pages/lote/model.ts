export interface Lote {
    id?: number;
    empresaId: number;
    codigoLote: string;
    dataEntrada: number;
    dataValidade?: number;
    quantidade: number;
    associado?: boolean;
    produtoNome?: string;
}