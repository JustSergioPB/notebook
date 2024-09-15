import { Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { TranslocoService, TranslocoModule } from '@jsverse/transloco';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, TranslocoModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  title = 'notebook';
  translocoService = inject(TranslocoService);

  changeLang(event: Event) {
    const selectElement = event.target as HTMLSelectElement;
    const selectedLang = selectElement.value;
    this.translocoService.setActiveLang(selectedLang);
  }
}
