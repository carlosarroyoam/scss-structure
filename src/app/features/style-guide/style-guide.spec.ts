import { TestBed } from '@angular/core/testing';
import axe from 'axe-core';

import { StyleGuide } from './style-guide';

describe('StyleGuide', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StyleGuide],
    }).compileComponents();
  });

  it('creates the component', () => {
    const fixture = TestBed.createComponent(StyleGuide);

    expect(fixture.componentInstance).toBeTruthy();
  });

  it('renders a swatch for every color token', async () => {
    const fixture = TestBed.createComponent(StyleGuide);
    fixture.detectChanges();
    await fixture.whenStable();
    const compiled = fixture.nativeElement as HTMLElement;

    // Mirrors the number of entries in the component's colorTokens array.
    expect(compiled.querySelectorAll('.style-guide__swatch-color').length).toBe(12);
  });

  it('has no detectable accessibility violations', async () => {
    const fixture = TestBed.createComponent(StyleGuide);
    fixture.detectChanges();
    await fixture.whenStable();

    const results = await axe.run(fixture.nativeElement as HTMLElement);

    expect(results.violations).toEqual([]);
  });
});
