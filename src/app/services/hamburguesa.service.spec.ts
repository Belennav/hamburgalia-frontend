import { TestBed } from '@angular/core/testing';

import { HamburguesaService } from './hamburguesa.service';

describe('SangucheService', () => {
  let service: HamburguesaService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(HamburguesaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
