import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { BoletosPage } from './boletos.page';

describe('BoletosPage', () => {
  let component: BoletosPage;
  let fixture: ComponentFixture<BoletosPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BoletosPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(BoletosPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
