import { Agendamento, AgendamentoService } from 'src/app/services/agendamento/agendamento.service';
import { CustomLoaderService } from 'src/app/services/custom-loader/custom-loader.service';
import { CustomAlertService } from './../../services/custom-alert/custom-alert.service';
import { enterAnimation, leaveAnimation } from 'src/app/animations/modal-animations';
import { IonInfiniteScroll, ModalController, NavController } from '@ionic/angular';
import { AgendamentoPage } from './../../components/agendamento/agendamento.page';
import { Component, OnInit, ViewChild, Inject, LOCALE_ID } from '@angular/core';
import { UsuarioService } from 'src/app/services/usuario/usuario.service';
import { Router, NavigationExtras } from '@angular/router';
import { CalendarComponent } from 'ionic2-calendar';

@Component({
  selector: 'app-agendamentos',
  templateUrl: './agendamentos.page.html',
  styleUrls: ['./agendamentos.page.scss'],
})
export class AgendamentosPage implements OnInit {

  @ViewChild(IonInfiniteScroll) infiniteScroll: IonInfiniteScroll;

  public eventSource: Agendamento[] = [];
  public selectedDate: Date;
  public viewTitle: string;
  public horarioAte = [];

  public calendar = {
    mode: 'month',
    currentDate: new Date(),
  };

  @ViewChild(CalendarComponent) myCal: CalendarComponent;

  constructor(
    public agendamentoService: AgendamentoService,
    @Inject(LOCALE_ID) private locale: string,
    public modalController: ModalController,
    public userService: UsuarioService,
    public loader: CustomLoaderService,
    public modalCtrl: ModalController,
    private alert: CustomAlertService,
    public navCtrl: NavController,
    public router: Router,
  ) { }

  ngOnInit() {
    this.horarioAte = JSON.parse(this.userService.getUsuario().horarioAte);
  }

  ionViewDidEnter() {
    // this.createRandomEvents();
    this.updateAgendamentos();
  }

  next() {
    this.myCal.slideNext();
    // this.updateAgendamentos();
  }

  back() {
    this.myCal.slidePrev();
    // this.updateAgendamentos();
  }

  updateAgendamentos() {
    this.agendamentoService.buscaAgendaMes(`${(this.myCal.currentDate.getMonth() + 1).toString().padStart(2, '0')}/${this.myCal.currentDate.getFullYear()}`)
      .then((res: Agendamento[]) => {
        this.eventSource = res;
        console.log(this.eventSource)
      })
      .catch(console.log)
  }

  async onEventSelected(event) {
    console.log(event)
    this.cancelaVisita(event);
  }

  onCurrentDateChanged(event) {
    this.selectedDate = event;
  }

  createRandomEvents() {
    var events = [];
    for (var i = 0; i < 50; i += 1) {
      var date = new Date();
      var status = Math.floor(Math.random() * (2 - 0) + 0);
      var eventType = Math.floor(Math.random() * 2);
      var startDay = Math.floor(Math.random() * 90) - 45;
      var endDay = Math.floor(Math.random() * 2) + startDay;
      var startTime;
      var endTime;

      if (eventType === 0) {
        startTime = new Date(
          Date.UTC(
            date.getUTCFullYear(),
            date.getUTCMonth(),
            date.getUTCDate() + startDay
          )
        );
        if (endDay === startDay) {
          endDay += 1;
        }
        endTime = new Date(
          Date.UTC(
            date.getUTCFullYear(),
            date.getUTCMonth(),
            date.getUTCDate() + endDay
          )
        );
        events.push({
          title: 'All Day - ' + i,
          startTime: startTime,
          endTime: endTime,
          allDay: true,
          status
        });
      } else {
        var startMinute = Math.floor(Math.random() * 24 * 60);
        var endMinute = Math.floor(Math.random() * 180) + startMinute;
        startTime = new Date(
          date.getFullYear(),
          date.getMonth(),
          date.getDate() + startDay,
          0,
          date.getMinutes() + startMinute
        );
        endTime = new Date(
          date.getFullYear(),
          date.getMonth(),
          date.getDate() + endDay,
          0,
          date.getMinutes() + endMinute
        );
        events.push({
          title: 'Event - ' + i,
          startTime: startTime,
          endTime: endTime,
          allDay: false,
          status
        });
      }
    }
    this.eventSource = events;
    console.log(events)
  }

  removeEvents() {
    this.eventSource = [];
  }

  backPage() {
    this.router.navigate([`/tabs`]);
  }

  onViewTitleChanged(title) {
    this.viewTitle = title;

    this.updateAgendamentos();
  }

  markDisabled = (date: Date) => {
    
    let current = new Date();
    let final = new Date();
    final.setDate(current.getDate() + this.userService.getUsuario().diasCalendario);
    final.setHours(0, 0, 0, 0);
    current.setHours(0, 0, 0, 0);
    date.setHours(0, 0, 0, 0);
    
    
    return (date < current)
      || (date > final)
      || this.horarioAte[date.getDay()].hora1 === '' ?  true : false
  };

  navTo(page) {
    let params: NavigationExtras = {
      state: {
      }
    }

    this.router.navigate([`/tabs/tab2/home/${page}`], params);
  }

  async adicionarAgendamento() {
    console.log(this.selectedDate)
    const modal = await this.modalCtrl.create({
      component: AgendamentoPage,
      cssClass: 'my-custom-agendamento',
      componentProps: {
        selectedDate: this.selectedDate
      },
      enterAnimation: enterAnimation,
      leaveAnimation: leaveAnimation
    });
    // return await modal.present();
    modal.present();
    const { data } = await modal.onDidDismiss();
    if (data && data.shouldReload) {
      this.updateAgendamentos();
    }
  }

  formatStatus(status: string) {
    switch (status) {
      case "0":
        return "Aguardando";
      case "1":
        return "Liberado";
      case "2":
        return "Cancelado";

    }
  }

  cancelaVisita(evento) {
    if (evento.status != 2) {
      this.alert.confirmationAlert({
        title: "Cancelar visita",
        message: `Tem certeza que deseja cancelar esta visita?`,
        okFunction: () => {
          this.agendamentoService.cancelaAgendamento(evento.id_agenda).then((res: any) => {
            this.alert.standardAlert("Sucesso", "Visita cancelada", "success");
            this.updateAgendamentos();
          }).catch(err => {            
            this.alert.standardAlert("Erro", "Algo deu errado. Tente novamente mais tarde.", "fail");
          })
        },
        cancelFunction: () => { },
      })
    }
  }

}

