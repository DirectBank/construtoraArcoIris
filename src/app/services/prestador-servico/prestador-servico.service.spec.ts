import { TestBed } from '@angular/core/testing';

import { PrestadorServicoService } from './prestador-servico.service';

describe('PrestadorServicoService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: PrestadorServicoService = TestBed.get(PrestadorServicoService);
    expect(service).toBeTruthy();
  });
});
