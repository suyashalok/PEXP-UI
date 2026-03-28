import { Injectable, signal } from '@angular/core';
import { PharmacyContext } from '../models/api.models';

@Injectable({ providedIn: 'root' })
export class PharmacyContextService {
  private readonly context = signal<PharmacyContext | null>(null);

  setContext(value: PharmacyContext): void {
    this.context.set(value);
  }

  getContext(): PharmacyContext | null {
    return this.context();
  }
}
