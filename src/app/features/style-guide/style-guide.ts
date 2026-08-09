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
    { variable: '--color-action-primary', style: 'var(--color-action-primary)' },
    { variable: '--color-action-primary-hover', style: 'var(--color-action-primary-hover)' },
    { variable: '--color-on-action', style: 'var(--color-on-action)' },
    { variable: '--color-focus-ring', style: 'var(--color-focus-ring)' },
    { variable: '--color-success', style: 'var(--color-success)' },
    { variable: '--color-danger', style: 'var(--color-danger)' },
  ];

  // Mirrors src/styles/tokens/_primitives.scss $space — keep the labels in sync.
  protected readonly spaceTokens: readonly ScaleToken[] = [
    { variable: '--space-px', label: '1px', style: 'var(--space-px)' },
    { variable: '--space-0-5', label: '0.125rem', style: 'var(--space-0-5)' },
    { variable: '--space-1', label: '0.25rem', style: 'var(--space-1)' },
    { variable: '--space-1-5', label: '0.375rem', style: 'var(--space-1-5)' },
    { variable: '--space-2', label: '0.5rem', style: 'var(--space-2)' },
    { variable: '--space-2-5', label: '0.625rem', style: 'var(--space-2-5)' },
    { variable: '--space-3', label: '0.75rem', style: 'var(--space-3)' },
    { variable: '--space-3-5', label: '0.875rem', style: 'var(--space-3-5)' },
    { variable: '--space-4', label: '1rem', style: 'var(--space-4)' },
    { variable: '--space-5', label: '1.25rem', style: 'var(--space-5)' },
    { variable: '--space-6', label: '1.5rem', style: 'var(--space-6)' },
    { variable: '--space-8', label: '2rem', style: 'var(--space-8)' },
    { variable: '--space-10', label: '2.5rem', style: 'var(--space-10)' },
    { variable: '--space-12', label: '3rem', style: 'var(--space-12)' },
    { variable: '--space-16', label: '4rem', style: 'var(--space-16)' },
    { variable: '--space-20', label: '5rem', style: 'var(--space-20)' },
    { variable: '--space-24', label: '6rem', style: 'var(--space-24)' },
    { variable: '--space-32', label: '8rem', style: 'var(--space-32)' },
  ];

  // Mirrors src/styles/tokens/_primitives.scss $radius — keep the labels in sync.
  protected readonly radiusTokens: readonly ScaleToken[] = [
    { variable: '--radius-xs', label: '0.125rem', style: 'var(--radius-xs)' },
    { variable: '--radius-sm', label: '0.25rem', style: 'var(--radius-sm)' },
    { variable: '--radius-md', label: '0.375rem', style: 'var(--radius-md)' },
    { variable: '--radius-lg', label: '0.5rem', style: 'var(--radius-lg)' },
    { variable: '--radius-xl', label: '0.75rem', style: 'var(--radius-xl)' },
    { variable: '--radius-pill', label: '999rem', style: 'var(--radius-pill)' },
  ];

  // Mirrors src/styles/tokens/_semantic.scss font-size scale — keep the labels in sync.
  protected readonly fontSizeTokens: readonly ScaleToken[] = [
    { variable: '--font-size-xs', label: '0.75rem', style: 'var(--font-size-xs)' },
    { variable: '--font-size-sm', label: '0.875rem', style: 'var(--font-size-sm)' },
    { variable: '--font-size-md', label: '1rem', style: 'var(--font-size-md)' },
    { variable: '--font-size-lg', label: '1.125rem', style: 'var(--font-size-lg)' },
    { variable: '--font-size-xl', label: '1.25rem', style: 'var(--font-size-xl)' },
    { variable: '--font-size-2xl', label: '1.5rem', style: 'var(--font-size-2xl)' },
    { variable: '--font-size-3xl', label: '1.875rem', style: 'var(--font-size-3xl)' },
  ];

  protected readonly fontWeightTokens: readonly ScaleToken[] = [
    { variable: '--font-weight-normal', label: '400', style: 'var(--font-weight-normal)' },
    { variable: '--font-weight-medium', label: '500', style: 'var(--font-weight-medium)' },
    { variable: '--font-weight-bold', label: '700', style: 'var(--font-weight-bold)' },
  ];

  protected readonly shadowTokens: readonly ScaleToken[] = [
    { variable: '--shadow-sm', label: 'sm', style: 'var(--shadow-sm)' },
    { variable: '--shadow-md', label: 'md', style: 'var(--shadow-md)' },
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
