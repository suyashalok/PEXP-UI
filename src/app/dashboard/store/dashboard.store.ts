import { Injectable } from '@angular/core';
import { ComponentStore } from '@ngrx/component-store';

export interface DashboardMetric {
  label: string;
  value: string;
}

interface DashboardState {
  loading: boolean;
  metrics: DashboardMetric[];
}

@Injectable()
export class DashboardStore extends ComponentStore<DashboardState> {
  readonly metrics$ = this.select((s) => s.metrics);
  readonly loading$ = this.select((s) => s.loading);

  readonly setLoading = this.updater<boolean>((state, loading) => ({ ...state, loading }));
  readonly setMetrics = this.updater<DashboardMetric[]>((state, metrics) => ({ ...state, metrics }));

  constructor() {
    super({
      loading: false,
      metrics: [
        { label: 'Active onboarding', value: '12' },
        { label: 'Pending signatures', value: '3' },
        { label: 'Submitted this week', value: '8' }
      ]
    });
  }
}
