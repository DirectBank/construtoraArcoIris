import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { LgpdPage } from './lgpd.page';

describe('LgpdPage', () => {
  let component: LgpdPage;
  let fixture: ComponentFixture<LgpdPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LgpdPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(LgpdPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
