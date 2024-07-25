import { TestBed } from '@angular/core/testing';

import { Navbar2Service } from './navbar2.service';

describe('Navbar2Service', () => {
  let service: Navbar2Service;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Navbar2Service);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
