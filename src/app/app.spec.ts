import { TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import axe from 'axe-core';

import { THEME_PREFERENCE_KEY } from '@/core/constants/storage-keys.constants';
import { LocalStorageService } from '@/core/data-access/services/storage-service/local-storage-service';
import { App } from './app';
import { routes } from './app.routes';

describe('App', () => {
  beforeEach(async () => {
    localStorage.clear();
    document.documentElement.removeAttribute('data-theme');

    await TestBed.configureTestingModule({
      imports: [App],
      providers: [provideRouter(routes)],
    }).compileComponents();
  });

  it('creates the app', () => {
    const fixture = TestBed.createComponent(App);

    expect(fixture.componentInstance).toBeTruthy();
  });

  it('applies and persists an explicit theme preference', async () => {
    const fixture = TestBed.createComponent(App);
    fixture.detectChanges();
    const darkThemeButton = fixture.nativeElement.querySelectorAll(
      '.theme-selector__button',
    )[2] as HTMLButtonElement;

    darkThemeButton.click();
    await fixture.whenStable();

    expect(document.documentElement.dataset['theme']).toBe('dark');
    expect(TestBed.inject(LocalStorageService).getItem(THEME_PREFERENCE_KEY)).toBe('dark');
    expect(darkThemeButton.getAttribute('aria-pressed')).toBe('true');
  });

  it('has no detectable accessibility violations', async () => {
    const fixture = TestBed.createComponent(App);
    fixture.detectChanges();
    await fixture.whenStable();

    const results = await axe.run(fixture.nativeElement as HTMLElement);

    expect(results.violations).toEqual([]);
  });
});
