import { TestBed } from '@angular/core/testing';

import { THEME_PREFERENCE_KEY } from '@/core/constants/storage-keys.constants';
import { LocalStorageService } from '@/core/data-access/services/storage-service/local-storage-service';
import { ThemeService } from './theme.service';

describe('ThemeService', () => {
  beforeEach(() => {
    localStorage.clear();
    document.documentElement.removeAttribute('data-theme');
    TestBed.configureTestingModule({});
  });

  it('uses the system preference by default', () => {
    const service = TestBed.inject(ThemeService);

    expect(service.preference()).toBe('system');
    expect(document.documentElement.hasAttribute('data-theme')).toBe(false);
  });

  it('removes explicit theme state when returning to the system preference', () => {
    const service = TestBed.inject(ThemeService);

    service.setPreference('light');
    service.setPreference('system');

    expect(document.documentElement.hasAttribute('data-theme')).toBe(false);
    expect(TestBed.inject(LocalStorageService).getItem(THEME_PREFERENCE_KEY)).toBeNull();
  });
});
