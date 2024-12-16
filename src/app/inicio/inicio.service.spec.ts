import { TestBed } from '@angular/core/testing';

import { HamburguesaService } from './inicio.service';

describe('InicioService', () => {
  let service: HamburguesaService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(HamburguesaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
