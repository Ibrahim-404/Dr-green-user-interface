import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CongratesComponent } from './congrates.component';

describe('CongratesComponent', () => {
  let component: CongratesComponent;
  let fixture: ComponentFixture<CongratesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CongratesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CongratesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
