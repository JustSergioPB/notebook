import { Injectable, signal } from '@angular/core';
import { Theme } from '@theme/models/theme';

@Injectable({
  providedIn: 'root',
})
export class ThemeService {
  private _theme = signal<Theme>('system');
  theme = this._theme.asReadonly();

  constructor() {
    this._theme.set(this._getTheme());
    this.toggleTheme(this._theme());
  }

  toggleTheme(theme: Theme) {
    if (theme === 'system') {
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)');
      document.body.classList.toggle('dark-theme', prefersDark.matches);
    } else {
      document.body.classList.toggle('dark-theme', theme === 'dark-theme');
    }
    this._theme.set(theme);
    localStorage.setItem('theme', theme);
  }

  private _getTheme(): Theme {
    return (localStorage.getItem('theme') ?? 'system') as Theme;
  }
}
