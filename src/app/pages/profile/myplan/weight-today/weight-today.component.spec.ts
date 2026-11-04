import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WeightTodayComponent } from './weight-today.component';

describe('WeightTodayComponent', () => {
  let component: WeightTodayComponent;
  let fixture: ComponentFixture<WeightTodayComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [WeightTodayComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WeightTodayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
