import { AgendamentoService, TipoAgendamento, NovoAgendamento } from './../../services/agendamento/agendamento.service';
import { AuthenticationService } from 'src/app/services/authentication/authentication.service';
import { CustomAlertService } from 'src/app/services/custom-alert/custom-alert.service';
import { UsuarioService } from 'src/app/services/usuario/usuario.service';
import { NavParams, ModalController, IonSelect, PickerController } from '@ionic/angular';
import { Component, Input, OnInit } from '@angular/core';
import { PickerColumn } from '@ionic/core';

@Component({
  selector: 'app-agendamento',
  templateUrl: './agendamento.page.html',
  styleUrls: ['./agendamento.page.scss'],
})

export class AgendamentoPage implements OnInit {
  public hora1: string;
  public hora2: string;
  public horas: string;
  public pickerOptions: any;

  @Input('selectedDate') selectedDate: any;
  public customActionSheetOptions: any = {
    header: 'Tipo de visita',
    subHeader: 'Selecione o tipo de visita'
  };

  public tiposAgendamento: TipoAgendamento[] = [];
  public novoAgendamento: NovoAgendamento = new NovoAgendamento();

  constructor(
    public agendamentoService: AgendamentoService,
    public authService: AuthenticationService,
    public modalController: ModalController,
    public userService: UsuarioService,
    public modalCtrl: ModalController,
    public alert: CustomAlertService,
    public navParams: NavParams,
    private pickerCtrl: PickerController
  ) { 
  }

  // async openPicker(){
  //   const hours = [
  //       {
  //         text: '10',
  //         value: 10
  //       },
  //       {
  //         text: '11',
  //         value: 11
  //       },
  //       {
  //         text: '13',
  //         value: 13
  //       },
  //       {
  //         text: '14',
  //         value: 14
  //       }
  //     ] 


  //   const minutes = [
  //       {
  //         text: '0',
  //         value: 0
  //       },
  //       {
  //         text: '30',
  //         value: 30
  //       }
  //     ]
  //   const columns =  [
  //     {
  //       name: 'hours',
  //       options: hours
  //     },
  //     {
  //       name: 'minutes',
  //       options: minutes
  //     }
  //   ]

  //   const picker = await this.pickerCtrl.create({
  //     columns: columns,
  //     buttons: [
  //       {
  //         text: 'Cancel',
  //         role: 'cancel',
  //       },
  //       {
  //         text: 'Confirm',
  //         handler: (value) => {
  //           console.log(value);
  //           ;
  //         },
  //       },
  //     ],
  //   });

  //   picker.addEventListener('ionPickerColChange', async (event: any) => {
  //     const column: PickerColumn = event.detail;
  //     console.log(event, column, column.selectedIndex);
      
      

  //     if (column.name === 'hours') {
  //       let updated: PickerColumn | undefined;

  //       const category = this._categories[column.selectedIndex].value as string;
  //       const hour = column.options[column.selectedIndex].value
  //       console.log(hour);
  //       if(hour === 13){
  //         updated = {
  //           name: 'onlythirty',
  //           options: [
  //             { text: '30', value: 30 }
  //           ]
  //         };
  //       }else if(hour === 11){
  //         updated = {
  //           name: 'onlyzero',
  //           options: [
  //             { text: '0', value: 0 }
  //           ]
  //         };
  //       }else {
  //         updated = {
  //           name: 'minutes',
  //           options: [
  //             { text: '0', value: 0 },
  //             { text: '30', value: 30 },
  //           ]
  //         };
  //       }

  //       // switch (hour) {
  //       //   case '10' || '14':
  //       //     updated = {
  //       //       name: this._columnNames.hours,
  //       //       options: [
  //       //         { text: '0', value: 0 },
  //       //         { text: '30', value: 30 },
  //       //       ]
  //       //     };
  //       //     break;
  //       //   case '11':
  //       //     updated = {
  //       //       name: this._columnNames.minutes,
  //       //       options: [
  //       //         { text: '0', value: 0 },
  //       //       ]
  //       //     };
  //       //     break;
  //       //   case '13':
  //       //     updated = {
  //       //       name: this._columnNames.onlythirty,
  //       //       options: [
  //       //         { text: '30', value: 30 },
  //       //       ]
  //       //     };
  //       //     break;
  //       // }
  //       console.log(updated);
        
  //       if (updated) {
  //         picker.columns[1] = updated;
  //         picker.columns = JSON.parse(JSON.stringify(picker.columns));
  //       }
  //     }
  //   });

  //   await picker.present();
  // }

  public horariosVisitas;
  
