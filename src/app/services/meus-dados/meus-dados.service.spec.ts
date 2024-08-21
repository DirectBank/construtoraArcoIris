import { TestBed } from '@angular/core/testing';

import { MeusDadosService } from './meus-dados.service';

describe('MeusDadosService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: MeusDadosService = TestBed.get(MeusDadosService);
    expect(service).toBeTruthy();
  });
});
