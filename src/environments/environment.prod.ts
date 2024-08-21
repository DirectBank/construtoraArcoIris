//const URL = 'https://api.workoffice.com.br/omp/api/' //Https Produção
// const URL = 'https://woserviceapi.brazilsouth.cloudapp.azure.com' //Https Produção Azure
const URL = 'https://ompapi.azurewebsites.net'; //Https Produção Azure https://ompapi.azurewebsites.net/unidadez/api/v3
// const URL = 'http://192.168.15.19:3030'
const encrDecrKey = 'Yco1e?mb8C&8KdPE-Hz>A1Q(zGT0Xcwu4CMA}0b13Ib$lq)Xzi'


import project from './choosen-project'

var configEmpresa = require('../../scripts/empresas.json');

const buildUrl = (produto: string, endPoint: string) => {
  return `${URL}/${produto}/api/v3/${endPoint}`
}
const getUrl = () => {
  return URL;
}

// var nomeEmpresaAtual = project;
var nomeEmpresaAtual = "engeplus";
const empresaAtual = {
  codigo: configEmpresa[nomeEmpresaAtual].codigo,
  bundleId:  configEmpresa[nomeEmpresaAtual].appId,
  appName: configEmpresa[nomeEmpresaAtual].appName,
  personalizado:  configEmpresa[nomeEmpresaAtual].personalizado,
  firebase:  configEmpresa[nomeEmpresaAtual].firebase,
  primaryColor:configEmpresa[nomeEmpresaAtual].primaryColor,
  id_ios:configEmpresa[nomeEmpresaAtual].id_ios,
  infoAdm: configEmpresa[nomeEmpresaAtual].infoAdm,
  loginBkgImg: configEmpresa[nomeEmpresaAtual].loginBkgImg
}

export const environment = {
  getUrl,
  buildUrl,
  production: false,
  empresaAtual,
  API_ENDPOINT: {
    'apiLogin': 'construtora/auth/login',
    'apiEsqueciSenha': 'construtora/auth/esqueci-senha',
    'apiAlteraSenha': 'construtora/altera-senha',
    'apiMenu': 'menu',
    'apiDespesasIndividuaisDetalhado': 'financeiro/despesas-individuais/detalhado',
    'apiImagemLeituraConsumoAgua': 'financeiro/agua/imagem-leitura',
    'apiDespesasIndividuais': 'financeiro/despesas-individuais',
    'apiDespesasDetalhado': 'financeiro/despesas/detalhado',
    'apiExtratoBancario': 'financeiro/extrato-bancario',
    'apiDemonstrativos': 'financeiro/demonstrativos',
    'apiLeituraConsumoAgua': 'financeiro/agua',
    'apiDespesas': 'financeiro/despesas',
    'apiProcessos': 'sindico/processos',
    'apiUnidades': 'sindico/unidades',
    'apiUnidadesResumido': 'sindico/unidades/resumido',
    'apiDebitosDevedores': 'cobranca/debitos/devedores',
    'apiReceitas': 'financeiro/receitas',
    'apiAcordoParcelas': 'cobranca/acordos/parcelas',
    'apiDebitos': 'cobranca/debitos',
    'apiAcordos': 'cobranca/acordos',
    'apiBoletos': 'construtora/cobranca/boletos',
    'apiInfoRendimento': 'construtora/cobranca/info-rendimento',
    'apiVencimentoServico': 'servicos/vencimento-servico',
    'apiPrestadoresServico': 'servicos/prestadores',
    'apiMeusDados': 'meus-dados',
    'apiMoradores': 'moradores',
    'apiEnquetes': 'enquetes',
    'apiDocumentosDownload': 'administrativo/documentos/download',
    'apiDocumentos': 'construtora/documentos',
    'apiAdministradoraLogo': 'administradora/logo',
    'apiAdministradoraDados': 'administradora',
    'apiImagemOcorrencia': 'condominio/livro-ocorrencias/imagem-ocorrencia',
    'apiLivroOcorrencias': 'condominio/livro-ocorrencias',
    'apiImagemAchadosPerdidos': 'condominio/achados-pedidos/imagem-objeto',
    'apiImagemEncomenda': 'condominio/encomendas/imagem-encomenda',
    'apiAchadosPerdidos': 'condominio/achados-pedidos',
    'apiMercadoInterno': 'condominio/mercado-interno',
    'apiManutencao': 'condominio/manutencao',
    'apiImagemSolicitacao': 'condominio/manutencao',
    'apiComunicados': 'construtora/comunicados',
    'apiEncomenda': 'condominio/encomendas',
    'apiReservas': 'condominio/reservas',
    'apiProcedimentosChegada': 'condominio/agendamentos-visita/procedimento-chegada',
    'apiMudanca': 'condominio/mudanca',
    'apiReservaRotativa': 'condominio/reserva-rotativa',
    'apiVeiculo': 'condominio/veiculo',
    'apiDrive': 'drive',
    'apiAvaliacaoApp': 'avaliacao',
    'apiRefreshToken':'construtora/auth/refresh-token',
    'apiHidrobox': 'hidrobox',
    'apiClubeDeVantagens':'clubeDeVantagens',
    'apiPlanosPagamento':'construtora/planos-pagamento',
    'apiEvolucaoEmpreendimento':'construtora/empreendimento/evolucao',
    'apiGaleriaEmpreendimento':'construtora/empreendimento/busca-imagens-bd',
    'apiGaleriaEmpreendimentoFirebase':'construtora/empreendimento/busca-imagens-firebase',
    'apiAgendamentos': 'construtora/agendamentos',
    'apiFaleConosco': 'construtora/fale-conosco',
    'apiTermoLgpd':'construtora/lgpd',
    'apiPersonalizacoes':'construtora/personalizacoes',
    'apiVistorias':'construtora/vistorias',
  }
};
