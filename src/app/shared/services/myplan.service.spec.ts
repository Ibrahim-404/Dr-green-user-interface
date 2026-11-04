import { TestBed } from '@angular/core/testing';

import { MyplanService } from './myplan.service';

describe('MyplanService', () => {
  let service: MyplanService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MyplanService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
