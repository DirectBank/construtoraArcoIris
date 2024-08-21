import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { FaleConoscoPage } from './fale-conosco.page';

describe('FaleConoscoPage', () => {
  let component: FaleConoscoPage;
  let fixture: ComponentFixture<FaleConoscoPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FaleConoscoPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(FaleConoscoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
