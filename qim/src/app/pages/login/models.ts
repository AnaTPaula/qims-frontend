export interface Usuario {
    tipo: string;
    nomeUsuario: string;
    senha: string;
    id?: number;
    empresaId?: number;
    nomeEmpresa?: string;
    tipoAcesso?: string;
    tipoArmazenagem?: string;
    situacaoConta?: string;
}