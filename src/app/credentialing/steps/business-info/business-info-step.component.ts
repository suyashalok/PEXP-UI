import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ReactiveFormsModule, FormGroup, FormControl, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { FormStepBase } from '../../components/stepper/form-step.base';

export interface BusinessInfoStepForm {
  legalBusinessName: FormControl<string>;
  ncpdp: FormControl<string>;
  hasOutOfStateDispensing: FormControl<boolean>;
}

@Component({
  standalone: true,
  selector: 'pbm-business-info-step',
  imports: [ReactiveFormsModule, MatFormFieldModule, MatInputModule, MatCheckboxModule],
  template: `
    <div [formGroup]="form" class="form-grid">
      <mat-form-field appearance="outline">
        <mat-label>Legal business name</mat-label>
        <input matInput formControlName="legalBusinessName" />
      </mat-form-field>

      <mat-form-field appearance="outline">
        <mat-label>NCPDP Number</mat-label>
        <input matInput formControlName="ncpdp" maxlength="7" />
      </mat-form-field>

      <mat-checkbox formControlName="hasOutOfStateDispensing">Out-of-state dispensing</mat-checkbox>
    </div>
  `,
  styles: [
    `
      .form-grid {
        display: grid;
        grid-template-columns: repeat(2, minmax(240px, 1fr));
        gap: 1rem;
      }
    `
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BusinessInfoStepComponent extends FormStepBase<FormGroup<BusinessInfoStepForm>> {
  static createForm(): FormGroup<BusinessInfoStepForm> {
    return new FormGroup<BusinessInfoStepForm>({
      legalBusinessName: new FormControl('', { nonNullable: true, validators: [Validators.required] }),
      ncpdp: new FormControl('', {
        nonNullable: true,
        validators: [Validators.required, Validators.pattern(/^[0-9]{7}$/)]
      }),
      hasOutOfStateDispensing: new FormControl(false, { nonNullable: true })
    });
  }
}
