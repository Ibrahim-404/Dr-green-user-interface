import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TipsDetailsComponent } from './tips-details.component';

describe('TipsDetailsComponent', () => {
  let component: TipsDetailsComponent;
  let fixture: ComponentFixture<TipsDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TipsDetailsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TipsDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
