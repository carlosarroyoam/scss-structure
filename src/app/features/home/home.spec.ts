import { TestBed } from '@angular/core/testing';
import axe from 'axe-core';

import { Home } from './home';

describe('Home', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Home],
    }).compileComponents();
  });

  it('creates the component', () => {
    const fixture = TestBed.createComponent(Home);

    expect(fixture.componentInstance).toBeTruthy();
  });

  it('renders the architecture introduction', async () => {
    const fixture = TestBed.createComponent(Home);
    await fixture.whenStable();
    const compiled = fixture.nativeElement as HTMLElement;

    expect(compiled.querySelector('h1')?.textContent).toContain('Una base visual');
  });

  it('has no detectable accessibility violations', async () => {
    const fixture = TestBed.createComponent(Home);
    fixture.detectChanges();
    await fixture.whenStable();

    const results = await axe.run(fixture.nativeElement as HTMLElement);

    expect(results.violations).toEqual([]);
  });
});
