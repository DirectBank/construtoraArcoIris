import { TestBed } from '@angular/core/testing';

import { EnquetesService } from './enquetes.service';

describe('EnquetesService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: EnquetesService = TestBed.get(EnquetesService);
    expect(service).toBeTruthy();
  });
});
