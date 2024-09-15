import { Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { TranslocoService, TranslocoModule } from '@jsverse/transloco';
import { Theme } from '@theme/model/theme';
import { ThemeService } from '@theme/domain/theme.service';
import { LangService } from '@i18n/domain/lang.service';
import { SupportedLangs } from '@i18n/model/langs.const';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, TranslocoModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  title = 'notebook';
  langService = inject(LangService);
  themeService = inject(ThemeService);

  theme = this.themeService.theme;
  lang = this.langService.lang;

  changeLang(event: Event) {
    const selectElement = event.target as HTMLSelectElement;
    const selectedLang = selectElement.value;
    this.langService.setActiveLang(selectedLang as SupportedLangs);
  }

  toggleTheme(event: Event) {
    const selectElement = event.target as HTMLSelectElement;
    const selectedTheme = selectElement.value;
    this.themeService.toggleTheme(selectedTheme as Theme);
  }
}
