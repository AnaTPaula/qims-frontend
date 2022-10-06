export interface Lote {
    id?: number;
    empresaId: number;
    codigoLote: string;
    dataEntrada: number;
    dataValidade?: number;
    quantidade: number;
}