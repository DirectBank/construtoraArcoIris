import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { InfoRendimentoPage } from './info-rendimento.page';

describe('InfoRendimentoPage', () => {
  let component: InfoRendimentoPage;
  let fixture: ComponentFixture<InfoRendimentoPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InfoRendimentoPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(InfoRendimentoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
