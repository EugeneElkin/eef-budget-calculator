import { Component } from '@angular/core';

@Component({
    selector: 'app-root',
    template: `
<div style="text-align:center">
  <h1>Welcome to {{ title }}!</h1>
</div>
<app-calculation></app-calculation>

<router-outlet></router-outlet>
  `
})
export class AppComponent {
    title = 'EEF Budget Calculator';
}
