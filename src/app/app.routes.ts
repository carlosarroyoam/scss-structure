import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./features/home/home').then((m) => m.Home),
    title: 'Inicio',
  },
  {
    path: 'estilos',
    loadComponent: () => import('./features/style-guide/style-guide').then((m) => m.StyleGuide),
    title: 'Guía de estilos',
  },
];
