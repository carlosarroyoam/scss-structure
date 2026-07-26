import { DOCUMENT } from '@angular/common';
import { Service, inject, signal } from '@angular/core';

import { THEME_PREFERENCE_KEY } from '@/core/constants/storage-keys.constants';
import { LocalStorageService } from '@/core/data-access/services/storage-service/local-storage-service';

export type ThemePreference = 'system' | 'light' | 'dark';

@Service()
export class ThemeService {
  private readonly document = inject(DOCUMENT);
  private readonly storageService = inject(LocalStorageService);
  private readonly preferenceState = signal<ThemePreference>(this.readPreference());

  public readonly preference = this.preferenceState.asReadonly();

  constructor() {
    this.applyPreference(this.preferenceState());
  }

  public setPreference(preference: ThemePreference): void {
    this.preferenceState.set(preference);
    this.applyPreference(preference);
    this.persistPreference(preference);
  }

  private readPreference(): ThemePreference {
    const storedPreference = this.storageService.getItem<string>(THEME_PREFERENCE_KEY);

    return storedPreference === 'light' || storedPreference === 'dark'
      ? storedPreference
      : 'system';
  }

  private applyPreference(preference: ThemePreference): void {
    const root = this.document.documentElement;

    if (preference === 'system') {
      root.removeAttribute('data-theme');
      return;
    }

    root.dataset['theme'] = preference;
  }

  private persistPreference(preference: ThemePreference): void {
    if (preference === 'system') {
      this.storageService.removeItem(THEME_PREFERENCE_KEY);
    } else {
      this.storageService.setItem(THEME_PREFERENCE_KEY, preference);
    }
  }
}
