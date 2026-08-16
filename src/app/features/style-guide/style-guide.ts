import { Component } from '@angular/core';

interface ColorToken {
  readonly variable: string;
  readonly style: string;
}

interface ScaleToken {
  readonly variable: string;
  readonly label: string;
  readonly style: string;
}

@Component({
  selector: 'app-style-guide',
  templateUrl: './style-guide.html',
  styleUrl: './style-guide.scss',
})
export class StyleGuide {
  // Mirrors src/styles/themes/_palette.scss — keep the variable names in sync.
  protected readonly colorTokens: readonly ColorToken[] = [
    { variable: '--color-background', style: 'var(--color-background)' },
    { variable: '--color-surface', style: 'var(--color-surface)' },
    { variable: '--color-surface-muted', style: 'var(--color-surface-muted)' },
    { variable: '--color-text-primary', style: 'var(--color-text-primary)' },
    { variable: '--color-text-secondary', style: 'var(--color-text-secondary)' },
    { variable: '--color-border', style: 'var(--color-border)' },
    { variable: '--color-focus-ring', style: 'var(--color-focus-ring)' },
    { variable: '--color-primary', style: 'var(--color-primary)' },
    { variable: '--color-primary-hover', style: 'var(--color-primary-hover)' },
    { variable: '--color-on-primary', style: 'var(--color-on-primary)' },
    { variable: '--color-accent', style: 'var(--color-accent)' },
    { variable: '--color-success', style: 'var(--color-success)' },
    { variable: '--color-warning', style: 'var(--color-warning)' },
    { variable: '--color-danger', style: 'var(--color-danger)' },
    { variable: '--color-info', style: 'var(--color-info)' },
  ];

  // Mirrors src/styles/tokens/_primitives.scss $space — keep the labels in sync.
  protected readonly spaceTokens: readonly ScaleToken[] = [
    { variable: '--spacing-px', label: '1px', style: 'var(--spacing-px)' },
    { variable: '--spacing-0-5', label: '0.125rem', style: 'var(--spacing-0-5)' },
    { variable: '--spacing-1', label: '0.25rem', style: 'var(--spacing-1)' },
    { variable: '--spacing-1-5', label: '0.375rem', style: 'var(--spacing-1-5)' },
    { variable: '--spacing-2', label: '0.5rem', style: 'var(--spacing-2)' },
    { variable: '--spacing-2-5', label: '0.625rem', style: 'var(--spacing-2-5)' },
    { variable: '--spacing-3', label: '0.75rem', style: 'var(--spacing-3)' },
    { variable: '--spacing-3-5', label: '0.875rem', style: 'var(--spacing-3-5)' },
    { variable: '--spacing-4', label: '1rem', style: 'var(--spacing-4)' },
    { variable: '--spacing-5', label: '1.25rem', style: 'var(--spacing-5)' },
    { variable: '--spacing-6', label: '1.5rem', style: 'var(--spacing-6)' },
    { variable: '--spacing-8', label: '2rem', style: 'var(--spacing-8)' },
    { variable: '--spacing-10', label: '2.5rem', style: 'var(--spacing-10)' },
    { variable: '--spacing-12', label: '3rem', style: 'var(--spacing-12)' },
    { variable: '--spacing-16', label: '4rem', style: 'var(--spacing-16)' },
    { variable: '--spacing-20', label: '5rem', style: 'var(--spacing-20)' },
    { variable: '--spacing-24', label: '6rem', style: 'var(--spacing-24)' },
    { variable: '--spacing-32', label: '8rem', style: 'var(--spacing-32)' },
  ];

  // Mirrors src/styles/tokens/_primitives.scss $radius — keep the labels in sync.
  protected readonly radiusTokens: readonly ScaleToken[] = [
    { variable: '--radius-xs', label: '0.125rem', style: 'var(--radius-xs)' },
    { variable: '--radius-sm', label: '0.25rem', style: 'var(--radius-sm)' },
    { variable: '--radius-md', label: '0.375rem', style: 'var(--radius-md)' },
    { variable: '--radius-lg', label: '0.5rem', style: 'var(--radius-lg)' },
    { variable: '--radius-xl', label: '0.75rem', style: 'var(--radius-xl)' },
    { variable: '--radius-2xl', label: '1rem', style: 'var(--radius-2xl)' },
    { variable: '--radius-3xl', label: '1.5rem', style: 'var(--radius-3xl)' },
    { variable: '--radius-full', label: '2rem', style: 'var(--radius-full)' },
  ];

  // Mirrors src/styles/tokens/_semantic.scss font-size scale — keep the labels in sync.
  protected readonly fontSizeTokens: readonly ScaleToken[] = [
    { variable: '--font-size-xs', label: '0.75rem', style: 'var(--font-size-xs)' },
    { variable: '--font-size-sm', label: '0.875rem', style: 'var(--font-size-sm)' },
    { variable: '--font-size-base', label: '1rem', style: 'var(--font-size-base)' },
    { variable: '--font-size-lg', label: '1.125rem', style: 'var(--font-size-lg)' },
    { variable: '--font-size-xl', label: '1.25rem', style: 'var(--font-size-xl)' },
    { variable: '--font-size-2xl', label: '1.5rem', style: 'var(--font-size-2xl)' },
    { variable: '--font-size-3xl', label: '1.875rem', style: 'var(--font-size-3xl)' },
    { variable: '--font-size-4xl', label: '2.25rem', style: 'var(--font-size-4xl)' },
    { variable: '--font-size-5xl', label: '3rem', style: 'var(--font-size-5xl)' },
    { variable: '--font-size-6xl', label: '3.75rem', style: 'var(--font-size-6xl)' },
  ];

  protected readonly fontWeightTokens: readonly ScaleToken[] = [
    { variable: '--font-weight-normal', label: '400', style: 'var(--font-weight-normal)' },
    { variable: '--font-weight-medium', label: '500', style: 'var(--font-weight-medium)' },
    { variable: '--font-weight-bold', label: '700', style: 'var(--font-weight-bold)' },
  ];

  protected readonly shadowTokens: readonly ScaleToken[] = [
    { variable: '--shadow-xs', label: 'xs', style: 'var(--shadow-xs)' },
    { variable: '--shadow-sm', label: 'sm', style: 'var(--shadow-sm)' },
    { variable: '--shadow-md', label: 'md', style: 'var(--shadow-md)' },
    { variable: '--shadow-lg', label: 'lg', style: 'var(--shadow-lg)' },
  ];

  // Semantic z-index aliases from src/styles/tokens/_semantic.scss.
  protected readonly zIndexTokens: readonly ScaleToken[] = [
    { variable: '--z-sticky', label: '10', style: 'var(--z-sticky)' },
    { variable: '--z-dropdown', label: '20', style: 'var(--z-dropdown)' },
    { variable: '--z-overlay', label: '30', style: 'var(--z-overlay)' },
    { variable: '--z-modal', label: '40', style: 'var(--z-modal)' },
    { variable: '--z-toast', label: '50', style: 'var(--z-toast)' },
  ];
}
