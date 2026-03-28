import { Directive, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Directive()
export abstract class FormStepBase<TForm extends FormGroup> {
  @Input({ required: true }) form!: TForm;

  canProceed(): boolean {
    this.form.markAllAsTouched();
    return this.form.valid;
  }
}
