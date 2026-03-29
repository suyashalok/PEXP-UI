import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { CredentialingStepConfig } from '../../models/credentialing.models';
import { GenericStepperComponent } from './generic-stepper.component';

@Component({
  selector: 'pbm-cred-pack-stepper-wrapper',
  standalone: true,
  imports: [GenericStepperComponent],
  template: `
    <pbm-generic-stepper
      [steps]="steps"
      [activeIndex]="activeIndex"
      [totalSteps]="totalSteps"
      (next)="next.emit()"
      (previous)="previous.emit()"
      (save)="save.emit()"
    >
      <ng-content></ng-content>
    </pbm-generic-stepper>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CredPackStepperWrapperComponent {
  @Input({ required: true }) steps: CredentialingStepConfig[] = [];
  @Input({ required: true }) activeIndex = 0;
  @Input() totalSteps = 45;
  @Output() readonly next = new EventEmitter<void>();
  @Output() readonly previous = new EventEmitter<void>();
  @Output() readonly save = new EventEmitter<void>();
}
