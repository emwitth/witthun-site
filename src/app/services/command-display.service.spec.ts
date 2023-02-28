import { TestBed } from '@angular/core/testing';

import { CommandDisplayService } from './command-display.service';

describe('CommandDisplayService', () => {
  let service: CommandDisplayService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CommandDisplayService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
