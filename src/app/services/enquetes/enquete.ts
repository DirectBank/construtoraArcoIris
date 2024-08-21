import { Alternativa } from './alternativa';

export class Enquete {
    id_enquete: number = 0;
    enquete: string = "";
    dataLimite: Date;
    dataResposta:Date;
    alternativas: Alternativa[];
    totalVotos:number=0;
    alternativaEscolhida: boolean = false;
  }