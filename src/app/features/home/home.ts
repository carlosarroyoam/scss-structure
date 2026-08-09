import { Component } from '@angular/core';

@Component({
  selector: 'app-home',
  template: `
    <section class="hero stack" aria-labelledby="page-title">
      <p class="hero__eyebrow">Angular 22 + Sass modules</p>
      <h1 id="page-title">Una base visual pequeña que puede crecer</h1>
      <p class="hero__summary">
        Los componentes consumen tokens semánticos, conservan sus estilos encapsulados y comparten
        únicamente herramientas Sass sin salida CSS.
      </p>
    </section>

    <section class="principles stack" aria-labelledby="principles-title">
      <h2 id="principles-title">Principios de la arquitectura</h2>

      <div class="principles__grid">
        <article class="principle stack">
          <h3>Tokens semánticos</h3>
          <p>Los nombres expresan intención y permiten cambiar de tema sin recompilar.</p>
        </article>

        <article class="principle stack">
          <h3>Cascada predecible</h3>
          <p>Reset, base, layouts y utilidades tienen un orden global explícito.</p>
        </article>

        <article class="principle stack">
          <h3>Componentes autónomos</h3>
          <p>Cada componente controla su estructura, sus variantes y sus estados interactivos.</p>
        </article>
      </div>
    </section>
  `,
  styleUrl: './home.scss',
})
export class Home {}
