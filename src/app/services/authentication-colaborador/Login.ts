export class Login {
    constructor(
        public codigo: string = '',
        public login: string = '',
        public senha: string = '',
        public deviceModelo: string = '',
        public deviceFabricante: string = '',
        public tokenFCM: string = '',
        public biometric: boolean = false,
        public versaoApp: string = '',
        public bundleId?: string,
        public appPersonalizado?: string,

    ) {
    }
}