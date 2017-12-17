import { TestBed, inject } from '@angular/core/testing';

import { AuthentificationGuardService } from './authentification-guard.service';

describe('AuthentificationGuardService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AuthentificationGuardService]
    });
  });

  it('should be created', inject([AuthentificationGuardService], (service: AuthentificationGuardService) => {
    expect(service).toBeTruthy();
  }));
});
