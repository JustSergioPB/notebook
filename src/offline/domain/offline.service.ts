import {
  ApplicationRef,
  inject,
  Injectable,
  isDevMode,
  signal,
} from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { SwUpdate } from '@angular/service-worker';
import {
  catchError,
  concat,
  EMPTY,
  filter,
  first,
  from,
  fromEvent,
  interval,
  merge,
  mergeMap,
  tap,
} from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class OfflineService {
  private _sw = inject(SwUpdate);
  private _swEnabled = signal(false);
  private _online = signal(true);

  swEnabled = this._swEnabled.asReadonly();
  online = this._online.asReadonly();

  constructor(appRef: ApplicationRef) {
    this._checkForUpdates(appRef);
    this._checkNetworkStatus();
  }

  private _checkNetworkStatus() {
    merge(fromEvent(window, 'online'), fromEvent(window, 'offline'))
      .pipe(
        tap(() => {
          this._online.set(navigator.onLine);
        }),
        takeUntilDestroyed()
      )
      .subscribe();
  }

  private _checkForUpdates(appRef: ApplicationRef) {
    this._swEnabled.set(this._sw.isEnabled);
    if (this._swEnabled()) {
      const appIsStable$ = appRef.isStable.pipe(
        first((isStable) => isStable === true)
      );
      const interval$ = interval(isDevMode() ? 5 * 1000 : 60 * 60 * 1000);
      concat(appIsStable$, interval$)
        .pipe(
          mergeMap(() => from(this._sw.checkForUpdate())),
          filter((update) => update),
          tap(() => {
            if (confirm('New version available. Load new version?')) {
              // Reload the page to update to the latest version.
              document.location.reload();
            }
          }),
          catchError((err) => {
            console.error('SW Error', err);
            return EMPTY;
          }),
          takeUntilDestroyed()
        )
        .subscribe();
    }
  }
}
