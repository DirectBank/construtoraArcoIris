
export class UsuarioDAO {
    constructor(

        public senha: number = 0,
        // public id_usuario: number = 0,
        public id_cliente: number = 0,
        public id_empresa: number = 0,
        public id_contrato: number = 0,
        public id_empreendimento: number = 0,
        public id_imovel: number = 0,
        // public codigo: string = "",
        // public nomeEmpresa: string = "",
        public nomeEmpreendimento: string = "",
        public nomeCliente: string = "",
        // public nome: string = "",
        // public status_cliente: number = 0,
        // public status_sistema: number = 0,
        // public tipo: 'P' | 'M',
        // public mensagem: number = 0,
        // public administrador: number = 0,
        // public token: string = "",
        // public unidade: string = "",
        // public unidadez: 0 | 1,
        // public condominioNome: string = "",
        // public login: string = "",
        // public dataCiencia: string = '',
        // public termo: string = '',
        // public titulo1: string = '',
        // public titulo2: string = '',
        public id_lgpd: number = 0,
        // public url_home: string = "",
        public doc: string = "",
        public email: string = "",
        public telefone: string = "",
        public aceiteLGPD: number = 0,
        public alterarSenha: number = 0,
        public bairro: string = "",
        public cidade: string = "",
        public complemento: string = "",
        public endereco: string = "",
        public numero: string = "",
        public readonly: boolean = false,
        public previsaoDataInicio: string = "",
        public previsaoDataTermino: string = "",
        public evolucao: number = 0,
        public tipoPlanta: number = 0,
        public urlEmpreendimento: string = "",
        
    ) { }

}