  ngOnInit() {
    console.log(this.selectedDate.getDay());
    // if(this.selectedDate.getDay() === 6){
    //   this.hourValues = "08,09,10,11"
    // }
    const horarioAte = JSON.parse(this.userService.getUsuario().horarioAte);
    this.horariosVisitas = this.dsv();
    // let horarioPorVisita = JSON.parse(this.userService.getUsuario().horarioPorVisita).reduce((r, a) => {
    //   r[a.id_tipoVisita] = r[a.id_tipoVisita] || [];
    //   r[a.id_tipoVisita].push(a);
    //   return r;
    // }, Object.create(null));
    // horarioPorVisita = Object.keys(horarioPorVisita).map(key => horarioPorVisita[key]);
    // console.log(horarioPorVisita);
    
    this.hora1 = horarioAte[this.selectedDate.getDay()].hora1;
    this.hora2 = horarioAte[this.selectedDate.getDay()].hora2;
    this.novoAgendamento.dataAgendamento = this.selectedDate;
  }

  public horaFixa = false;
  changeTipoVisita(event: IonSelect){
    this.horaFixa = false;
    for(let i = 0; i <= this.horariosVisitas.length; i++){
      if(+this.horariosVisitas[i][0].id_tipoVisita === +this.novoAgendamento.id_tipoVisita && !this.horariosVisitas[i][this.selectedDate.getDay()].horaFixa){ 
        this.horas = this.horariosVisitas[i][this.selectedDate.getDay()].hourValues;
        this.hora1 = this.horariosVisitas[i][this.selectedDate.getDay()].hora1;
        this.hora2 = this.horariosVisitas[i][this.selectedDate.getDay()].hora4 ? this.horariosVisitas[i][this.selectedDate.getDay()].hora4 : this.horariosVisitas[i][this.selectedDate.getDay()].hora2;
        // console.log(this.horas, this.hora1, this.hora2);
        return
      }
      else if(this.horariosVisitas[i][this.selectedDate.getDay()].horaFixa && +this.horariosVisitas[i][0].id_tipoVisita === +this.novoAgendamento.id_tipoVisita){
      // }else if(this.horariosVisitas[i][this.selectedDate.getDay()].horaFixa && +this.horariosVisitas[i][0].id_tipoVisita === 59){
        this.horaFixa = true;
        // console.log(this.horariosVisitas[i][this.selectedDate.getDay()]);
        this.horas = this.horariosVisitas[i][this.selectedDate.getDay()].hourValues;
        return
      }
    }
    
  }

  dsv(){
    let horarioPorVisita = JSON.parse(this.userService.getUsuario().horarioPorVisita).reduce((r, a) => {
      r[a.id_tipoVisita] = r[a.id_tipoVisita] || [];
      r[a.id_tipoVisita].push(a);
      return r;
    }, Object.create(null));
    horarioPorVisita = Object.keys(horarioPorVisita).map(key => horarioPorVisita[key]);
    
    horarioPorVisita = horarioPorVisita.map(tipoVisita => {
      return tipoVisita.map(dia => {
        // debugger
        // console.log(dia.hora1, dia.hora2, dia.hora3, dia.hora4);
        let h1 = +dia.hora1.slice(0,2) //dia.hora1 ? +dia.hora1.slice(0,2) : false
        let h2 = +dia.hora2.slice(0,2) //dia.hora2 ? +dia.hora2.slice(0,2) : false
        let h3 = +dia.hora3.slice(0,2) //dia.hora3 ? +dia.hora3.slice(0,2) : false
        let h4 = +dia.hora4.slice(0,2) //dia.hora4 ? +dia.hora4.slice(0,2) : false
        let hourValues: any = []
        if(+dia.horaFixa){
          [h1,h2,h3,h4].forEach(hora => {
            if(hora){
              hourValues.push(hora)
            }
          })
        }else {
          if(h1 && h2){
            for(let i = h1; i <= h2; i++){
              hourValues.push(i)
            }
          } 
          if(h3 && h4){
            for(let i = h3; i <= h4; i++){
              hourValues.push(i)
            }
          } 
        }

        return {
          ...dia,
          hourValues: hourValues
        }
        // console.log(h1,h2,h3,h4);
      }) 
    })

    console.log(horarioPorVisita);
    return horarioPorVisita
  }

  ionViewDidEnter() {
    this.novoAgendamento.dataAgendamento = this.selectedDate;
    this.agendamentoService.buscaTiposAgendamento()
      .then((res: any) => {
        console.log(res)
        this.tiposAgendamento = res;
      })
      .catch(console.log)
  }

  cadastrar() {
    this.agendamentoService.cadastraAgendamento(this.novoAgendamento)
      .then((res) => {
        // this.alert.standardAlert("Sucesso", "Alterações salvas com sucesso.", "success");
        this.alert.standardAlert("Sucesso", "Em visita à obra, é obrigatório o uso de calçado fechado.", "success");
        this.fechar(true);
      })
      .catch(err => {
        console.log(err);
        const msg = err.error.message ? err.error.message : "Algo deu errado. Tente novamente mais tarde.";
        this.alert.standardAlert("Erro", msg, "fail");
        this.fechar(false);
      })
  }

  fechar(shouldReload: boolean = false) {
    this.modalCtrl.dismiss({ shouldReload: shouldReload });
  }

}
