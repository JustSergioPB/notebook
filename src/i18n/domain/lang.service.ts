import { inject, Injectable, signal } from '@angular/core';
import { DEFAULT_LANG, SupportedLangs } from '@i18n/model/langs.const';
import { TranslocoService } from '@jsverse/transloco';

@Injectable({
  providedIn: 'root',
})
export class LangService {
  private _translocoService = inject(TranslocoService);
  private _lang = signal<SupportedLangs>(DEFAULT_LANG);
  lang = this._lang.asReadonly();

  constructor() {
    this._lang.set(this._getLang());
    this.setActiveLang(this._lang());
  }

  setActiveLang(lang: SupportedLangs) {
    this._translocoService.setActiveLang(lang);
    this._lang.set(lang);
    localStorage.setItem('lang', lang);
  }

  private _getLang(): SupportedLangs {
    return (localStorage.getItem('lang') ??
      this._translocoService.getActiveLang()) as SupportedLangs;
  }
}
