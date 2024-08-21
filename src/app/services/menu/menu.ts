import { SafeResourceUrl } from '@angular/platform-browser';

export class ItemMenuDAO {

    constructor(
        public id: number = 0,
        public parentId: number = 0,
        public titulo: string = "",
        public tipo: string = "",
        public desenv:number=1,
        public url: string = "",
        public isPage: number = 0,
        public ico_app: SafeResourceUrl = "",
        public ico_app_fav: SafeResourceUrl = "",
        public subOpcoes: any[],
        public favorito:number=0
    ) { }

}

