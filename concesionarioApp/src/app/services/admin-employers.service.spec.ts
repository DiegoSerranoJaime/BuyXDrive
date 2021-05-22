import { TestBed } from '@angular/core/testing';

import { AdminEmployersService } from './admin-employers.service';

describe('AdminEmployersService', () => {
  let service: AdminEmployersService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AdminEmployersService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
