import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RidersList } from './riders-list';

describe('RidersList', () => {
  let component: RidersList;
  let fixture: ComponentFixture<RidersList>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RidersList]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RidersList);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
