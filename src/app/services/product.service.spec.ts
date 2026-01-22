import { TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { PokeapiService } from './pokeapi';
import { ProductosService } from './product.service'; 

describe('ProductService', () => {
  let service: ProductosService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        PokeapiService,
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
