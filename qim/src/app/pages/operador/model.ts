export interface Operador {
    id?: number;
    nomeUsuario: string;
    senha?: string;
    dataCadastro: number;
    tipoAcesso: string;
    empresaId: number;
}