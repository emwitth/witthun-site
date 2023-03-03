import { TestBed } from '@angular/core/testing';

import { ToolbarService } from './toolbar.service';

describe('CommandDisplayService', () => {
  let service: ToolbarService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ToolbarService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
