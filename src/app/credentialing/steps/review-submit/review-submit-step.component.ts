import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { JsonPipe } from '@angular/common';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { FormStepBase } from '../../components/stepper/form-step.base';

@Component({
  standalone: true,
  selector: 'pbm-review-submit-step',
  imports: [ReactiveFormsModule, JsonPipe],
  template: `
    <h3>Review payload before submission</h3>
    <pre>{{ summary | json }}</pre>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ReviewSubmitStepComponent extends FormStepBase<FormGroup> {
  @Input({ required: true }) summary!: unknown;
}
