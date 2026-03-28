import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@Component({
  selector: 'pbm-loading-state',
  standalone: true,
  imports: [MatProgressSpinnerModule],
  template: `
    <div class="wrapper">
      <mat-spinner diameter="32"></mat-spinner>
      <span>{{ message }}</span>
    </div>
  `,
  styles: [
    `
      .wrapper {
        display: flex;
        align-items: center;
        gap: 0.75rem;
      }
    `
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LoadingStateComponent {
  @Input() message = 'Loading...';
}
