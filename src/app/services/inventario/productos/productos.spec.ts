import { TestBed } from '@angular/core/testing';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { ProductosService } from './productos';
import { provideHttpClient } from '@angular/common/http';

describe('ProductosService', () => {
  let service: ProductosService;

  beforeEach(() => {
    TestBed.configureTestingModule({
            providers: [
        provideHttpClient(),
        provideHttpClientTesting()
      ]
    });
    service = TestBed.inject(ProductosService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
