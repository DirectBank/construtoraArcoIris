export class PrestadorServico {

    constructor(
        public id_prestador: number = 0,
        public nome: string = "",
        public servico: string = "",
        public fone: string = "",
        public site: string = "",
        public endereco: string = "",
        public numero: string = "",
        public complemento: string = "",
        public bairro: string = "",
        public cidade: string = "",
        public uf: string = ""
    ) { }

}