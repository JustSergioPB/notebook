import { Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { TranslocoService, TranslocoModule } from '@jsverse/transloco';
import { Theme } from '@theme/models/theme';
import { ThemeService } from '@theme/services/theme.service';

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
  themeService = inject(ThemeService);

  theme = this.themeService.theme;

  changeLang(event: Event) {
    const selectElement = event.target as HTMLSelectElement;
    const selectedLang = selectElement.value;
    this.translocoService.setActiveLang(selectedLang);
  }

  toggleTheme(event: Event) {
    const selectElement = event.target as HTMLSelectElement;
    const selectedTheme = selectElement.value;
    this.themeService.toggleTheme(selectedTheme as Theme);
  }
}
