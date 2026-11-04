import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddDietarySupplementsComponent } from './add-dietary-supplements.component';

describe('AddDietarySupplementsComponent', () => {
  let component: AddDietarySupplementsComponent;
  let fixture: ComponentFixture<AddDietarySupplementsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AddDietarySupplementsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddDietarySupplementsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
