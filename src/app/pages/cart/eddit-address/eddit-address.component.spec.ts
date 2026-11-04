import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EdditAddressComponent } from './eddit-address.component';

describe('EdditAddressComponent', () => {
  let component: EdditAddressComponent;
  let fixture: ComponentFixture<EdditAddressComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [EdditAddressComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EdditAddressComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
