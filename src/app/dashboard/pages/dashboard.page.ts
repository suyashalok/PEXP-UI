import { ChangeDetectionStrategy, Component } from '@angular/core';
import { NgFor } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { DashboardStore } from '../store/dashboard.store';

@Component({
  standalone: true,
  imports: [NgFor, MatCardModule],
  template: `
    <section class="grid">
      <mat-card *ngFor="let metric of store.metrics$ | async" class="metric-card">
        <mat-card-title>{{ metric.value }}</mat-card-title>
        <mat-card-content>{{ metric.label }}</mat-card-content>
      </mat-card>
    </section>
  `,
  styles: [
    `
      .grid {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
        gap: 1rem;
      }
      .metric-card {
        border-left: 4px solid #3f51b5;
      }
    `
  ],
  providers: [DashboardStore],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DashboardPage {
  constructor(public readonly store: DashboardStore) {}
}
