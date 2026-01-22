import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { PokeApiComponent } from './pokeapi';

describe('PokeApiComponent', () => {
  let component: PokeApiComponent;
  let fixture: ComponentFixture<PokeApiComponent>;
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PokeApiComponent],
      providers: [
        provideHttpClient(),
        provideHttpClientTesting()
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PokeApiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
