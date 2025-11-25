import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Pokeapi } from './pokeapi';

describe('Pokeapi', () => {
  let component: Pokeapi;
  let fixture: ComponentFixture<Pokeapi>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Pokeapi]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Pokeapi);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
