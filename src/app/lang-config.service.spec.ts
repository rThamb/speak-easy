import { TestBed } from '@angular/core/testing';

import { LangConfigService } from './lang-config.service';

describe('LangConfigService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: LangConfigService = TestBed.get(LangConfigService);
    expect(service).toBeTruthy();
  });
});
