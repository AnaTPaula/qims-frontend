export interface Lote {
    id?: number;
    empresaId: number;
    codigoLote: string;
    dataEntrada: Date;
    dataValidade?: Date;
    quantidade: number;
}