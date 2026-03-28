import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { NgFor } from '@angular/common';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormStepBase } from '../../components/stepper/form-step.base';
import { UploadedFile } from '../../services/file-upload.service';

export interface LicenseUploadStepForm {
  deaLicense: FormControl<string>;
}

@Component({
  standalone: true,
  selector: 'pbm-license-upload-step',
  imports: [ReactiveFormsModule, MatButtonModule, MatFormFieldModule, MatInputModule, NgFor],
  template: `
    <div [formGroup]="form" class="license-step">
      <mat-form-field appearance="outline">
        <mat-label>DEA License Number</mat-label>
        <input matInput formControlName="deaLicense" />
      </mat-form-field>

      <div>
        <button mat-stroked-button type="button" (click)="fileInput.click()">Upload Document</button>
        <input #fileInput type="file" hidden (change)="onFile($event)" accept=".pdf,.jpg,.png" />
      </div>

      <ul>
        <li *ngFor="let uploaded of attachments">{{ uploaded.fileName }} ({{ uploaded.uploadedAt }})</li>
      </ul>
    </div>
  `,
  styles: [
    `
      .license-step {
        display: grid;
        gap: 1rem;
      }
    `
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LicenseUploadStepComponent extends FormStepBase<FormGroup<LicenseUploadStepForm>> {
  @Input({ required: true }) attachments: UploadedFile[] = [];
  @Output() readonly uploadFile = new EventEmitter<File>();

  static createForm(): FormGroup<LicenseUploadStepForm> {
    return new FormGroup<LicenseUploadStepForm>({
      deaLicense: new FormControl('', { nonNullable: true, validators: [Validators.required] })
    });
  }

  protected onFile(event: Event): void {
    const input = event.target as HTMLInputElement;
    const file = input.files?.[0];
    if (file) {
      this.uploadFile.emit(file);
    }
    input.value = '';
  }
}
