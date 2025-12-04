import { TestBed } from '@angular/core/testing';

import { PokeApi2 } from './poke-api2';

describe('PokeApi2', () => {
  let service: PokeApi2;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PokeApi2);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
