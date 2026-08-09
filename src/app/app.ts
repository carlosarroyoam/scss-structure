import { Component, inject } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';

import { ThemePreference, ThemeService } from '@/shared/services/theme-service/theme.service';

interface ThemeOption {
  readonly label: string;
  readonly value: ThemePreference;
}

@Component({
  selector: 'app-root',
  imports: [RouterLink, RouterLinkActive, RouterOutlet],
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App {
  private readonly themeService = inject(ThemeService);

  protected readonly themePreference = this.themeService.preference;

  protected readonly themeOptions: readonly ThemeOption[] = [
    { label: 'Sistema', value: 'system' },
    { label: 'Claro', value: 'light' },
    { label: 'Oscuro', value: 'dark' },
  ];

  protected setTheme(preference: ThemePreference): void {
    this.themeService.setPreference(preference);
  }
}
