import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  template: `
    <app-header></app-header>
    <main>
      <router-outlet></router-outlet>
    </main>
  `,
  styles: [`
    main {
      min-height: calc(100vh - 80px);
      padding-top: 80px;
    }
  `]
})
export class AppComponent {
  title = 'E-commerce Mundial Fútbol';
}