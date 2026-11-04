import { TestBed } from '@angular/core/testing';

import { SharedPlanService } from './shared-plan.service';

describe('SharedPlanService', () => {
  let service: SharedPlanService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SharedPlanService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
