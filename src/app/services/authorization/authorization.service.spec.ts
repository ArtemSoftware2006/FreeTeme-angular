import { TestBed } from '@angular/core/testing';

import { AuthorizationService } from './authorization.service';

// Лучше удалять пустые тесты. От них нет пользы, а только мусор в коде.
describe('AuthorizationService', () => {
  let service: AuthorizationService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AuthorizationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
